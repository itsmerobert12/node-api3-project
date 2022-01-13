const express = require('express');
const { 
  validateUserId,
  validateUser,
  validatePost,
} = require('../middleware/middleware')

const User = require('./users-model')
const Post = require('../posts/posts-model')

const router = express.Router();

router.get('/', (req, res, next) => {
  User.get()
    .then(users => {
      res.json(users)
    })
    .catch(next)
});

router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user)
});

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await User.insert(req.body)
    res.status(201).json(newUser)
  } catch (err) {
    res.status(500).json({
      message : "problem finding user",
    })
  }
});

router.put('/:id', validateUserId, validateUser, (req, res, next) => {
  User.update(req.params.id, { name: req.name })
  .then(() => {
    return User.getById(req.params.id)
  })
  .then(user => {
    res.json(user)
  })
  .catch(next)
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    await User.remove(req.params.id)
    res.json(req.user)
  } catch (err) {
    next(err)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  try {
    const result = await User.getUserPosts(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  try {
    const result = await Post.insert({
      user_id: req.params.id,
      text: req.text,
    })
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      customMessage:'something bad happened inside posts router', 
      message: err.message,
      stack: err.stack,
    })
})

module.exports = router