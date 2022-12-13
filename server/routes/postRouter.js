const router = require('express').Router();
const postCtrl = require('../controllers/postCtrl');
const auth = require('../middleware/auth')

router.post('/postArticle',auth, postCtrl.postArticle);
router.get('/list-post',auth, postCtrl.getPostArticle);
router.delete('/delete/:id',auth, postCtrl.deleteArticle);
router.get('/mypost',auth, postCtrl.getArticleByID);
router.patch('/update/:id',auth,postCtrl.updateArticle);
module.exports = router;