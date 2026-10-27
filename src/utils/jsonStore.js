const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');

// Tiny file-based store: each collection is saved in data/<name>.json
class JsonStore {
  constructor(name) {
    this.file = path.join(DATA_DIR, `${name}.json`);
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(this.file)) fs.writeFileSync(this.file, '[]');
  }

  _read() {
    return JSON.parse(fs.readFileSync(this.file, 'utf8') || '[]');
  }

  _write(items) {
    fs.writeFileSync(this.file, JSON.stringify(items, null, 2));
  }

  findAll(predicate = () => true) {
    return this._read().filter(predicate);
  }

  findById(id) {
    return this._read().find((i) => i.id === id) || null;
  }

  findOne(predicate) {
    return this._read().find(predicate) || null;
  }

  create(data) {
    const items = this._read();
    const now = new Date().toISOString();
    const item = { id: crypto.randomUUID(), ...data, createdAt: now, updatedAt: now };
    items.push(item);
    this._write(items);
    return item;
  }

  update(id, data) {
    const items = this._read();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...data, id, updatedAt: new Date().toISOString() };
    this._write(items);
    return items[index];
  }

  delete(id) {
    const items = this._read();
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return false;
    items.splice(index, 1);
    this._write(items);
    return true;
  }
}

module.exports = JsonStore;
