import React, { useState, useEffect } from 'react'
import { Container, Button, Form, FloatingLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { registerAdmin } from '../actions/adminActions'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader'


const AddAdmin = () => {

   
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('male')

    const dispatch = useDispatch()

    const adminRegister = useSelector(state => state.adminRegister)
    const { loading, error, success:successCreateAdmin } = adminRegister

    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

    useEffect(() => {
        if (!adminInfo) {
            navigate('/login')
        }
    }, [adminInfo, navigate])

    useEffect(() => {
        if (successCreateAdmin) {
            navigate('/admin/manageadmins')
        }
    }, [navigate,successCreateAdmin])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(registerAdmin(name, gender, email, password))

    }

    return (
        <>
        {/* Content Wrapper. Contains page content */}
<div className="content-wrapper">
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Create New Admin</h1>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
            <Container className='justify-content-md-center text-center shadow-lg p-4' style={{ maxWidth: '600px', fontWeight: 'bold' }}>
                <h3>Welcome to HowTo Community</h3>

                {error && <h2>{error}</h2>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler} className="mt-4" style={{ display: 'inline-block' }}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder=''
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>                    <br></br>

                    <Form.Group controlId='gender'>
                        <Form.Label>Gender</Form.Label>
                        <FloatingLabel onChange={(e) => setGender(e.target.value)} value={gender} controlId="floatingSelect" label="For Generating Avatar">
                            <Form.Select aria-label="Floating label select example">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Others</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>                    <br></br>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder=''
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>                    <br></br>


                    <Form.Group controlId='pass'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder=''
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <br></br>
                    <Button type='submit' className="btn" disabled={(email === '' || password === '' || name === '' || gender === '')} style={{ borderRadius: '0.5em', fontWeight: '600' }}>Continue</Button>
                </Form>

            </Container>
            </div>

</section>
</div></>
    )
}

export default AddAdmin
