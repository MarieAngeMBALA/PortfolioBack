const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true 
  },
  content: {
    type: String,
    required: true 
  },
  keywords: {
    type: String,
  },
  images: [{
    data: Buffer,
    contentType: String
  }],
  
  status: {
    type: String,
    enum: ['active', 'inactive'], 
    default: 'active'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);
