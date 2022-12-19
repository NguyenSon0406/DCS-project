const router = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl');
const auth = require('../middleware/auth');

router.get('/list-student',auth, adminCtrl.getStudents);
router.get('/list-company',auth, adminCtrl.getCompanies);
router.delete('/delete/:id',auth, adminCtrl.deleteStudents)
router.get('/student-info/:id',auth, adminCtrl.getInfoStudent);
router.get('/company-info/:id',auth, adminCtrl.getInfoCompanies);
router.delete('/delete-company/:id',auth, adminCtrl.deleteCompany);
router.get('/list-recruitment',auth,adminCtrl.getPostRecruitment);
router.delete('/delete-recruitment/:id',auth,adminCtrl.deleteRecruitment);
router.get('/recruitment-info/:id',auth,adminCtrl.getRecruitmentByID);
router.get('/list-post', auth, adminCtrl.getPostArticle);
router.delete('/delete-article/:id', auth, adminCtrl.deleteArticle);
router.get('/article-info/:id', auth, adminCtrl.getArticleByID);

module.exports = router;