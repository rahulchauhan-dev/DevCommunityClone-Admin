import React, { useEffect, useState } from 'react'
import path from 'path'
import { useDispatch, useSelector } from 'react-redux'
import {Col, Row, Form, Button } from 'react-bootstrap'
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {LinkContainer} from 'react-router-bootstrap'
import htmlToDraft from "html-to-draftjs";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/Loader';
import { adminDetailPost, adminUpdatePostAction } from '../actions/adminActions';


const AdminEditPostScreen = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()


    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')
    const [img, setImg] = useState('')
    const [uploading, setUploading] = useState(false)
    const [uploadingSuccess, setuploadingSuccess] = useState(false)
    const [imglink, setImglink] = useState('')
    const [thumbnailname, setThumbnailname] = useState('')
    const [showPrev, setshowPrev] = useState(true)

    const adminUpdatePost = useSelector(state => state.adminUpdatePost)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = adminUpdatePost

    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

     const adminPostDetail = useSelector(state => state.adminPostDetail)
    const { loading: loadingDetails, error: errorDetails, post } = adminPostDetail

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
        dispatch({ type: 'ADMIN_POST_UPDATE_RESET' })

        if (!adminInfo) {
            navigate('/login')
        }
        else {
            if (!post.desc) {
                dispatch(adminDetailPost(id))
            }

            if (post.desc) {
                const contentBlock = htmlToDraft(post.desc);
                if (contentBlock) {
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
                    const editorState = EditorState.createWithContent(contentState);
                    setEditorState(editorState)
                    setTitle(post.title)
                    setImglink(post.postImage)
                    setThumbnailname(post.thumbnailFileName)
                    setTags(post.tags)
                }

            }
        }

    }, [dispatch, id, post, navigate, adminInfo])



    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: 'ADMIN_POST_UPDATE_RESET' })
            navigate(`/admin/posts/${id}`)
        }

    }, [successUpdate, navigate, id, dispatch])


    useEffect(() => {

        setBody(draftToHtml(convertToRaw(editorState.getCurrentContent())).toString())

    }, [editorState])


    const checkFileType = (e) => {
        e.preventDefault()
        setuploadingSuccess(false)
        if (e.target.files[0]) {
            const extname = path.extname(e.target.files[0].name)
            if (!(['.jpeg', '.png', '.jpg'].includes(extname))) {
                alert("images only")

            } else {
                setImg(e.target.files[0])
            }

        }

    }

    const uploadImage = async () => {
        if (!img) {
            alert('Select Image First')
        }
        else {
            const formData = new FormData();
            formData.append("image", img);
            formData.append("album", "Q3MFNAbai61VnK4");
            setUploading(true)

            try {
                const options = {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: "Client-ID 63b6ebe841fd177",
                    }
                }
                const { data } = await axios.post("https://api.imgur.com/3/image", formData, options)
                setUploading(false)
                setImglink(data.data.link)
                setuploadingSuccess(true)
                setshowPrev(false)
            } catch (error) {
                console.log(error)
                setUploading(false)
            }

        }


    }

    const blogSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(adminUpdatePostAction({
            title: title,
            body: body,
            imagelink: imglink,
            thumbnailName: thumbnailname,
            tags: tags
        }, post._id))
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

            <Col>
            <Row style={{ marginTop: '2rem' }}><LinkContainer to='/admin/profile'><Button>Back</Button></LinkContainer></Row>
                <Row>
                    {loadingDetails ? <Loader /> : errorDetails ? <p>{errorDetails}</p> :
                        <Form onSubmit={blogSubmitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter Title'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></Form.Control>
                            </Form.Group> <br></br>

                            <Editor
                                editorState={editorState}
                                toolbarClassName="rdw-storybook-toolbar"
                                wrapperClassName="rdw-storybook-wrapper"
                                editorClassName="rdw-storybook-editor"
                                placeholder='Start Writing Your Cool Blog!'
                                toolbar={{
                                    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                                    inline: { inDropdown: true },
                                    list: { inDropdown: true },
                                    textAlign: { inDropdown: true },
                                    link: { inDropdown: true },
                                    history: { inDropdown: true },
                                }}
                                onEditorStateChange={setEditorState}
                            />

                            <Form.Group controlId='name'>
                                <Form.Label>Tags (if any)</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Add Tags Seperated by ","'
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                ></Form.Control>
                            </Form.Group><br></br>

                            <Form.Group controlId="formFile" className="mb-3">
                                {showPrev && <Form.Label>Previous Uploaded : {thumbnailname}</Form.Label>}
                                <Form.Control type="file" accept='.jpeg, .jpg, .png' onChange={checkFileType} />
                                {uploading ? <p>Uploading..</p> : uploadingSuccess ? <p>Image Uploaded</p> : <Button variant='outline-primary' onClick={uploadImage} style={{ borderColor: 'none', border: 'none', textDecoration: 'underline', marginTop: '10px' }}>Upload New Image</Button>}
                            </Form.Group>

                            <Button type='submit' variant='primary' style={{ marginTop: '2rem' }}>
                                Update
                            </Button>

                        </Form>}
                    {errorUpdate && <p>{errorUpdate}</p>}
                    {loadingUpdate && <p>Loading...</p>}


                </Row>

            </Col>
            </div>

</section>
</div>

</>

    )
}

export default AdminEditPostScreen
