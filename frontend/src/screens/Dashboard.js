import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listReports, listUsers } from '../actions/adminActions'
import { listPosts } from '../actions/postActions'


const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const adminLogin = useSelector(state => state.adminLogin)
  const { adminInfo } = adminLogin

  const userList = useSelector(state => state.userList)
  const { loading:loadingUsers,error:errorUsers,users } = userList

  const postList = useSelector(state => state.postList)
  const { loading:loadingPosts,error:errorPosts,posts } = postList

  const reportList = useSelector(state => state.reportList)
  const { loading:loadingReports,error:errorReports,reports } = reportList

    useEffect(() => {
        if (!adminInfo) {
            navigate('/login')
        }
       
        dispatch(listUsers())
        dispatch(listPosts())
        dispatch(listReports())

    }, [adminInfo, navigate,dispatch])




    return (
        <>
        {/* Content Wrapper. Contains page content */}
<div className="content-wrapper">
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Dashboard</h1>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      {/* Info boxes */}
      <div className="row">
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box">
            <span className="info-box-icon bg-info elevation-1"><i className="fas fa-users" /></span>
            <div className="info-box-content">
              <span className="info-box-text">Total Users</span>
              <span className="info-box-number">
                {loadingUsers && <p>...</p>}
                {errorUsers && <p>{errorUsers}</p>}
                {users && (users).length}
              </span>
            </div>
            {/* /.info-box-content */}
          </div>
          {/* /.info-box */}
        </div>
        {/* /.col */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-columns" /></span>
            <div className="info-box-content">
              <span className="info-box-text">Total Posts</span>
              <span className="info-box-number">
                {loadingPosts && <p>...</p>}
                {errorPosts && <p>{errorPosts}</p>}
                {posts && (posts).length}</span>
            </div>
            {/* /.info-box-content */}
          </div>
          {/* /.info-box */}
        </div>
        {/* /.col */}
        {/* fix for small devices only */}
        <div className="clearfix hidden-md-up" />
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-success elevation-1"><i className="fas fa-bug" /></span>
            <div className="info-box-content">
              <span className="info-box-text">Total Reports</span>
              <span className="info-box-number">
              {loadingReports && <p>...</p>}
                {errorReports && <p>{errorReports}</p>}
                {reports && (reports).length}
              </span>
            </div>
            {/* /.info-box-content */}
          </div>
          {/* /.info-box */}
        </div>
        {/* /.col */}
        <div className="col-12 col-sm-6 col-md-3">
          <div className="info-box mb-3">
            <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-user-clock" /></span>
            <div className="info-box-content">
              <span className="info-box-text">RealTime Users</span>
              <span className="info-box-number">69</span>
            </div>
            {/* /.info-box-content */}
          </div>
          {/* /.info-box */}
        </div>
        {/* /.col */}
      </div>
      {/* /.row */}
    </div>

    {/* Main row */}
    
<div className="row">
  {/* Left col */}
  <div className="col-md-8">
    {/* MAP & BOX PANE */}
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Visitors Report</h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-minus" />
          </button>
          <button type="button" className="btn btn-tool" data-card-widget="remove">
            <i className="fas fa-times" />
          </button>
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body p-0">
        <div className="d-md-flex">
          <div className="p-1 flex-fill" style={{overflow: 'hidden'}}>
            {/* Map will be created here */}
            <div id="world-map-markers" style={{height: 325, overflow: 'hidden'}}>
              <div className="map" />
            </div>
          </div>
          <div className="card-pane-right bg-success pt-2 pb-2 pl-4 pr-4">
            <div className="description-block mb-4">
              <div className="sparkbar pad" data-color="#fff">75,80,70</div>
              <h5 className="description-header">8390</h5>
              <span className="description-text">Visits</span>
            </div>
            {/* /.description-block */}
            <div className="description-block mb-4">
              <div className="sparkbar pad" data-color="#fff">90,500</div>
              <h5 className="description-header">30%</h5>
              <span className="description-text">Referrals</span>
            </div>
            {/* /.description-block */}
            <div className="description-block">
              <div className="sparkbar pad" data-color="#fff">90,83,63</div>
              <h5 className="description-header">70%</h5>
              <span className="description-text">Organic</span>
            </div>
            {/* /.description-block */}
          </div>{/* /.card-pane-right */}
        </div>{/* /.d-md-flex */}
      </div>
      {/* /.card-body */}
    </div>
    {/* /.card */}</div>

    <div class="col-md-4">
<div className="card">
  <div className="card-header">
    <h3 className="card-title">Browser Usage</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body">
    <div className="row">
      <div className="col-md-8">
        <div className="chart-responsive">
          <canvas id="pieChart" height={150} />
        </div>
        {/* ./chart-responsive */}
      </div>
      {/* /.col */}
      <div className="col-md-4">
        <ul className="chart-legend clearfix">
          <li><i className="far fa-circle text-danger" /> Chrome</li>
          <li><i className="far fa-circle text-success" /> IE</li>
          <li><i className="far fa-circle text-warning" /> FireFox</li>
          <li><i className="far fa-circle text-info" /> Safari</li>
          <li><i className="far fa-circle text-primary" /> Opera</li>
          <li><i className="far fa-circle text-secondary" /> Navigator</li>
        </ul>
      </div>
      {/* /.col */}
    </div>
    {/* /.row */}
  </div>
  {/* /.card-body */}
  <div className="card-footer p-0">
    <ul className="nav nav-pills flex-column">
      <li className="nav-item">
        <a href="/#" className="nav-link">
          United States of America
          <span className="float-right text-danger">
            <i className="fas fa-arrow-down text-sm" />
            12%</span>
        </a>
      </li>
      <li className="nav-item">
        <a href="/#" className="nav-link">
          India
          <span className="float-right text-success">
            <i className="fas fa-arrow-up text-sm" /> 4%
          </span>
        </a>
      </li>
      <li className="nav-item">
        <a href="/#" className="nav-link">
          China
          <span className="float-right text-warning">
            <i className="fas fa-arrow-left text-sm" /> 0%
          </span>
        </a>
      </li>
    </ul>
</div>
</div>
</div>
</div>


<div className='row'>
    <div className='col-md-8'>
    <div className="card">
  <div className="card-header border-transparent">
    <h3 className="card-title">Top Rated Posts</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body p-0">
    <div className="table-responsive">
      <table className="table m-0">
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Title</th>
            <th>User</th>
            <th>Discussions</th>
            <th>Likes</th>
          </tr>
        </thead>
        <tbody>
        {posts.sort((a, b) => (b.likes).length - (a.likes).length).slice(0, 5).map((post) => (
                            <tr key={post._id}>
                                <td>{post._id}</td>
                                <td>{post.title}</td>
                                <td>{post.user.name}</td>
                                <td>
                                {(post.comments).length}
                                </td>
                                <td>
                                {(post.likes).length}
                                </td>
                              </tr>
                        ))}
        </tbody>
        
      </table>
    </div>
    {/* /.table-responsive */}
  </div>
  {/* /.card-body */}
  
</div>
</div>
<div className='col-md-4'>
  <div className="card">
  <div className="card-header">
    <h3 className="card-title">Top Users</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body p-0">
    <ul className="users-list clearfix">
      {users && users.map((user)=> (
 <li>
 <img src={user.avatar} alt="user-avatar" />
 <a className="users-list-name" href="/#">{user.name}</a>
</li>
      ))
      } 
    </ul>
    {/* /.users-list */}
  </div>
  {/* /.card-body */}
 
  {/* /.card-footer */}
</div>
</div>


</div>

  </section>
</div>

</>
    )
}

export default Dashboard
