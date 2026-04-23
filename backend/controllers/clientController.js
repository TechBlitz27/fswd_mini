const { validationResult } = require('express-validator');
const ClientProfile = require('../models/ClientProfile');
const User = require('../models/User');
const ComplianceEntry = require('../models/ComplianceEntry');

const getAllClients = async (req, res) => {
  try {
    const { search, serviceType, page = 1, limit = 20 } = req.query;
    const query = {};

    if (serviceType) query.serviceTypes = serviceType;
    if (req.user.role === 'staff') query.assignedStaff = req.user._id;

    let clients = await ClientProfile.find(query)
      .populate('userId', 'name email isActive')
      .populate('assignedCA', 'name email')
      .populate('assignedStaff', 'name email')
      .sort({ createdAt: -1 });

    if (search) {
      clients = clients.filter(c =>
        (c.userId?.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.pan || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.businessName || '').toLowerCase().includes(search.toLowerCase())
      );
    }

    const total = clients.length;
    const skip = (page - 1) * limit;
    const paginated = clients.slice(skip, skip + parseInt(limit));

    res.json({ clients: paginated, pagination: { total, page: parseInt(page), pages: Math.ceil(total / limit) } });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients.', error: error.message });
  }
};

const getClient = async (req, res) => {
  try {
    let client;

    if (req.user.role === 'client') {
      client = await ClientProfile.findOne({ userId: req.user._id })
        .populate('userId', 'name email')
        .populate('assignedCA', 'name email');
    } else {
      client = await ClientProfile.findById(req.params.id)
        .populate('userId', 'name email')
        .populate('assignedCA', 'name email')
        .populate('assignedStaff', 'name email');
    }

    if (!client) return res.status(404).json({ message: 'Client not found.' });

    if (req.user.role === 'staff') {
      const isAssigned = client.assignedStaff.some(s => s._id.toString() === req.user._id.toString());
      if (!isAssigned) return res.status(403).json({ message: 'Access denied.' });
    }

    res.json({ client });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client.', error: error.message });
  }
};

const createClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password, pan, phone, address, mapLocation, serviceTypes, assignedCA, businessName, clientType, gstNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User with this email already exists.' });

    const existingPAN = await ClientProfile.findOne({ pan: pan.toUpperCase() });
    if (existingPAN) return res.status(400).json({ message: 'Client with this PAN already exists.' });

    const user = await User.create({ name, email, password: password || 'Welcome@123', role: 'client' });

    const clientProfile = await ClientProfile.create({
      userId: user._id,
      pan: pan.toUpperCase(),
      phone,
      address,
      mapLocation,
      serviceTypes: serviceTypes || [],
      assignedCA: assignedCA || (req.user.role === 'ca' ? req.user._id : null),
      businessName,
      clientType: clientType || 'Individual',
      gstNumber
    });

    await clientProfile.populate('userId', 'name email');
    await clientProfile.populate('assignedCA', 'name email');

    res.status(201).json({ message: 'Client created successfully.', client: clientProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error creating client.', error: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const { phone, address, mapLocation, serviceTypes, assignedCA, assignedStaff, businessName, clientType, gstNumber } = req.body;

    const client = await ClientProfile.findByIdAndUpdate(
      req.params.id,
      { phone, address, mapLocation, serviceTypes, assignedCA, assignedStaff, businessName, clientType, gstNumber },
      { new: true, runValidators: true }
    )
    .populate('userId', 'name email')
    .populate('assignedCA', 'name email')
    .populate('assignedStaff', 'name email');

    if (!client) return res.status(404).json({ message: 'Client not found.' });
    res.json({ message: 'Client updated successfully.', client });
  } catch (error) {
    res.status(500).json({ message: 'Error updating client.', error: error.message });
  }
};

const deleteClient = async (req, res) => {
  try {
    const client = await ClientProfile.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found.' });

    await ComplianceEntry.deleteMany({ clientId: client._id });
    await User.findByIdAndDelete(client.userId);
    await ClientProfile.findByIdAndDelete(req.params.id);

    res.json({ message: 'Client and associated data deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client.', error: error.message });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const client = await ClientProfile.findOne({ userId: req.user._id })
      .populate('userId', 'name email')
      .populate('assignedCA', 'name email');

    if (!client) return res.status(404).json({ message: 'Client profile not found.' });
    res.json({ client });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile.', error: error.message });
  }
};

module.exports = { getAllClients, getClient, createClient, updateClient, deleteClient, getMyProfile };
