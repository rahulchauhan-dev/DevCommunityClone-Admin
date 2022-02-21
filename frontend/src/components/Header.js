import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { logout } from '../actions/adminActions.js';
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

    useEffect(() => {
        if (!adminInfo) {
            navigate('/login')
        }
    }, [adminInfo, navigate])


    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div>

<nav className="main-header navbar navbar-expand navbar-dark">
  {/* Left navbar links */}
  <ul className="navbar-nav">
    <li className="nav-item">
      <a className="nav-link" data-widget="pushmenu" href="/#" role="button"><i className="fas fa-bars" /></a>
    </li>
    <li className="nav-item d-none d-sm-inline-block">
      <a href="/admin/dashboard" className="nav-link">Home</a>
    </li>
   
  </ul>
  {/* Right navbar links */}
  <ul className="navbar-nav ml-auto">
    {/* Navbar Search */}
    <li className="nav-item">
      <a className="nav-link" data-widget="navbar-search" href="/#" role="button">
        <i className="fas fa-search" />
      </a>
      <div className="navbar-search-block">
        <form className="form-inline">
          <div className="input-group input-group-sm">
            <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-navbar" type="submit">
                <i className="fas fa-search" />
              </button>
              <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                <i className="fas fa-times" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </li>

    {/* Notifications Dropdown Menu */}
    <li className="nav-item dropdown">
      <a className="nav-link" data-toggle="dropdown" href="/#">
        <i className="far fa-bell" />
        <span className="badge badge-warning navbar-badge">3</span>
      </a>
      <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
       
        <a href="/#" className="dropdown-item">
          <i className="fas fa-file mr-2" /> 3 new reports
          <span className="float-right text-muted text-sm">2 days</span>
        </a>
        <div className="dropdown-divider" />
        <a href="/#" className="dropdown-item dropdown-footer">See All Notifications</a>
      </div>
    </li>
    <li className="nav-item">
      <a className="nav-link" data-widget="fullscreen" href="/#" role="button">
        <i className="fas fa-expand-arrows-alt" />
      </a>
    </li>
<LinkContainer to='/login'>
    <li className="nav-item">
      <a className="nav-link" href="/#" role="button" onClick={logoutHandler} >
        <i className="fas fa-sign-out-alt" />
      </a>
    </li></LinkContainer>
    
  </ul>
</nav>

            
        </div>
    )
}

export default Header
