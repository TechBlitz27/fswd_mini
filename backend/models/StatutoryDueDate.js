const mongoose = require('mongoose');

const statutoryDueDateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    enum: ['ITR', 'GST', 'TDS', 'ROC', 'Audit', 'Other'],
    default: 'Other'
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  applicableTo: {
    type: String,
    default: 'All'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('StatutoryDueDate', statutoryDueDateSchema);
