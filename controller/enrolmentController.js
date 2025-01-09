const enrolment = require("../db/models/enrolment");

const enrolmentUser = async (req, res, next) => {
    const  body  = req.body;
    console.log("Request Body:", body);

    try {
        const newEnrollment = await enrolment.create({
            name: body.name,
            phone: body.phone,
            date: body.date,
            address: body.address,
            comment: body.comment,
        });
        if (!newEnrollment) {
            return res.status(400).json({
                status: "fail",
                message: "Failed to store enrolment data",
            });
        }
        return res.status(201).json({
            status: "success",
            data: newEnrollment,
        });
    } catch (error) {
        
        return res.status(500).json({
            status: "fail",
            message: "An error occurred while creating the enrollment.",
        })
    }
}

const enrolmentGet = async (req, res, next) => {
    try {
        const enrolments = await enrolment.findAll();
        if (enrolments.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No enrolments found!",
            });
        }
        return res.status(200).json({
            status: "success",
            data: enrolments,
        });
    } catch (error) {
        console.error("Error getting enrolments:", error);
        return res.status(500).json({
            status: "fail",
            message: "An error occurred while getting the enrolments.",
        });
    }
};

const enrolmentUpdate = async (req, res, next) => {
    try {
        const enrolmentId = req.params.id;
        const body = req.body;
        const existingEnrolment = await enrolment.findByPk(enrolmentId);

        if (!existingEnrolment) {
            return res.status(404).json({
                status: "fail",
                message: "Enrolment not found for updating",
            });
        }

        existingEnrolment.name = body.name;
        existingEnrolment.phone = body.phone;
        existingEnrolment.date = body.date;
        existingEnrolment.address = body.address;
        existingEnrolment.comment = body.comment;

        await existingEnrolment.save();

        return res.status(200).json({
            status: "success",
            data: existingEnrolment,
        });
    } catch (error) {
        console.error("Error updating enrolment:", error);
        return res.status(500).json({
            status: "fail",
            message: "An error occurred while updating the enrolment.",
        });
    }
};

module.exports = {
    enrolmentUser,
    enrolmentGet,
    enrolmentUpdate
};