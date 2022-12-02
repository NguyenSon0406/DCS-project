const router = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl');
const auth = require('../middleware/auth');

router.get('/list-student',auth, adminCtrl.getStudents);
router.get('/list-company',auth, adminCtrl.getCompanies);
router.get('/student-info/:id',auth, adminCtrl.getInfoStudent);
router.get('/company-info/:id',auth, adminCtrl.getInfoCompanies);
router.delete('/delete/:id',auth, adminCtrl.deleteStudents)
router.delete('/delete-company/:id',auth, adminCtrl.deleteCompany)
module.exports = router;