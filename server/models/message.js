const mongoose = require('mongoose')
const db = require('./')

var getFromBetween = {
    results: [],
    string: "",
    getFromBetween: function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var SP = this.string.indexOf(sub1) + sub1.length;
        var string1 = this.string.substr(0, SP);
        var string2 = this.string.substr(SP);
        var TP = string1.length + string2.indexOf(sub2);
        return this.string.substring(SP, TP);
    },
    removeFromBetween: function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return false;
        var removal = sub1 + this.getFromBetween(sub1, sub2) + sub2;
        this.string = this.string.replace(removal, "");
    },
    getAllResults: function (sub1, sub2) {
        if (this.string.indexOf(sub1) < 0 || this.string.indexOf(sub2) < 0) return;

        var result = this.getFromBetween(sub1, sub2);
        this.results.push(result);
        this.removeFromBetween(sub1, sub2);

        if (this.string.indexOf(sub1) > -1 && this.string.indexOf(sub2) > -1) {
            this.getAllResults(sub1, sub2);
        }
        else return;
    },
    get: function (string, sub1, sub2) {
        this.results = [];
        this.string = string;
        this.getAllResults(sub1, sub2);
        return this.results;
    }
};


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
        usernameList = getFromBetween.get(this.message, "@", " ")
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