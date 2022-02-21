import express from 'express'
const router = express.Router()
import { protect,admin } from '../middleware/authMiddlerware.js'
import {adminAddPost, adminDeletePost, adminDeleteUser, adminGetPostById, adminUpdatePost, authAdminUser, getAdminMyPosts, getAdminProfile, getAdmins, getReportById, getReports, getUserAllPosts, getUsers, registerAdmin, updateAdminProfile, updateReportToResolved} from '../controllers/adminController.js'

router.post('/login', authAdminUser)
router.route('/users').get(getUsers,protect,admin)
router.route('/users/:id').delete(adminDeleteUser,protect,admin)
router.route('/users/posts/:id').get(getUserAllPosts,protect,admin)
router.route('/reports').get(getReports,protect,admin)
router.route('/posts/:id').delete(adminDeletePost,protect,admin).get(adminGetPostById,protect,admin)
router.route('/profile/:id').get(getAdminProfile,protect,admin).put(updateAdminProfile,protect,admin)
router.route('/myposts/:id').get(getAdminMyPosts,protect,admin).put(adminUpdatePost,protect,admin)
router.route('/posts').post(adminAddPost,protect,admin)
router.route('/report/:id').put(updateReportToResolved,protect,admin).get(getReportById,protect,admin)
router.route('/admins').get(getAdmins,protect,admin).post(registerAdmin,protect,admin)






export default router