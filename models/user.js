const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        is_admin: { type: Boolean, default: false }
    },
    { collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model