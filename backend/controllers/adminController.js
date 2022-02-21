import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'
import PostReport from '../models/postReportModal.js'


//@desc Auth user & get token
//@route POST /api/admin/login
//@access Public
const authAdminUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body

    const admin = await User.findOne({ email: email })

    if (admin && (await admin.matchPassword(password)) && admin.isAdmin) {

        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            token: generateToken(admin._id)
        })

    } else {
        res.status(401)
        throw new Error('Invalid Email or Password or Not Authorized as Admin')
    }

})

//@desc Get all Users
//@route GET /api/admin/users
//@access Private/Admin
const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})
    res.json(users)

})

//@desc Get all Reports
//@route GET /api/admin/reports
//@access Private/Admin
const getReports = asyncHandler(async (req, res) => {

    const reports = await PostReport.find({})
    res.json(reports)


})

//@desc Delete a Post
//@route DELETE /api/admin/posts/:id
//@access Private/Admin
const adminDeletePost = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id)

    if (post) {
        await post.remove()
        res.json({ message: 'Post Deleted!' })
    } else {
        res.status(404)
        throw new Error('Post not Found')
    }

})

//@desc Get admin profile
//@route GET /api/admin/profile/:id
//@access Private/Admin
const getAdminProfile = asyncHandler(async (req, res) => {

    const admin = await User.findById(req.params.id)
    
    if (admin) {
        res.json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            bio: admin.bio,
            work: admin.work,
            location: admin.location,
            avatar: admin.avatar,
            savedPost: admin.savedPost
        })

    } else {
        res.status(404)
        throw new Error('Admin not Found')
    }


})

//@desc Update admin profile
//@route PUT /api/admin/profile/:id
//@access Private/Admin
const updateAdminProfile = asyncHandler(async (req, res) => {


    const admin = await User.findById(req.params.id)

    if (admin) {
        admin.name = req.body.name || admin.name
        admin.email = req.body.email || admin.email
        admin.gender = req.body.gender || admin.gender
        admin.bio = req.body.bio || admin.bio
        admin.work = req.body.work || admin.work
        admin.location = req.body.location || admin.location

        if (req.body.password) {
            admin.password = req.body.password
        }

        const updatedUser = await admin.save()

        res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            bio: updatedUser.bio,
            work: updatedUser.work,
            location: updatedUser.location,
            avatar: updatedUser.avatar,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404)
        throw new Error('Admin not Found')
    }


})


//@desc Fetch logged admin all Posts
//@route GET /api/admin/myposts/:id
//@access Private/Admin
const getAdminMyPosts = asyncHandler(async (req, res) => {
    const myposts = await Post.find({ user: req.params.id })
    res.json(myposts)
})


//@desc Add new Post
//@route POST /api/admin/posts
//@access Private/Admin
const adminAddPost = asyncHandler(async (req, res) => {

    const { user, title, body, imagelink, thumbnailName, tags } = req.body

    const post = new Post({
        user: user,
        title: title,
        desc: body,
        postImage: imagelink,
        thumbnailFileName: thumbnailName,
        tags: tags
    })

    const createdPost = await post.save()
    res.status(201).json(createdPost)

})

//@desc Update Post
//@route PUT /api/admin/myposts/:id
//@access Private/Admin
const adminUpdatePost = asyncHandler(async (req, res) => {

    const { title, body, imagelink, thumbnailName, tags } = req.body

    const post = await Post.findById(req.params.id)

    if (post) {
        post.title = title || post.title,
            post.desc = body || post.desc,
            post.postImage = imagelink || post.postImage,
            post.thumbnailFileName = thumbnailName || post.thumbnailFileName
        post.tags = tags || post.tags


        const updatedPost = await post.save()
        res.status(201).json(updatedPost)
    } else {
        res.status(404)
        throw new Error('Post not Found')
    }

})

//@desc Fetch  Post by id
//@route GET /api/admin/posts/:id
//@access Private/Admin
const adminGetPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id).populate('user', 'name avatar bio work location date')

    if (post) {
        res.json(post)
    }
    else {
        res.status(404)
        throw new Error('Post not Found')
    }

})


//@desc Fetch users all Posts
//@route GET /api/admin/users/posts/:id
//@access Private/Admin
const getUserAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ user: req.params.id })
    res.json(posts)
})


//@desc Delete a User
//@route DELETE /api/admin/users/:id
//@access Private/Admin
const adminDeleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User Deleted!' })
    } else {
        res.status(404)
        throw new Error('User not Found')
    }

})


//@desc Get all Admins
//@route GET /api/admin/admins
//@access Private/Admin
const getAdmins = asyncHandler(async (req, res) => {

    const admins = await User.find({isAdmin:true})
    res.json(admins)

})


//@desc Register a new Admin
//@route POST /api/admin/admins
//@access Private/Admin
const registerAdmin = asyncHandler(async (req, res) => {

    const { name, gender, email, password } = req.body

    const adminExist = await User.findOne({ email })

    if (adminExist) {
        res.status(400)
        throw new Error('Admin Already Exists')
    }

    const admin = await User.create({
        name,
        gender,
        isAdmin:true,
        email,
        password,
        avatar: `https://avatars.dicebear.com/api/${gender}/${name.split(' ')[0].toLowerCase()}.svg`
    })

    if (admin) {

        res.status(201).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            isAdmin: admin.isAdmin,
            gender: admin.gender,
            bio: admin.bio,
            work: admin.work,
            location: admin.location,
            avatar: admin.avatar,
            token: generateToken(admin._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user Data')


    }

})


// @desc    Update Report to Resolved
// @route   PUT /api/admin/report/:id
// @access  Private/Admin
const updateReportToResolved = asyncHandler(async (req, res) => {

    const report = await PostReport.findById(req.params.id)

    if (report) {
        report.isResolved = true
        report.resolvedDate = Date.now()

        const updatedReport = await report.save()

        res.json(updatedReport)
    } else {
        res.status(404)
        throw new Error('Report not found')
    }
})

// @desc    Fetch Report by Id
// @route   GET /api/admin/report/:id
// @access  Private/Admin
const getReportById = asyncHandler(async (req, res) => {

    const report = await PostReport.findById(req.params.id)

    if (report) {
        res.json(report)
    } else {
        res.status(404)
        throw new Error('Report not found')
    }
})



export {registerAdmin,getAdmins,adminDeleteUser,authAdminUser,getUsers,getReports,adminDeletePost,
    getAdminProfile,updateAdminProfile,getAdminMyPosts,
    adminAddPost,adminUpdatePost,adminGetPostById,getUserAllPosts,updateReportToResolved,getReportById}