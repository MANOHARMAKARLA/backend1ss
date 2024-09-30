const User = require('../models/user'); // Importing the User model
const bcrypt = require('bcryptjs'); // For hashing passwords
const jwt = require('jsonwebtoken'); // For JWT token generation
const { sendRegistrationSuccessEmail, sendOtpEmail } = require('../services/emailService'); // To send emails

// Function to generate a random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};


// Add an item to the user's favorites
const addToFavorites = async (req, res) => {
    const { userId, itemId } = req.body; // Assuming userId and itemId are sent in the request body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add itemId to the user's favorites if not already present
        if (!user.favorites.includes(itemId)) {
            user.favorites.push(itemId);
            await user.save();
        }

        res.status(200).json({ message: 'Item added to favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding to favorites' });
    }
};

// Remove an item from the user's favorites
const removeFromFavorites = async (req, res) => {
    const { userId, itemId } = req.body; // Assuming userId and itemId are sent in the request body

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove itemId from the user's favorites
        user.favorites = user.favorites.filter(id => id !== itemId);
        await user.save();

        res.status(200).json({ message: 'Item removed from favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing from favorites' });
    }
};


// Import the User model
const updateUser = async (req, res) => {
    const { email } = req.body; // Expecting the email in the request body
    const {
        firstName,
        lastName,
        phone,
        gender,
        country,
        state,
        dietaryPreference,
        cookingSkills,
        cuisine,
        spiceLevel,
        favoriteRecipes,
        allergic,
        diagnosedWith,
    } = req.body.profile; // Expecting the profile details in the request body

    try {
        console.log(email)
        // Find the user by email and update the details
        const updatedUser = await User.findOneAndUpdate(
            { email: email }, // Query to find user by email
            {
                $set: {
                    'profile.firstName': firstName,
                    'profile.lastName': lastName,
                    'profile.phone': phone,
                    'profile.gender': gender,
                    'profile.country': country,
                    'profile.state': state,
                    'profile.dietaryPreference': dietaryPreference,
                    'profile.cookingSkills': cookingSkills,
                    'profile.cuisine': cuisine,
                    'profile.spiceLevel': spiceLevel,
                    'profile.favoriteRecipes': favoriteRecipes,
                    'profile.allergic': allergic,
                    'profile.diagnosedWith': diagnosedWith,
                }
            },
            { new: true } // Return the updated user document
        );

        // If the user is not found
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the updated user details
        res.status(200).json({
            message: 'User details updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user details' });
    }
};



// Signup method: Creates the user, hashes their password, and sends registration success email
const signup = async (req, res) => {
    try {
        const { username, email, password,  profile } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with verified set to false
        const user = new User({
            username,
            email,
            password: hashedPassword,
            
            profile,
            verified: false,
        });

        await user.save();

        // Send registration successful email
        sendRegistrationSuccessEmail(user);

        res.status(201).json({ message: 'User created successfully. Please request an OTP to verify your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user.' });
    }
};

// Request OTP method: Generates and sends OTP to the user's email
const { v4: uuidv4 } = require('uuid'); // Import UUID package for unique device IDs

const requestOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Automatically generate a unique device ID
        const deviceId = uuidv4(); // Generates a new UUID for the device ID

        // Generate OTP and its expiry time
        const otp = generateOTP();
        const otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

        // Store the OTP in the user model
        user.otps.push({ otp, deviceId, expiry: otpExpiry });
        await user.save();

        // Send OTP via email
        sendOtpEmail(user, otp);

        res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error requesting OTP.' });
    }
};

// Verify OTP method: Verifies the provided OTP
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Find the OTP entry that matches the OTP and is still valid
        const otpEntry = user.otps.find(entry => entry.otp === otp && Date.now() < entry.expiry);

        if (!otpEntry) {
            return res.status(400).json({ message: 'Invalid OTP or OTP has expired.' });
        }

        // OTP is valid, set the otpEntry and user verification status to true
        otpEntry.verified = true; // Mark the OTP as verified
        user.verified = true;  // Mark the user as verified

        // Save the updated user object
        await user.save();

        // Send success response
        res.status(200).json({ message: 'OTP verified successfully, user verified.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying OTP.' });
    }
};




// Login method: Verifies password and checks if the account is verified before logging in
// Import UUID for generating device IDs


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        // If the user doesn't exist
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the user is verified (as a string "true" or "false")
        if (user.verified === "false") {
            return res.status(403).json({ message: 'Account not verified. Please verify your email.' });
        }

        // If verified is "true", proceed with login
        if (user.verified === "true") {
            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Generate Refresh Token
            const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

            // Check if the user is already logged in on another device
            if (user.isLoggedIn) {
                // Log out the previous session (optional)
                user.isLoggedIn = false;
                user.deviceId = null;
            }

            // Generate a new device ID for the current session
            const newDeviceId = uuidv4();

            // Update user with new device ID and mark as logged in
            user.refreshToken = refreshToken;
            user.deviceId = newDeviceId;
            user.isLoggedIn = true;
            await user.save();

            // Send response with the token and user details
            return res.status(200).json({
                token,  // Token at root level
                refreshToken,  // Refresh token at root level
                user: {
                    profile: {
                        firstName: user.profile.firstName,
                        lastName: user.profile.lastName,
                        phone: user.profile.phone
                    },
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    college: user.college,
                    yearOfJoining: user.yearOfJoining,
                    regulations: user.regulations,
                    verified: user.verified,
                    isLoggedIn: user.isLoggedIn,
                    deviceId: user.deviceId,
                    otps: user.otps,
                    __v: user.__v
                }
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};


const logout = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Clear refresh token and login status
        user.refreshToken = null;
        user.isLoggedIn = false; // Mark as logged out
        user.deviceId = null; // Clear device ID
        await user.save();

        res.status(200).json({ message: 'User logged out successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging out.' });
    }
};


module.exports = { signup, requestOTP, verifyOTP, login, logout,updateUser , addToFavorites,removeFromFavorites };
