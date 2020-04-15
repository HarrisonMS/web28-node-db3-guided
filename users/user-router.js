const express = require('express');

const router = express.Router();

const Users = require('./user-model.js')

router.get('/', (req, res) => {
  Users.find('users')
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

router.get(`/:id`, (req, res) => {
  const id = req.params.id
  Users.findById(id)
  .then(user => {
    {user 
      ? res.status(200).json(user) 
      : res.status(404).json({error: "The users information could not be retrieved."}) 
    }
  })
})

router.post('/', (req, res) => {
  const user = req.body;
  {!user
    ? res.status(400).json({ errorMessage: "user info"}) 
    : Users.insert(user)
      .then((user) => {
        res.status(201).json(user)
      })
  }
})

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Users.update(id, changes)
  .then(updated => {
    if (updated) {
      res.json({ data: updated });
    } else {
      res.status(404).json({ message: 'could not update' });
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({ message: 'Failed to update user' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Users('users').where({ id }).del()
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});

module.exports = router;