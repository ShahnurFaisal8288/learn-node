// Initiate express router

const { enrolmentUser, enrolmentGet, enrolmentUpdate } = require('../controller/enrolmentController');


const router = require('express').Router();

router.route('/enrolment').post(enrolmentUser);
router.route('/enrolment').get(enrolmentGet);
router.route('/enrolmentUpdate').get(enrolmentUpdate);

module.exports = router;
