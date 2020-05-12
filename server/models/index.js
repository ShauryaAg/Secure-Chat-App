const mongoose = require('mongoose')

mongoose.set('debug', true)
mongoose.Promise = global.Promise

mongoose.connect(process.env.mongoURL, { useNewUrlParser: true })

module.exports.User = require('./user')
module.exports.Message = require('./message')