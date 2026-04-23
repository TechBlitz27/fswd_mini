const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const ClientProfile = require('./models/ClientProfile');
const ComplianceEntry = require('./models/ComplianceEntry');
const StatutoryDueDate = require('./models/StatutoryDueDate');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ca_firm_db';

const statutoryDueDates = [
  { title: 'GST Monthly Return (GSTR-3B)', date: new Date('2026-01-20'), description: 'Monthly GST return filing', category: 'GST', applicableTo: 'GST Registered Taxpayers' },
  { title: 'GST GSTR-1 Monthly', date: new Date('2026-01-11'), description: 'Outward supplies return', category: 'GST', applicableTo: 'GST Registered Taxpayers' },
  { title: 'TDS Return Q3 (26Q)', date: new Date('2026-01-31'), description: 'TDS return for Q3 (Oct-Dec)', category: 'TDS', applicableTo: 'TDS Deductors' },
  { title: 'Income Tax Advance Tax - 4th Installment', date: new Date('2026-03-15'), description: '100% of advance tax due', category: 'ITR', applicableTo: 'All taxpayers' },
  { title: 'GST Annual Return (GSTR-9)', date: new Date('2026-12-31'), description: 'Annual GST return for FY 2025-26', category: 'GST', applicableTo: 'GST Registered Taxpayers (turnover > 2Cr)' },
  { title: 'ITR Filing - Non-Audit Cases', date: new Date('2026-07-31'), description: 'Income Tax Return for non-audit cases FY 2025-26', category: 'ITR', applicableTo: 'Individuals, HUF, Firms (non-audit)' },
  { title: 'ROC Annual Return (MGT-7)', date: new Date('2026-11-29'), description: 'Annual return for companies with MCA', category: 'ROC', applicableTo: 'All Companies' },
  { title: 'Tax Audit Report (Form 3CA/3CB)', date: new Date('2026-09-30'), description: 'Filing of tax audit report', category: 'Audit', applicableTo: 'Entities requiring tax audit' },
  { title: 'PF & ESI Monthly Payment', date: new Date('2026-02-15'), description: 'Monthly PF and ESI contribution', category: 'Other', applicableTo: 'Employers', isRecurring: true },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    await User.deleteMany({});
    await ClientProfile.deleteMany({});
    await ComplianceEntry.deleteMany({});
    await StatutoryDueDate.deleteMany({});
    console.log('🗑️  Cleared existing data');

    const admin = await User.create({ name: 'Admin', email: 'admin@cafirm.com', password: 'Admin@123', role: 'admin' });
    const ca = await User.create({ name: 'CA Raj Mehta', email: 'raj@cafirm.com', password: 'CA@123456', role: 'ca' });
    const staff = await User.create({ name: 'Om Gabda', email: 'staff@cafirm.com', password: 'Staff@123', role: 'staff' });

    const clientUser1 = await User.create({ name: 'Kavi Enterprises', email: 'kavi@enterprise.com', password: 'Client@123', role: 'client' });
    const clientUser2 = await User.create({ name: 'Vivek Manufacturing Co', email: 'vivek@co.com', password: 'Client@1234', role: 'client' });

    const clientProfile1 = await ClientProfile.create({
      userId: clientUser1._id,
      pan: 'ABCDE1234F',
      phone: '9123456789',
      address: '10 Demo Plaza, Sample Street, Mumbai, Maharashtra - 400001',
      mapLocation: '18.9388,72.8354',
      serviceTypes: ['ITR', 'TDS'],
      assignedCA: ca._id,
      assignedStaff: [staff._id],
      clientType: 'Individual'
    });

    const clientProfile2 = await ClientProfile.create({
      userId: clientUser2._id,
      pan: 'ABCDE5678G',
      phone: '9876501234',
      address: '225 Demo Business Park, Industrial Area, Pune, Maharashtra - 411047',
      mapLocation: '18.5204,73.8567',
      serviceTypes: ['GST', 'ITR', 'Audit', 'ROC'],
      assignedCA: ca._id,
      assignedStaff: [staff._id],
      businessName: 'Demo Manufacturing Pvt Ltd',
      clientType: 'Company',
      gstNumber: '27ABCDE5678G1Z5'
    });

    await ComplianceEntry.create([
      { clientId: clientProfile1._id, serviceType: 'ITR', financialYear: '2025-26', status: 'In Progress', dueDate: new Date('2026-07-31'), assignedTo: staff._id, remarks: 'Documents received, processing', statusHistory: [{ status: 'Not Started', changedBy: ca._id }, { status: 'In Progress', changedBy: staff._id }] },
      { clientId: clientProfile1._id, serviceType: 'TDS', financialYear: '2025-26', quarter: 'Q3', status: 'Filed', dueDate: new Date('2026-01-31'), filedDate: new Date('2026-01-28'), assignedTo: staff._id, statusHistory: [{ status: 'Filed', changedBy: staff._id }] },
      { clientId: clientProfile2._id, serviceType: 'GST', financialYear: '2025-26', quarter: 'Q3', status: 'Completed', dueDate: new Date('2026-01-20'), filedDate: new Date('2026-01-18'), assignedTo: staff._id, statusHistory: [{ status: 'Completed', changedBy: staff._id }] },
      { clientId: clientProfile2._id, serviceType: 'Audit', financialYear: '2025-26', status: 'Not Started', dueDate: new Date('2026-09-30'), assignedTo: staff._id, statusHistory: [{ status: 'Not Started', changedBy: ca._id }] },
    ]);

    await StatutoryDueDate.insertMany(statutoryDueDates);

    console.log('\n✅ Database seeded!\n--- CREDENTIALS ---');
    console.log('Admin:  admin@cafirm.com    / Admin@123');
    console.log('CA:     raj@cafirm.com      / CA@123456');
    console.log('Staff:  staff@cafirm.com    / Staff@123');
    console.log('Client: kavi@enterprise.com / Client@123');
    console.log('Client: vivek@co.com        / Client@1234');

    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seed();
