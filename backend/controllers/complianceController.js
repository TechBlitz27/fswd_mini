const { validationResult } = require('express-validator');
const ComplianceEntry = require('../models/ComplianceEntry');
const ClientProfile = require('../models/ClientProfile');

const getAllEntries = async (req, res) => {
  try {
    const { clientId, serviceType, status, financialYear, page = 1, limit = 20 } = req.query;
    const query = {};

    if (clientId) query.clientId = clientId;
    if (serviceType) query.serviceType = serviceType;
    if (status) query.status = status;
    if (financialYear) query.financialYear = financialYear;
    if (req.user.role === 'staff') query.assignedTo = req.user._id;

    const skip = (page - 1) * limit;
    const entries = await ComplianceEntry.find(query)
      .populate({ path: 'clientId', populate: { path: 'userId', select: 'name email' } })
      .populate('assignedTo', 'name email')
      .sort({ dueDate: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ComplianceEntry.countDocuments(query);

    res.json({ entries, pagination: { total, page: parseInt(page), pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching compliance entries.', error: error.message });
  }
};

const getClientCompliance = async (req, res) => {
  try {
    let clientId = req.params.clientId;

    if (req.user.role === 'client') {
      const profile = await ClientProfile.findOne({ userId: req.user._id });
      if (!profile) return res.status(404).json({ message: 'Client profile not found.' });
      clientId = profile._id;
    }

    const entries = await ComplianceEntry.find({ clientId })
      .populate('assignedTo', 'name email')
      .sort({ financialYear: -1, serviceType: 1 });

    res.json({ entries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching compliance.', error: error.message });
  }
};

const createEntry = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { clientId, serviceType, financialYear, quarter, status, dueDate, remarks, assignedTo } = req.body;

    const entry = await ComplianceEntry.create({
      clientId, serviceType, financialYear,
      quarter: quarter || null,
      status: status || 'Not Started',
      dueDate, remarks, assignedTo,
      statusHistory: [{
        status: status || 'Not Started',
        changedBy: req.user._id,
        note: 'Entry created'
      }]
    });

    await entry.populate({ path: 'clientId', populate: { path: 'userId', select: 'name email' } });

    res.status(201).json({ message: 'Compliance entry created.', entry });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A compliance entry for this client, service, year and quarter already exists.' });
    }
    res.status(500).json({ message: 'Error creating entry.', error: error.message });
  }
};

const updateEntry = async (req, res) => {
  try {
    const entry = await ComplianceEntry.findById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Compliance entry not found.' });

    if (req.user.role === 'staff') {
      if (!entry.assignedTo || entry.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Access denied.' });
      }
    }

    const { status, remarks, dueDate, filedDate, assignedTo } = req.body;

    if (status && status !== entry.status) {
      entry.statusHistory.push({
        status,
        changedBy: req.user._id,
        changedAt: new Date(),
        note: req.body.statusNote || ''
      });
      entry.status = status;
    }

    if (remarks !== undefined) entry.remarks = remarks;
    if (dueDate) entry.dueDate = dueDate;
    if (filedDate) entry.filedDate = filedDate;
    if (assignedTo && req.user.role !== 'staff') entry.assignedTo = assignedTo;

    await entry.save();
    await entry.populate('assignedTo', 'name email');
    await entry.populate({ path: 'clientId', populate: { path: 'userId', select: 'name email' } });
    await entry.populate('statusHistory.changedBy', 'name');

    res.json({ message: 'Compliance entry updated.', entry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating entry.', error: error.message });
  }
};

const deleteEntry = async (req, res) => {
  try {
    const entry = await ComplianceEntry.findByIdAndDelete(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Compliance entry not found.' });
    res.json({ message: 'Compliance entry deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting entry.', error: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const statusStats = await ComplianceEntry.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const serviceStats = await ComplianceEntry.aggregate([
      { $group: { _id: '$serviceType', count: { $sum: 1 } } }
    ]);
    const overdue = await ComplianceEntry.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $nin: ['Filed', 'Completed'] }
    });
    const dueSoon = await ComplianceEntry.countDocuments({
      dueDate: { $gte: new Date(), $lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
      status: { $nin: ['Filed', 'Completed'] }
    });

    res.json({ statusStats, serviceStats, overdue, dueSoon });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats.', error: error.message });
  }
};

module.exports = { getAllEntries, getClientCompliance, createEntry, updateEntry, deleteEntry, getStats };
