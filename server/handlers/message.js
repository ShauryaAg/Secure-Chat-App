const db = require('../models')

const socket = require('../index')

exports.sendMessage = async (req, res, next) => {
    try {
        const { id } = req.decoded
        const user = await db.User.findById(id)

        const { message: messageString } = req.body
        const message = await db.Message.create({
            message: messageString,
            user: user,
        })
        user.messages.push(message._id)
        await user.save()
        await message.save()

        socket.clients.map(toId => {
            if (message.visibleTo.map(user => user._id).includes(toId.customId) || toId.customId == message.user._id) {
                var messageData = req.body.message
            } else {
                messageData = `You can't view this message`
            }

            data = {
                user: {
                    username: user.username,
                    _id: user._id
                },
                message: messageData
            }

            socket.io.to(toId.clientId).emit('message', data)
        })



        res.status(200).json({ message })
    } catch (err) {
        err.status = 400
        next(err)
    }
}

exports.getMessages = async (req, res, next) => {
    try {
        const { id } = req.decoded
        const user = await db.User.findById(id)

        const messages = await db.Message.find().populate('user', ['username', 'id'])

        data = []

        messages.map(message => {

            if (message.visibleTo.includes(user._id) || message.user._id == id) {
                data.push({ user: message.user, message: message.message })
            }
            else {
                data.push({ user: message.user, message: `You can't view this message` })
            }
        })

        res.status(200).json(data)
    } catch (err) {
        err.status = 400
        next(err)
    }
}