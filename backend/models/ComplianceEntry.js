const mongoose = require('mongoose');

const complianceEntrySchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientProfile',
    required: true
  },
  serviceType: {
    type: String,
    enum: ['ITR', 'GST', 'Audit', 'TDS', 'ROC', 'Consultation'],
    required: [true, 'Service type is required']
  },
  financialYear: {
    type: String,
    required: [true, 'Financial year is required'],
    match: [/^\d{4}-\d{2}$/, 'Financial year format: YYYY-YY (e.g., 2023-24)']
  },
  quarter: {
    type: String,
    enum: ['Q1', 'Q2', 'Q3', 'Q4', 'Annual', null],
    default: null
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Filed', 'Completed', 'On Hold'],
    default: 'Not Started'
  },
  dueDate: { type: Date },
  filedDate: { type: Date },
  remarks: {
    type: String,
    maxlength: [1000, 'Remarks cannot exceed 1000 characters']
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  statusHistory: [{
    status: String,
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    changedAt: { type: Date, default: Date.now },
    note: String
  }]
}, { timestamps: true });

// Prevent duplicate entries for same client+service+year+quarter
complianceEntrySchema.index(
  { clientId: 1, serviceType: 1, financialYear: 1, quarter: 1 },
  { unique: true }
);

module.exports = mongoose.model('ComplianceEntry', complianceEntrySchema);
