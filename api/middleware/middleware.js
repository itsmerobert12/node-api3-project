const User = require('../users/users-model')






function logger(req, res, next) {
  const timestamp = new Data().toLocalString()
  const method = req.method
  const url = req.originalUrl
  console.log(`[${timestamp}] ${method} to ${url}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({ 
        message: 'no such user'
      })
    } else {
      req.user = user
      next()
    }
  } catch (err) {
    res.status(500).json({ 
      message: 'no problem finding user'})
  }
}

function validateUser(req, res, next) {
  console.log('validateUser middleware')
  next()
}

function validatePost(req, res, next) {
  console.log('validatePost middleware')
  next()
}

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}