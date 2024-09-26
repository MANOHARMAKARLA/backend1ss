const nodemailer = require('nodemailer');

// Function to send registration success email
const sendRegistrationSuccessEmail = (user) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Registration Successful',
        text: `Welcome ${user.username}! You have successfully registered. Please request an OTP to verify your email.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending registration email:', error);
        } else {
            console.log('Registration email sent:', info.response);
        }
    });
};

// Function to send OTP email
const sendOtpEmail = (user, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Your OTP for Email Verification',
        text: `Your OTP is: ${otp}. It is valid for 5 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending OTP email:', error);
        } else {
            console.log('OTP email sent:', info.response);
        }
    });
};

module.exports = { sendRegistrationSuccessEmail, sendOtpEmail };
