const {Router} = require('express')

const {createPost,getPosts,getPost,getCatPosts,getUserPosts,editPost,deletePost,likePost,unlikePost} = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/',authMiddleware ,createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/categories/:category', getCatPosts)
router.get('/users/:id', getUserPosts)
router.patch('/:id',authMiddleware ,editPost)
router.delete('/:id',authMiddleware ,deletePost)
router.put('/:postId/like/:userId', authMiddleware, likePost);
router.put('/:postId/unlike/:userId', authMiddleware, unlikePost);

module.exports = router