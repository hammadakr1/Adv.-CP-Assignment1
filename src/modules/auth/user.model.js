const bcrypt = require('bcryptjs');
const JsonStore = require('../../utils/jsonStore');

const store = new JsonStore('users');

const User = {
  findById: (id) => store.findById(id),
  findByEmail: (email) => store.findOne((u) => u.email === email.toLowerCase().trim()),

  async create({ name, email, password }) {
    const hashed = await bcrypt.hash(password, 10);
    return store.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      role: 'user',
    });
  },

  matchPassword: (user, plain) => bcrypt.compare(plain, user.password),

  // never send the password hash to the client
  toPublic: (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role }),
};

module.exports = User;
