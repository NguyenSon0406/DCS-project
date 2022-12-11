const router = require('express').Router();
const { getRecruitmentByID } = require('../controllers/adminCtrl');
const adminCtrl = require('../controllers/adminCtrl');
const auth = require('../middleware/auth');

router.get('/list-student',auth, adminCtrl.getStudents);
router.get('/list-company',auth, adminCtrl.getCompanies);
router.delete('/delete/:id',auth, adminCtrl.deleteStudents)
router.get('/student-info/:id',auth, adminCtrl.getInfoStudent);
router.get('/company-info/:id',auth, adminCtrl.getInfoCompanies);
router.delete('/delete-company/:id',auth, adminCtrl.deleteCompany);
router.get('/list-recruitment',auth,adminCtrl.getPostRecruitment);
router.get('/delete-recruitment/:id',auth,adminCtrl.deleteRecruitment);
router.get('/recruitment-info/:id',auth,adminCtrl.getRecruitmentByID);
module.exports = router;