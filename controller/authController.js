const bcrypt = require('bcrypt'); // Import bcrypt
const user = require("../db/models/user");
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const signUp = async (req, res, next) => {
    try {
        const body = req.body;
        // Validate userType
        if (!['0', '1'].includes(body.userType)) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid user type. Allowed values are "0" and "1".',
            });
        }

        // Create a new user
        const newUser = await user.create({
            userType: body.userType,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword,
        });

        const result = newUser.toJSON();
        delete result.password;

        result.token = generateToken({
            id: result.id,
        });

        return res.status(201).json({
            status: 'success',
            data: result,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: 'fail',
            message: 'An error occurred while creating the user.',
        });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide email and password.',
        });
    }

    // Ensure await is used with user.findOne
    const result = await user.findOne({ where: { email } });
    if (!result || !(await bcrypt.compare(password, result.password))) {
        return res.status(401).json({
            status: 'fail',
            message: 'Incorrect email or password.',
        });
    }

    const token = generateToken({
        id: result.id,
    });

    return res.json({
        status: 'success',
        token,
    });
};

module.exports = { signUp, login };
