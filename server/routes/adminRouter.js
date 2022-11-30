const router = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl');
const auth = require('../middleware/auth');

router.get('/list-student',auth, adminCtrl.getStudents);
router.get('/list-company',auth, adminCtrl.getCompanies);
router.delete('/delete/:id',auth, adminCtrl.deleteStudents)
module.exports = router;