const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    timestamp: { type: Date, required: true },
  },
  { collection: 'leads' }
);

module.exports = mongoose.model('Lead', LeadSchema);


