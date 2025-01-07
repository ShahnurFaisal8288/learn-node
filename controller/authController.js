const user = require("../db/models/user");

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
        });

        return res.status(201).json({
            status: 'success',
            data: newUser,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({
            status: 'fail',
            message: 'An error occurred while creating the user.',
        });
    }
};

module.exports = { signUp };
