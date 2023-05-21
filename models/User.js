const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name.'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long.'],
      maxlength: [20, 'Name cannot exceed 20 characters.'],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [20, 'Last name cannot exceed 20 characters.'],
      default: '',
    },
    email: {
      type: String,
      required: [true, 'Please provide an email.'],
      unique: true,
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email.',
      },
    },
    location: {
      type: String,
      trim: true,
      maxlength: [30, 'Location cannot exceed 30 characters.'],
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      minlength: [6, 'Password must be at least 6 characters long.'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password.'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords do not match.',
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Date,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(this.password, salt);

  this.password = hashedPassword;
  this.passwordChangedAt = Date.now() - 1000;
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.createJWT = function () {
  const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

  try {
    const token = jwt.sign({ userId: this._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    return token;
  } catch (error) {
    throw new Error('Failed to create JWT.');
  }
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
