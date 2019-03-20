const { Router } = require('express')
const notes = require('./notes')

const router = new Router()

router.use('/notes', notes)

module.exports = router
