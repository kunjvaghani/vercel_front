const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    // --- THIS IS THE MOST IMPORTANT PART ---
    // It will print the data your server receives to the terminal.
    console.log('--- New Registration Request ---');
    console.log('Received Body:', req.body);
    console.log('Received Files:', req.files);
    console.log('------------------------------');

    try {
        const {
            email, password, firstName, lastName, mobileNumber
        } = req.body;

        // This check is more specific
        if (!email || !password || !firstName || !lastName || !mobileNumber) {
            console.log('Validation Failed: A required field is missing.');
            return res.status(400).json({ message: 'Please enter all required fields.' });
        }

        // Safely parse nested JSON data
        const address = req.body.address ? JSON.parse(req.body.address) : {};
        const guardian = req.body.guardian ? JSON.parse(req.body.guardian) : {};
        const academics = req.body.academics ? JSON.parse(req.body.academics) : {};

        // Build documentPaths from uploaded files, or set to empty object if none
        let documentPaths = {};
        if (req.files) {
            Object.keys(req.files).forEach(field => {
                // Only take the first file for each field
                documentPaths[field] = req.files[field][0].path;
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        console.log('Password before saving:', password);
        const newUser = new User({
            email,
            password, // <-- plain password, let pre-save hook hash it
            firstName,
            lastName,
            mobileNumber,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            aadhaarNumber: req.body.aadhaarNumber,
            address,
            guardian,
            academics,
            documents: documentPaths
        });

        const savedUser = await newUser.save();
        console.log('Password after saving (should be hashed):', savedUser.password);
        console.log("User saved successfully:", savedUser._id);

        res.status(201).json({
            message: 'User registered successfully!',
            userId: savedUser._id
        });

    } catch (error) {
        console.error('--- REGISTRATION ERROR ---:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};


exports.login = async (req, res) => {
    try {
        console.log('--- LOGIN REQUEST ---');
        console.log('Received Body:', req.body);
        const { email, password } = req.body;
        console.log('Email received:', email);
        console.log('Password received:', password ? '[REDACTED]' : 'No password');
        if (!email || !password) {
            console.log('Validation Failed: Email or password missing.');
            return res.status(400).json({ message: 'Please provide email and password.' });
        }
        const user = await User.findOne({ email });
        console.log('User found from DB:', user);
        if (!user) {
            console.log('No user found with email:', email);
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch);
        if (!isMatch) {
            console.log('Password does not match for user:', email);
            return res.status(401).json({ message: 'kindly check password .' });
        }
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '3h' },
            (err, token) => {
                if (err) {
                    console.error('JWT Sign Error:', err);
                    throw err;
                }
                console.log('JWT generated successfully for user:', email);
                res.json({ token });
            }
        );
    } catch (error) {
        console.error('--- LOGIN ERROR ---:', error);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // 1. Validate input
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }

        // 2. Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'No user found with this email address.' });
        }

        // 3. Set the new password. The pre-save hook in your User.js model
        // will automatically hash it before saving.
        user.password = password;
        await user.save();

        res.status(200).json({ message: 'Password has been updated successfully.' });

    } catch (error) {
        console.error('UPDATE PASSWORD ERROR:', error);
        res.status(500).json({ message: 'Server error while updating password.' });
    }
};