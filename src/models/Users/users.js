const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {type: String, default: 'user'},
    createdAt: Date,
    updatedAt: Date,
});

// Hash the password before saving the user model
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
/// Check if the password is correct
userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Users', userSchema);