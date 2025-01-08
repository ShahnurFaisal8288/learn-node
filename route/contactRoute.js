
const { contactUs, contactGet, contactUpdate, contactDelete } = require('../controller/contactController');
const router = require('express').Router();



router.route('/contact').post(contactUs);
router.route('/contactGet').get(contactGet);
router.route('/contactUpdate/:id').put(contactUpdate);
router.route('/contactDelete/:id').delete(contactDelete);



module.exports= router;