export const adminLoginReducer = (state = {}, action) => {


    switch (action.type) {
        case 'ADMIN_LOGIN_REQUEST':
            return { loading: true }
        case 'ADMIN_LOGIN_SUCCESS':
            return { loading: false, adminInfo: action.payload }
        case 'ADMIN_LOGIN_FAIL':
            return { loading: false, error: action.payload }

        case 'ADMIN_LOGOUT':
            return {}
        default:
            return state;
    }

}

export const userListReducer = (state = { users:[] }, action) => {

    switch (action.type) {
        case 'USER_LIST_REQUEST':
            return { loading: true }
        case 'USER_LIST_SUCCESS':
            return { loading: false, users: action.payload }
        case 'USER_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}

export const reportListReducer = (state = { reports:[] }, action) => {

    switch (action.type) {
        case 'REPORTS_LIST_REQUEST':
            return { loading: true }
        case 'REPORTS_LIST_SUCCESS':
            return { loading: false, reports: action.payload }
        case 'REPORTS_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}


export const adminDeletePostReducer = (state = {}, action) => {


    switch (action.type) {
        case 'ADMINPOST_DELETE_REQUEST':
            return { loading: true }
        case 'ADMINPOST_DELETE_SUCCESS':
            return { loading: false, success: true }
        case 'ADMINPOST_DELETE_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}

export const adminDetailsReducer = (state = { admin: {} }, action) => {


    switch (action.type) {
        case 'ADMIN_DETAILS_REQUEST':
            return { ...state, loading: true }
        case 'ADMIN_DETAILS_SUCCESS':
            return { loading: false, admin: action.payload }
        case 'ADMIN_DETAILS_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}


export const adminUpdateProfileReducer = (state = {}, action) => {


    switch (action.type) {
        case 'ADMIN_UPDATE_PROFILE_REQUEST':
            return { loading: true }
        case 'ADMIN_UPDATE_PROFILE_SUCCESS':
            return { loading: false, success: true, adminInfo: action.payload }
        case 'ADMIN_UPDATE_PROFILE_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}


export const adminMyPostsReducer = (state = { myposts: [] }, action) => {


    switch (action.type) {
        case 'ADMIN_MYPOSTS_REQUEST':
            return { loadingMyPosts: true }
        case 'ADMIN_MYPOSTS_SUCCESS':
            return { loadingMyPosts: false, myposts: action.payload }
        case 'ADMIN_MYPOSTS_FAIL':
            return { loadingMyPosts: false, errorMyPosts: action.payload }
        default:
            return state;
    }

}


export const adminCreatePostReducer = (state = {}, action) => {


    switch (action.type) {
        case 'ADMIN_POST_CREATE_REQUEST':
            return { loading: true }
        case 'ADMIN_POST_CREATE_SUCCESS':
            return { loading: false, success: true, post: action.payload }
        case 'ADMIN_POST_CREATE_FAIL':
            return { loading: false, error: action.payload }
        case 'ADMIN_POST_CREATE_RESET':
            return {}

        default:
            return state;
    }

}


export const adminUpdatePostReducer = (state = { post: {} }, action) => {


    switch (action.type) {
        case 'ADMIN_POST_UPDATE_REQUEST':
            return { loading: true }
        case 'ADMIN_POST_UPDATE_SUCCESS':
            return { loading: false, success: true, post: action.payload }
        case 'ADMIN_POST_UPDATE_FAIL':
            return { loading: false, error: action.payload }
        case 'ADMIN_POST_UPDATE_RESET':
            return { post: {} }
        default:
            return state;
    }

}


export const adminPostDetailReducer = (state = { post: { comments: [] } }, action) => {


    switch (action.type) {
        case 'ADMIN_POST_DETAIL_REQUEST':
            return { loading: true, ...state }
        case 'ADMIN_POST_DETAIL_SUCCESS':
            return { loading: false, post: action.payload }
        case 'ADMIN_POST_DETAIL_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}

export const userpostListReducer = (state = { userposts: [] }, action) => {


    switch (action.type) {
        case 'USERPOST_LIST_REQUEST':
            return { loading: true, userposts: [] }
        case 'USERPOST_LIST_SUCCESS':
            return { loading: false, userposts: action.payload }
        case 'USERPOST_LIST_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}


export const adminDeleteUserReducer = (state = {}, action) => {


    switch (action.type) {
        case 'ADMINUSER_DELETE_REQUEST':
            return { loading: true }
        case 'ADMINUSER_DELETE_SUCCESS':
            return { loading: false, success: true }
        case 'ADMINUSER_DELETE_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}

export const adminsListReducer = (state = { admins:[] }, action) => {

    switch (action.type) {
        case 'ADMIN_LIST_REQUEST':
            return { loading: true }
        case 'ADMIN_LIST_SUCCESS':
            return { loading: false, admins: action.payload }
        case 'ADMIN_LIST_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}



export const adminRegisterReducer = (state = {}, action) => {


    switch (action.type) {
        case 'ADMIN_REGISTER_REQUEST':
            return { loading: true }
        case 'ADMIN_REGISTER_SUCCESS':
            return { loading: false, success:true }
        case 'ADMIN_REGISTER_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}


export const reportDetailReducer = (state = { report: {} }, action) => {


    switch (action.type) {
        case 'REPORT_DETAIL_REQUEST':
            return { loading: true, ...state }
        case 'REPORT_DETAIL_SUCCESS':
            return { loading: false, report: action.payload }
        case 'REPORT_DETAIL_FAIL':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}

export const reportResolvedReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REPORT_RESOLVED_REQUEST':
            return {
                loading: true,
            }
        case 'REPORT_RESOLVED_SUCCESS':
            return {
                loading: false,
                success: true,
            }
        case 'REPORT_RESOLVED_FAIL':
            return {
                loading: false,
                error: action.payload,
            }
        case 'REPORT_RESOLVED_RESET':
            return {}
        default:
            return state
    }
}