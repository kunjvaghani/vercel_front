const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// We do not need bcrypt here because the hashing is done in the pre-save hook
// and we are not comparing passwords in the model file.


const userSchema = new Schema({
    // --- Core Login Information ---
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    googleId: { // For "Login with Google" functionality
        type: String,
    },

    // --- Personal Information ---
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    disable: {type : Boolean, default: false}, // For disabled persons
    dateOfBirth: { type: Date },
    mobileNumber: { type: String, required: [true, 'Mobile number is required'] },
    aadhaarNumber: { type: String, unique: true, sparse: true }, // Unique but can be null

    // --- Address ---
    address: {
        state: { type: String },
        city: { type: String },
        pinCode: { type: String },
        fullAddress: { type: String },
        domicileState: { type: String }
    },

    // --- Guardian Details ---
    guardian: {
        name: { type: String },
        contactNumber: { type: String }
    },

    // --- Academic Details ---
    academics: {
        qualification: { type: String, enum: ['10th', '12th', 'Diploma', 'Graduation'] },
        courseName: { type: String },
        stream: { type: String },
        collegeSchoolName: { type: String },
        rollNumber: { type: String },
        currentYearSemester: { type: String },
        boardUniversity: { type: String },
        cgpaOrPercentage: { type: String }
    },

    // --- Documents Upload ---
    documents: {
        photo: { type: String },
        aadhaarCard: { type:String },
        incomeCertificate: { type: String },
        casteCertificate: { type: String },
        disabilityCertificate: { type: String }, // display only if he/she chhose disbale person
        previousYearResult: { type: String },
        admissionProof: { type: String },
        marksheet10th: { type: String },
        marksheet12th: { type: String },
        marksheetDiploma: { type: String },
    } , 
    role: {
        type: String,
        enum: ['user', 'admin'], // Defines the possible roles
        default: 'user'         // All new users are 'user' by default
    },
   appliedScholarships: [{
        scholarshipId: {
            type: Schema.Types.ObjectId,
            ref: 'Scholarship'
        },
        status: {
            type: String,
            enum: ['Applied', 'In Review', 'Awarded', 'Rejected'],
            default: 'Applied'
        },
        appliedDate: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

// The pre-save hook for hashing the password should be in the model file.
// However, it requires bcryptjs. Let's ensure it's here.
const bcrypt = require('bcryptjs');

userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


const User = mongoose.model('User', userSchema);

module.exports = User;
