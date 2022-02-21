import React,{useEffect} from 'react'
import {useSelector } from 'react-redux'

import {LinkContainer} from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'

const SideBar = () => {
    

  const navigate = useNavigate()


  const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

    useEffect(() => {
        if (!adminInfo) {
            navigate('/login')
        }
    }, [adminInfo, navigate])
  
  
  
  return (   
       
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
          <div>
  {/* Brand Logo */}
  <a href="/#" className="brand-link" style={{textAlign:'center'}}>
    <span className="brand-text" style={{ background: 'white', borderRadius: '4px', padding: '8px',fontWeight:'bold', textDecoration:'none',color:'black' }}>&lt;HowTo&#47;&gt;</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="https://avatars.dicebear.com/api/avataaars/admin.svg" className="img-circle elevation-2 border" alt="admin-profile-img" />
      </div>
      <div className="info">
      <LinkContainer to='/admin/profile'>
        <a href="/#" className="d-block">Hello! {adminInfo.name}</a></LinkContainer>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
        {/* Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library */}
               <LinkContainer to='/admin/dashboard'><li className="nav-item" >
            <a href="/#" class="nav-link" data-toggle="tab">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
               Dashboard
              </p>
            </a>
          </li></LinkContainer>
          <LinkContainer to='/admin/posts'>
        <li className="nav-item" >
        
            <a href="/#" class="nav-link" data-toggle="tab">
              <i class="nav-icon fas fa-edit"></i>
              <p>
                Manage Posts
              </p>
            </a>
          </li>
          </LinkContainer>

          <LinkContainer to='/admin/users'>
          <li className="nav-item">
         
            <a href="/#" class="nav-link" data-toggle="tab">
              <i class="nav-icon fas fa-user"></i>
              <p>
                Manage Users
              </p>
            </a>
          </li>
          </LinkContainer>

          <LinkContainer to='/admin/reports'>
          <li className="nav-item">
          
            <a href="/#" class="nav-link" data-toggle="tab">
              <i class="nav-icon fas fa-book"></i>
              <p>
                Reports
              </p>
            </a>
          </li>
          </LinkContainer>
          <LinkContainer to='/admin/manageadmins'>
          <li className="nav-item">
          
            <a href="/#" className="nav-link" data-toggle="tab">
              <i className="nav-icon fas fa-key"></i>
              <p>
                Admins
              </p>
            </a>
          </li>
       </LinkContainer>
       <li class="nav-item">
            <a href="/#" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>
                Others
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview">
            <LinkContainer to='/admin/code-of-conduct'>
              <li class="nav-item">
                <a href="/#" class="nav-link"  data-toggle="tab">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Code Of Conduct</p>
                </a>
              </li></LinkContainer>
              <LinkContainer to='/admin/privacy-policy'>
              <li class="nav-item">
                <a href="/#" class="nav-link"  data-toggle="tab">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Privacy Policy</p>
                </a>
              </li></LinkContainer>
              <LinkContainer to='/admin/terms-of-use'>
              <li class="nav-item">
                <a href="/#" class="nav-link"  data-toggle="tab">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Terms Of Use</p>
                </a>
              </li></LinkContainer>
              
            </ul>
          </li>
      </ul>
    </nav>
    
  </div>
</div>
 </aside>

        
    )
}

export default SideBar
