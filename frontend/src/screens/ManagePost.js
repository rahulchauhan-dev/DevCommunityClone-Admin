import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import {  Row, Button, Table } from 'react-bootstrap'
import { listPosts } from '../actions/postActions'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { adminDeletePostAction } from '../actions/adminActions'

const ManagePost = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const adminLogin = useSelector(state => state.adminLogin)
  const { adminInfo } = adminLogin

  const postList = useSelector(state => state.postList)
  const { loading:loadingPosts,error:errorPosts,posts } = postList

  const adminDeletePost = useSelector(state => state.adminDeletePost)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = adminDeletePost


  useEffect(() => {
    if (!adminInfo) {
        navigate('/login')
    }
   
    dispatch(listPosts())

}, [adminInfo,dispatch,successDelete,navigate])

const deletePostHandler = (id) => {
  dispatch(adminDeletePostAction(id))
}


    return (
        <>
        {/* Content Wrapper. Contains page content */}
<div className="content-wrapper">
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Manage Posts</h1>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
    <div className='m-4'>
  <h5 className="text-center">Search Posts</h5>
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
    <>
                                <Row><Table striped bordered hover responsive className='table-sm' style={{ marginTop: '1rem' }}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>DATE</th>
                                            <th>TITLE</th>
                                            <th>USER</th>
                                            <th>DISCUSSIONS</th>
                                            <th>LIKES</th>
                                            <th></th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {loadingDelete && <Loader />}
                        {errorDelete && <p>{errorDelete}</p>}
                                      {loadingPosts && <Loader />}
                                      {errorPosts && <p>{errorPosts}</p>}

                                    {posts.map((post) => (
                            <tr key={post._id}>
                                <td>{post._id}</td>
                                <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(post.date)}</td>
                                <td>{post.title}</td>
                                <td>{post.user.name}</td>
                                <td>
                                {(post.comments).length}
                                </td>
                                <td>
                                {(post.likes).length}
                                </td>
                                <td>

<Button className='btn-sm' onClick={() => deletePostHandler(post._id)} variant='light'>
    Delete
</Button>

</td>
                              </tr>
                              
                        ))}
                                    </tbody>
                                </Table></Row> </>
   

</div>

  </section>
</div>

</>
    )
}

export default ManagePost
