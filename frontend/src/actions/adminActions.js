import axios from "axios"

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({
            type: 'ADMIN_LOGIN_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/admin/login', { email, password }, config)

        dispatch({
            type: 'ADMIN_LOGIN_SUCCESS',
            payload: data
        })

        localStorage.setItem('adminInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: 'ADMIN_LOGIN_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}



export const logout = () => (dispatch) => {

    localStorage.removeItem('adminInfo')
    dispatch({
        type: 'ADMIN_LOGOUT'
    })


}



export const listUsers = () => async (dispatch,getState) => {

    try {
        dispatch({
            type: 'USER_LIST_REQUEST'
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.get('/api/admin/users', {}, config)

        dispatch({
            type: 'USER_LIST_SUCCESS',
            payload: data
        })



    } catch (error) {
        dispatch({
            type: 'USER_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

export const listReports = () => async (dispatch,getState) => {

    try {
        dispatch({
            type: 'REPORTS_LIST_REQUEST'
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.get('/api/admin/reports', {}, config)

        dispatch({
            type: 'REPORTS_LIST_SUCCESS',
            payload: data
        })

    } catch (error) {
        dispatch({
            type: 'REPORTS_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}


export const adminDeletePostAction = (id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'ADMINPOST_DELETE_REQUEST' })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        await axios.delete(`/api/admin/posts/${id}`, {}, config)

        dispatch({
            type: 'ADMINPOST_DELETE_SUCCESS',
        })

    }
    catch (error) {
        dispatch({
            type: 'ADMINPOST_DELETE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const getAdminDetails = () => async (dispatch, getState) => {


    try {
        dispatch({
            type: 'ADMIN_DETAILS_REQUEST'
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/admin/profile/${adminInfo._id}`,{}, config)

        dispatch({
            type: 'ADMIN_DETAILS_SUCCESS',
            payload: data
        })



    } catch (error) {
        dispatch({
            type: 'ADMIN_DETAILS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

export const updateAdminProfile = (admin) => async (dispatch, getState) => {


    try {
        dispatch({
            type: 'ADMIN_UPDATE_PROFILE_REQUEST'
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/admin/profile/${adminInfo._id}`, admin, config)

        dispatch({
            type: 'ADMIN_UPDATE_PROFILE_SUCCESS',
            payload: data
        })


    } catch (error) {
        dispatch({
            type: 'ADMIN_UPDATE_PROFILE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}


export const getAdminMyPosts = () => async (dispatch, getState) => {


    try {
        dispatch({
            type: 'ADMIN_MYPOSTS_REQUEST'
        })
        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/admin/myposts/${adminInfo._id}`, config)

        dispatch({
            type: 'ADMIN_MYPOSTS_SUCCESS',
            payload: data
        })


    } catch (error) {
        dispatch({
            type: 'ADMIN_MYPOSTS_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}

export const adminCreatePostAction = (postData) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'ADMIN_POST_CREATE_REQUEST' })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.post('/api/admin/posts/', postData, config)

        dispatch({
            type: 'ADMIN_POST_CREATE_SUCCESS',
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: 'ADMIN_POST_CREATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const adminUpdatePostAction = (postData, id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'ADMIN_POST_UPDATE_REQUEST' })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/admin/myposts/${id}`, postData, config)

        dispatch({
            type: 'ADMIN_POST_UPDATE_SUCCESS',
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: 'ADMIN_POST_UPDATE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const adminDetailPost = (id) => async (dispatch) => {


    try {
        dispatch({ type: 'ADMIN_POST_DETAIL_REQUEST' })

        const { data } = await axios.get(`/api/admin/posts/${id}`)

        dispatch({
            type: 'ADMIN_POST_DETAIL_SUCCESS',
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: 'ADMIN_POST_DETAIL_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const listuserPosts = (userid) => async (dispatch) => {


    try {
        dispatch({ type: 'USERPOST_LIST_REQUEST' })

        const { data } = await axios.get(`/api/admin/users/posts/${userid}`)


        dispatch({
            type: 'USERPOST_LIST_SUCCESS',
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: 'USERPOST_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const adminDeleteUserAction = (id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'ADMINUSER_DELETE_REQUEST' })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        await axios.delete(`/api/admin/users/${id}`, {}, config)

        dispatch({
            type: 'ADMINUSER_DELETE_SUCCESS',
        })

    }
    catch (error) {
        dispatch({
            type: 'ADMINUSER_DELETE_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const listAdmins = () => async (dispatch,getState) => {

    try {
        dispatch({
            type: 'ADMIN_LIST_REQUEST'
        })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        const { data } = await axios.get('/api/admin/admins', {}, config)

        dispatch({
            type: 'ADMIN_LIST_SUCCESS',
            payload: data
        })



    } catch (error) {
        dispatch({
            type: 'ADMINS_LIST_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}


export const registerAdmin = (name, gender, email, password) => async (dispatch) => {


    try {
        dispatch({
            type: 'ADMIN_REGISTER_REQUEST'
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        await axios.post('/api/admin/admins', { name, gender, email, password }, config)

        dispatch({
            type: 'ADMIN_REGISTER_SUCCESS'
        })


    } catch (error) {
        dispatch({
            type: 'ADMIN_REGISTER_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }

}


export const reportDetailAction = (id) => async (dispatch) => {

    try {
        dispatch({ type: 'REPORT_DETAIL_REQUEST' })

        const { data } = await axios.get(`/api/admin/report/${id}`)

        dispatch({
            type: 'REPORT_DETAIL_SUCCESS',
            payload: data
        })

    }
    catch (error) {
        dispatch({
            type: 'REPORT_DETAIL_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}

export const resolveReportAction = (id) => async (dispatch, getState) => {


    try {
        dispatch({ type: 'REPORT_RESOLVED_REQUEST' })

        const { adminLogin: { adminInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${adminInfo.token}`
            }
        }

        await axios.put(`/api/admin/report/${id}`, {}, config)

        dispatch({
            type: 'REPORT_RESOLVED_SUCCESS'
        })

    }
    catch (error) {
        dispatch({
            type: 'REPORT_RESOLVED_FAIL',
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}
