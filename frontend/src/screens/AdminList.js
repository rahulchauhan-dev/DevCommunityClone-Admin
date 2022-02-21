import React,{useEffect} from 'react'
import {Row,Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {listAdmins,adminDeleteUserAction } from '../actions/adminActions'
import Loader from '../components/Loader';

const AdminList = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const adminLogin = useSelector(state => state.adminLogin)
  const { adminInfo } = adminLogin

  const adminList = useSelector(state => state.adminList)
  const { loading:loadingAdmins,error:errorAdmins,admins } = adminList

   const adminDeleteUser = useSelector(state => state.adminDeleteUser)
   const { loading:loadingDelete,error:errorDelete,success:successDelete } = adminDeleteUser

  useEffect(() => {
    if (!adminInfo) {
        navigate('/login')
    }
   
    dispatch(listAdmins())
   

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
                <h1>Admin List</h1>
              </div>

              </div>
      </div>
    
    </section>

{/* Main content */}
<section className="content">
    <div className="container-fluid">
 
      
    <Row className='m-4'><LinkContainer to='/admin/addadmin'><Button>Create New Admin</Button></LinkContainer></Row>
      <div className="row">
      {loadingAdmins && <Loader />}
      {errorDelete && <p>{errorDelete}</p>}
        {errorAdmins && <p>{errorAdmins}</p>}
        {loadingDelete && <p>Deleting User...</p>}
        {admins && admins.map((admin) => (

<div className="col-12 col-sm-6 col-md-3">
<div className="card card-primary card-outline">
<div className="card-body box-profile">
<div className="text-center">
<img className="profile-user-img img-fluid img-circle" src={admin.avatar} alt="User" />
</div>
<h3 className="profile-username text-center">{admin.name}</h3>
<p className="text-muted text-center">{admin.bio}</p>
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
<LinkContainer to={`/admin/users/posts/${admin._id}`}><a href="/#" className="btn btn-primary btn-block"><b>View Posts</b></a></LinkContainer>
 
<Button className='btn btn-danger btn-block' onClick={() => deletePostHandler(admin._id)}>
    Delete Admin
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

export default AdminList
