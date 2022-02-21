import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'
import { getAdminDetails, updateAdminProfile,getAdminMyPosts, adminDeletePostAction } from '../actions/adminActions'

const AdminProfile = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [work, setWork] = useState('')
    const [location, setLocation] = useState('')
    const [avatar, setAvatar] = useState('')

    const adminDetails = useSelector(state => state.adminDetails)
    const { loading, error, admin } = adminDetails

    const adminMyPosts = useSelector(state => state.adminMyPosts)
    const { loadingMyPosts, errorMyPosts, myposts } = adminMyPosts

    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

    const adminUpdateProfile = useSelector(state => state.adminUpdateProfile)
    const { success } = adminUpdateProfile

    const adminDeletePost = useSelector(state => state.adminDeletePost)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = adminDeletePost

    const adminCreatePost = useSelector(state => state.adminCreatePost)
    const { success: successCreate } = adminCreatePost

    useEffect(() => {

        dispatch({ type: 'ADMIN_POST_CREATE_RESET' })
        dispatch({ type: 'ADMIN_POST_UPDATE_RESET' })

        if (!adminInfo) {
            navigate('/login')
        } else {
            if (!admin.name) {
                dispatch(getAdminDetails())
                dispatch(getAdminMyPosts())

            } else {
                setName(admin.name)
                setEmail(admin.email)
                setBio(admin.bio)
                setAvatar(admin.avatar)
                setWork(admin.work)
                setLocation(admin.location)
            }
        }



    }, [dispatch, admin, adminInfo, navigate, myposts, successDelete, successCreate])



    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateAdminProfile({
            id: admin._id,
            name,
            email,
            bio,
            work,
            location
        }))

    }

    const deletePostHandler = (id) => {
        dispatch(adminDeletePostAction(id))
    }

    return (
        
        
<div className="content-wrapper">
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Profile</h1>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
                <Row>
                    <Col md={3}>
                        {loading ? (<Loader />) : error ? (<h2>{error}</h2>) : (
                            <><Row style={{ justifyContent: 'center', margin: '2rem' }}><img alt="postAvatar" className="rounded-circle border border-dark shadow" src={avatar} style={{ width: '100px', height: '100px' }}></img></Row>
                            <Row style={{ justifyContent: 'center' }}>
                                <Form onSubmit={submitHandler} style={{ marginBottom: '2rem' }}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type='name'
                                            placeholder='Enter name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group> <br></br>

                                    <Form.Group controlId='email'>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type='email'
                                            placeholder='Enter email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group><br></br>

                                    <Form.Group controlId='bio'>
                                        <Form.Label>Bio</Form.Label>
                                        <Form.Control
                                            as="textarea" rows={3}
                                            type='name'
                                            placeholder='Enter Bio'
                                            value={bio || ''}
                                            onChange={(e) => setBio(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group><br></br>

                                    <Form.Group controlId='work'>
                                        <Form.Label>Work At</Form.Label>
                                        <Form.Control
                                            type='name'
                                            placeholder='Enter Work'
                                            value={work || ''}
                                            onChange={(e) => setWork(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group><br></br>

                                    <Form.Group controlId='location'>
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type='name'
                                            placeholder='Enter Location'
                                            value={location || ''}
                                            onChange={(e) => setLocation(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Button type='submit' variant='primary' style={{ marginTop: '2rem' }}>
                                        Update
                                    </Button>
                                    {success && <h2>UPDATED!</h2>}
                                </Form>
                            </Row></>
                        )}
                    </Col>
                    <Col md={9}>
                        <h2>My Posts</h2>
                        {loadingDelete && <Loader />}
                        {errorDelete && <p>{errorDelete}</p>}
                        {loadingMyPosts ? (
                            <Loader />
                        ) : errorMyPosts ? (
                            <h2>{errorMyPosts}</h2>
                        ) : (
                            <> <Row style={{ marginTop: '2rem' }}><LinkContainer to='/admin/addpost'><Button variant="outline-primary">AddPost</Button></LinkContainer></Row>
                                <Row><Table striped bordered hover responsive className='table-sm' style={{ marginTop: '1rem' }}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>DATE</th>
                                            <th>TITLE</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myposts.map((mypost) => (
                                            <tr key={mypost._id}>
                                                <td>{mypost._id}</td>
                                                <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(mypost.date)}</td>
                                                <td><LinkContainer to={`/posts/${mypost._id}`}>
                                                    <a href='/#'>{mypost.title}</a>
                                                </LinkContainer>
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/admin/myposts/edit/${mypost._id}`}>
                                                        <Button className='btn-sm' variant='light'>
                                                            Edit
                                                        </Button>
                                                    </LinkContainer>
                                                </td>
                                                <td>
                                                    <Button className='btn-sm' onClick={() => deletePostHandler(mypost._id)} variant='light'>
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table></Row> </>
                        )}
                    </Col>
                </Row>
</div>
</section>
</div>
            
    )
}

export default AdminProfile

