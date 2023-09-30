
const User = require('./models/User');
const Geolocation = require('./models/Geolocation');

// Define associations here
User.hasMany(Geolocation, { foreignKey: 'id' });
Geolocation.belongsTo(User, { foreignKey: 'id' });

// Export the models
module.exports = {
  User,
  Geolocation,
};
