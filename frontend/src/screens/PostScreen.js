import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Stack, Row, Col, Badge} from 'react-bootstrap'
import parse from 'html-react-parser';
import Discussion from '../components/Discussion'
import Loader from '../components/Loader'
import { adminDetailPost } from '../actions/adminActions'



const PostScreen = () => {

    const dispatch = useDispatch()
    const { id } = useParams()

  

    const adminPostDetail = useSelector(state => state.adminPostDetail)
    const { loading, error, post } = adminPostDetail
    

    useEffect(() => {

    
        dispatch(adminDetailPost(id))

        

    }, [dispatch, id])

    

    return (
         
         <>
<div className="content-wrapper">
  
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      
            <Container className='p-3'>
                
                <Row>
                    <Col className='col-md-8' style={{ marginBottom: '2rem', marginTop: '6rem' }}>
                        {loading ? <Loader /> : error ? <h3>{error}</h3> :

                            <><Container style={{ border: '1px solid lightgrey', padding: '0', borderRadius: '10px', boxShadow: '0 0 1px #333' }}>

                                <Stack gap={3}>
                                    <Container style={{ overflow: 'hidden', padding: '0' }}><img alt="postImage" id="post-screen-thumbnail" style={{ width: '854px', height: '400px', borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }} src={post.postImage}></img></Container>
                                    <Container>
                                        <Row style={{ paddingBottom: '8px', borderBottom: '1px solid lightgrey' }}>
                                            <Col md="auto" style={{ alignSelf: 'center' }}><img alt="postAvatar" className="rounded-circle border border-dark shadow" src={post && post.user ? post.user.avatar : null} style={{ width: '40px', height: '40px' }}></img></Col>
                                            <Col md="auto" id="username" style={{ paddingTop: '10px' }}>
                                                <Row>{post && post.user ? post.user.name : null}</Row>
                                                <Row style={{ fontSize: 'small' }}>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(post.date)}</Row>
                                            </Col>
                                        </Row>
                                    </Container>

                                    <Container style={{ overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto' }}><h1 style={{ textDecoration: 'none', fontWeight: 'bold' }}>{post.title}</h1></Container>
                                    <Container style={{ borderBottom: '1px solid lightgrey', paddingBottom: '2rem' }}>{post.tags && post.tags.split(",").map(tag => (
                                        <> <Badge key={post._id} bg="light" text="black" style={{ padding: '5px 8px 0px' }}>
                                            <h6>{'#'}{tag}</h6>
                                        </Badge>{' '}
                                        </>
                                    ))}</Container>
                                    <Container style={{ overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto', paddingBottom: '8px', borderBottom: '1px solid lightgrey' }}><p>{post && post.desc ? parse(post.desc) : null}</p></Container>
                                    
                                    <Container>
                                        <Row className='my-3'><h3 style={{ fontWeight: '700' }}>Discussions ({(post.comments).length})</h3></Row>
                                       
                                        
                                        {(post.comments).length === 0 ? <h5>No Discussions Yet.</h5> :
                                            (post.comments.map(comment => (
                                                <Col key={comment._id}>
                                                    <Discussion comments={comment} />
                                                </Col>
                                            )))}

                                    </Container>

                                </Stack>
                            </Container></>}

                    </Col>

                    
                </Row></Container>

       </div>

</section>
</div>

</>

    )
}

export default PostScreen
