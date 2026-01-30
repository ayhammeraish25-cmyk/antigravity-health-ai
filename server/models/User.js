import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    settings: {
        height: { type: Number, default: 0 },
        weight: { type: Number, default: 0 },
        age: { type: Number, default: 0 },
        gender: { type: String, enum: ['male', 'female', 'other'], default: 'male' },
        activityLevel: { type: String, default: 'moderate' }, // sedentary, light, moderate, active, very_active
        goals: [{ type: String }], // Multi-goal support
        plan: { type: String, default: 'free' } // free, pro
    },
    streak: {
        type: Number,
        default: 0
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
}, {
    timestamps: true
});

// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire (10 minutes)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

// Pre-save hook to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
