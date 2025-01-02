import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  portfolioLimit: {
    type: Number,
    default: 10,
    min: 1,
    max: 50
  }
}, {
  timestamps: true
});

// Ensure only one settings document exists
settingsSchema.statics.getInstance = async function() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

export default Settings; 