const router = require('express').Router();
const{

    allUsers,
    singleUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser

} = require('../../controllers/userController')

router.route('/').get(allUsers)
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router
.route('/:userId')
.get(singleUser)
.put(updateUser)
.delete(deleteUser)

module.exports = router;
