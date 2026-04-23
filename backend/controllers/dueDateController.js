const StatutoryDueDate = require('../models/StatutoryDueDate');

const getAllDueDates = async (req, res) => {
  try {
    const { category, upcoming, month, year } = req.query;
    const query = { isActive: true };

    if (category) query.category = category;
    if (upcoming === 'true') query.date = { $gte: new Date() };
    if (month && year) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const dueDates = await StatutoryDueDate.find(query).sort({ date: 1 });
    res.json({ dueDates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching due dates.', error: error.message });
  }
};

const createDueDate = async (req, res) => {
  try {
    const { title, date, description, category, isRecurring, applicableTo } = req.body;
    const dueDate = await StatutoryDueDate.create({
      title, date, description,
      category: category || 'Other',
      isRecurring: isRecurring || false,
      applicableTo: applicableTo || 'All'
    });
    res.status(201).json({ message: 'Due date created.', dueDate });
  } catch (error) {
    res.status(500).json({ message: 'Error creating due date.', error: error.message });
  }
};

const updateDueDate = async (req, res) => {
  try {
    const dueDate = await StatutoryDueDate.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!dueDate) return res.status(404).json({ message: 'Due date not found.' });
    res.json({ message: 'Due date updated.', dueDate });
  } catch (error) {
    res.status(500).json({ message: 'Error updating due date.', error: error.message });
  }
};

const deleteDueDate = async (req, res) => {
  try {
    const dueDate = await StatutoryDueDate.findByIdAndDelete(req.params.id);
    if (!dueDate) return res.status(404).json({ message: 'Due date not found.' });
    res.json({ message: 'Due date deleted.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting due date.', error: error.message });
  }
};

module.exports = { getAllDueDates, createDueDate, updateDueDate, deleteDueDate };
