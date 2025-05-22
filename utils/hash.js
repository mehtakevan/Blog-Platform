const bcrypt = require('bcrypt');

const hashValue = async (plainTextPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainTextPassword, saltRounds);
};

const compareValue = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

module.exports = {
  hashValue,
  compareValue,
};
