const router = require('express').Router();
const studentCtrl = require('../controllers/studentCtrl');
const auth = require('../middleware/auth');

router.get('/list-student',auth, studentCtrl.getPotentialStudent);
router.patch('/count-post/:id', auth, studentCtrl.countPosts)
module.exports = router;