const JsonStore = require('../../utils/jsonStore');

const store = new JsonStore('categories');

const Category = {
  findAll: () => store.findAll().reverse(),
  findById: (id) => store.findById(id),
  findByName: (name) => store.findOne((c) => c.name.toLowerCase() === name.trim().toLowerCase()),
  create: (data) => store.create(data),
  update: (id, data) => store.update(id, data),
  delete: (id) => store.delete(id),
};

module.exports = Category;
