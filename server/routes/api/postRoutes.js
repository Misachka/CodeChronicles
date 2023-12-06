const router = require('express').Router();
const {

    allPosts,
    singlePost,
    newPost,
    updatePost,
    deletePost,

} = require('../../controllers/postController');

router.route('/').get(allPosts).post(newPost)
router
.route('/:postId')
.get(singlePost)
.put(updatePost)
.delete(deletePost)

module.exports = router;





