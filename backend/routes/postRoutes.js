const {Router} = require('express')

const {createPost,getPosts,getPost,getCatPosts,getUserPosts,editPost,deletePost, likePost} = require('../controllers/postController')
const authMiddleware = require('../middleware/authMiddleware')

const router = Router()

router.post('/',authMiddleware ,createPost)
router.get('/', getPosts)
router.get('/:id', getPost)
router.get('/categories/:category', getCatPosts)
router.get('/users/:id', getUserPosts)
router.patch('/:id',authMiddleware ,editPost)
router.delete('/:id',authMiddleware ,deletePost)
router.put('/:id/like', authMiddleware, likePost);

// router.post('/:postId/like', (req, res) => {
//     const { postId } = req.params;
//     const post = posts.find(p => p.id === postId);
  
//     if (post) {
//       post.likes += 1;
//       res.status(200).json({ message: 'Post liked successfully', post });
//     } else {
//       res.status(404).json({ message: 'Post not found' });
//     }
//   });

module.exports = router