const router = require('express').Router();
const recruitmentCtrl = require('../controllers/recruitmentCtrl');
const auth = require('../middleware/auth')

router.post('/post',auth, recruitmentCtrl.postRecruitment);
router.get('/list-post',auth, recruitmentCtrl.getPostRecruitment);
router.delete('/delete/:id',auth, recruitmentCtrl.deleteRecruitment);
router.get('/mypost',auth, recruitmentCtrl.getPostByID);
router.patch('/update/:id',auth,recruitmentCtrl.updateRecruitment);
module.exports = router;