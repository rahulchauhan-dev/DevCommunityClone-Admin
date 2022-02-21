import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'
import {adminDeleteUserAction, listUsers } from '../actions/adminActions'
import Loader from '../components/Loader';
import {Button} from 'react-bootstrap'


const ManageUser = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const adminLogin = useSelector(state => state.adminLogin)
  const { adminInfo } = adminLogin

  const userList = useSelector(state => state.userList)
  const { loading:loadingUsers,error:errorUsers,users } = userList

  const adminDeleteUser = useSelector(state => state.adminDeleteUser)
  const { loading:loadingDelete,error:errorDelete,success:successDelete } = adminDeleteUser

  useEffect(() => {
    if (!adminInfo) {
        navigate('/login')
    }
   
    dispatch(listUsers())
   

}, [adminInfo, navigate,dispatch,successDelete])


const deletePostHandler = (id) => {
  dispatch(adminDeleteUserAction(id))
}


    return (

        <div class="content-wrapper">
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Users</h1>
              </div>
              </div>
      </div>
    
    </section>

{/* Main content */}
<section className="content">
    <div className="container-fluid">
      {/* Info boxes */}
      <div className='m-4'>
  <h5 className="text-center">Search Users</h5>
  <div className="row">
    <div className="col-md-8 offset-md-2">
      <form action="simple-results.html">
        <div className="input-group">
          <input type="search" className="form-control form-control-lg" placeholder="Type your keywords here" />
          <div className="input-group-append">
            <button type="submit" className="btn btn-lg btn-default">
              <i className="fa fa-search" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

      <div className="row">
      {errorDelete && <p>{errorDelete}</p>} 
      {loadingDelete && <p>Deleting User...</p>}
        {loadingUsers && <Loader />}
        {errorUsers && <p>{errorUsers}</p>}
        {users && users.map((user) => (

<div className="col-12 col-sm-6 col-md-3">
<div className="card card-primary card-outline">
<div className="card-body box-profile">
<div className="text-center">
<img className="profile-user-img img-fluid img-circle" src={user.avatar} alt="User" />
</div>
<h3 className="profile-username text-center">{user.name}</h3>
<p className="text-muted text-center">{user.bio}</p>
<ul className="list-group list-group-unbordered mb-3">
<li className="list-group-item">
<b>Followers</b> <p className="float-right">1,322</p>
</li>
<li className="list-group-item">
<b>Following</b> <p className="float-right">543</p>
</li>
<li className="list-group-item">
<b>Total Posts</b> <p className="float-right">13,287</p>
</li>
</ul>
<LinkContainer to={`/admin/users/posts/${user._id}`}><a href="/#" className="btn btn-primary btn-block"><b>View Posts</b></a></LinkContainer>

<Button className='btn btn-danger btn-block' onClick={() => deletePostHandler(user._id)}>
    Delete User
</Button>

</div>
</div>
</div>

        ))}
        

</div>
</div>
</section>
</div>
    )
}

export default ManageUser
