import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import {Row,Table,Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { adminDeletePostAction, listuserPosts } from '../actions/adminActions'
import Loader from '../components/Loader'


const AdminUsersPosts = () => {
  const dispatch = useDispatch()

  const { id } = useParams()

  const userposts = useSelector(state => state.userposts)
  const { loading: loadinguserposts, error: erroruserposts, userposts: postsofuser } = userposts


  useEffect(() => {


    dispatch(listuserPosts(id))


}, [dispatch,id])


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
          <h1 className="m-0">Users Posts</h1>
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
                                            <th>LIKES</th>
                                            <th>DISCUSSIONS</th>
                                            <th></th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {loadinguserposts && <Loader />}
                                      {erroruserposts && <p>{erroruserposts}</p>}
                                        {postsofuser.map((post) => (
                                            <tr key={post._id}>
                                                <td>{post._id}</td>
                                                <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(post.date)}</td>
                                                <td><LinkContainer to={`/admin/posts/${post._id}`}>
                                                    <a href='/#'>{post.title}</a>
                                                </LinkContainer>
                                                </td>
                                                <td>
                                                    {(post.likes).length}
                                                </td>
                                                <td>
                                                    {(post.comments).length}
                                                </td>

                                                <td>

                                                    <Button className='btn-sm' onClick={() => deletePostHandler(post._id)} variant='light'>
                                                        Delete
                                                    </Button>

                                                </td>
                                            </tr>
                                        )) }
                                    </tbody>
                                </Table></Row> </>
   

</div>

  </section>
</div>

</>
    )
}

export default AdminUsersPosts
