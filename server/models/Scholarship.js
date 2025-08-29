const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scholarshipSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    officialLink: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['General', 'EWS', 'OBC', 'SC', 'ST'],
        default: 'General'
    },
    educationLevel: {
        type: String,
        enum: ['Class 9-10', 'Class 11-12', 'Diploma', 'Undergraduate', 'Postgraduate', 'PhD'],
        required: true
    },
    state: {
        type: String,
        required: true
    },
    course: {
        type: String,
        enum: ['Engineering', 'Medical', 'Arts', 'Science', 'Commerce', 'Law', 'Management', 'General'],
        default: 'General'
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'All'],
        default: 'All'
    },
    award: {
        type: String,
        required: true // e.g., "₹50,000", "Up to ₹1,00,000"
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;
