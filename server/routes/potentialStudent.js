const router = require('express').Router();
const studentCtrl = require('../controllers/studentCtrl');
const auth = require('../middleware/auth');

router.get('/list-student',auth, studentCtrl.getPotentialStudent);

module.exports = router;