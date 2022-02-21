import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { postListReducer } from './reducers/postReducers'
import { adminCreatePostReducer, adminDeletePostReducer, adminDeleteUserReducer, adminDetailsReducer, adminLoginReducer, adminMyPostsReducer, adminPostDetailReducer, adminRegisterReducer, adminsListReducer, adminUpdatePostReducer, adminUpdateProfileReducer, reportDetailReducer, reportListReducer, reportResolvedReducer, userListReducer,userpostListReducer } from './reducers/adminReducers'

const reducer = combineReducers({
    postList: postListReducer, 
    adminLogin:adminLoginReducer,
    userList:userListReducer,
    reportList:reportListReducer,
    adminDeletePost:adminDeletePostReducer,
    adminDetails:adminDetailsReducer,
    adminUpdateProfile: adminUpdateProfileReducer,
    adminMyPosts: adminMyPostsReducer,
    adminCreatePost: adminCreatePostReducer,
    adminUpdatePost: adminUpdatePostReducer,
    adminPostDetail:adminPostDetailReducer,
    userposts: userpostListReducer,
    adminDeleteUser:adminDeleteUserReducer,
    adminList:adminsListReducer,
    adminRegister:adminRegisterReducer,
    reportDetail:reportDetailReducer,
    reportResolve:reportResolvedReducer
    
})


const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const adminInfoFromStorage = localStorage.getItem('adminInfo')
    ? JSON.parse(localStorage.getItem('adminInfo'))
    : null


const initialState = {
    userLogin: {
        userInfo: userInfoFromStorage
    },
    adminLogin: {
        adminInfo: adminInfoFromStorage
    }
}




const middleware = [thunk]


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store