const mongoose = require('mongoose');

const clientProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  pan: {
    type: String,
    required: [true, 'PAN is required'],
    unique: true,
    uppercase: true,
    trim: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (e.g., ABCDE1234F)']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Invalid Indian phone number']
  },
  address: {
    type: String,
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  serviceTypes: [{
    type: String,
    enum: ['ITR', 'GST', 'Audit', 'TDS', 'ROC', 'Consultation']
  }],
  assignedCA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedStaff: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  businessName: {
    type: String,
    trim: true,
    maxlength: [200, 'Business name cannot exceed 200 characters']
  },
  clientType: {
    type: String,
    enum: ['Individual', 'HUF', 'Partnership', 'Company', 'LLP', 'Trust'],
    default: 'Individual'
  },
  gstNumber: {
    type: String,
    uppercase: true,
    trim: true,
    match: [/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format']
  },
  mapLocation: {
    type: String,
    trim: true,
    maxlength: [300, 'Map location cannot exceed 300 characters']
  }
}, { timestamps: true });

module.exports = mongoose.model('ClientProfile', clientProfileSchema);
