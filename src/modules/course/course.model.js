const JsonStore = require('../../utils/jsonStore');
const Category = require('../category/category.model');

const store = new JsonStore('courses');

// attach category {id, name} to a course
const withCategory = (course) => {
  if (!course) return null;
  const cat = Category.findById(course.categoryId);
  return { ...course, category: cat ? { id: cat.id, name: cat.name } : null };
};

const Course = {
  findAll: (predicate) => store.findAll(predicate).reverse().map(withCategory),
  findById: (id) => withCategory(store.findById(id)),
  create: (data) => withCategory(store.create(data)),
  update: (id, data) => withCategory(store.update(id, data)),
  delete: (id) => store.delete(id),
};

module.exports = Course;
