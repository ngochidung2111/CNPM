const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// Declare the Schema of the Mongo model
let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    _id:        { type: String, required: true },              // MSSV
    password:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        default: 'Student',
    },
    pageBalance:{ type: Number, default: 0 }, 
    permissions: { type: [String], default: [] }, 
    refreshToken: {
        type: String,
    },
    passwordChangeAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: String,
    },
    registerToken: {
        type: String
    }
    }, 
    {timestamps: true}
);

userSchema.index({ name: 1 });

// Hash password before saving to database
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods = {
    isCorrectPassword: async function(password) {
        return await bcrypt.compare(password, this.password);
    },
    createPasswordChangeToken: function() {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
        return resetToken
    } 
}

//Export the model
module.exports = mongoose.model('User', userSchema);	