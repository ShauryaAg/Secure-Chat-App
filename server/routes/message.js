const router = require('express').Router()

const handle = require('../handlers')
const auth = require('../middlewares/auth')

router
    .route('/')
    .get(auth, handle.getMessages)
    .post(auth, handle.sendMessage)

module.exports = router