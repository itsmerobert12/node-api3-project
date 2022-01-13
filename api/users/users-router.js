const express = require('express');
const { 
  validateUserId,
} = require('../middleware/middleware')

const router = express.Router();

router.get('/', (req, res) => {

})

router.get('/:id', validateUserId, (req, res) => {
  
})

router.post('/', (req, res) => {
  
})

router.put('/:id', validateUserId, (req, res) => {
  
})

router.delete('/:id', validateUserId, (req, res) => {
  
})

router.get('/:id/posts', validateUserId, (req, res) => {
  
})

router.post('/:id/posts', validateUserId, (req, res) => {

});

module.exports = router