const knex = require('knex');
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development)

module.exports = {
  find,
  findById,
  insert,
  update
}

function find() {
  return db('users')
}
function findById(id) {
  return db('users').where({ id: Number(id) });
}
function insert(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => {
      return findById(id)
    });
}
function update(id, changes) {
  return db('users')
  .where('id', Number(id))
  .update(changes).then(() => {
    return findById(id)
  })
}