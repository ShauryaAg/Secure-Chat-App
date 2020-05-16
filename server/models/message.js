const mongoose = require('mongoose')
const db = require('./')

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String,
    visibleTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    created: {
        type: Date,
        default: Date.now
    }
})

messageSchema.pre('save', async function (next) {
    try {
        if (!this.isModified()) {
            return next()
        }
        usernameList = this.message.match(/(?<=@)(\w+)/g) // regex to find all the words that start with "@" 
        await Promise.all(usernameList.map(async username => {
            var user = await db.User.findOne({ username })
            if (user && !(this.visibleTo.includes(user))) {
                this.visibleTo.push(user)
            }
            else {
                console.log(`${username} doesn't exist`)
            }
        }))
        return next()
    } catch (err) {
        return next(err)
    }

})

module.exports = mongoose.model('Message', messageSchema)