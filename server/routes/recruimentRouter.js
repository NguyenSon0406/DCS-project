const router = require('express').Router();
const recruitmentCtrl = require('../controllers/recruitmentCtrl');
const auth = require('../middleware/auth')

router.post('/post',auth, recruitmentCtrl.postRecruitment);
router.get('/list-post',auth, recruitmentCtrl.getPostRecruitment);
router.delete('/delete/:id',auth, recruitmentCtrl.deleteRecruitment);

module.exports = router;