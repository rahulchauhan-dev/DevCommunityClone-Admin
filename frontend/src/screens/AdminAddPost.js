import React, { useEffect, useState } from 'react'
import path from 'path'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Form, Button } from 'react-bootstrap'
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { adminCreatePostAction } from '../actions/adminActions';

const AdminAddPost = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')
    const [img, setImg] = useState('')
    const [uploading, setUploading] = useState(false)
    const [uploadingSuccess, setuploadingSuccess] = useState(false)
    const [imglink, setImglink] = useState('')
    const [thumbnailname, setThumbnailname] = useState('')


    const adminLogin = useSelector(state => state.adminLogin)
    const { adminInfo } = adminLogin

    const adminCreatePost = useSelector(state => state.adminCreatePost)
    const { loading: loadingCreate, success: successCreate, error: errorCreate } = adminCreatePost

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );


    useEffect(() => {
        dispatch({ type: 'ADMIN_POST_CREATE_RESET' })
        if (!adminInfo) {
            navigate('/login')
        }
        if (successCreate) {
            navigate('/admin/profile')
        }

    }, [successCreate, adminInfo, dispatch, navigate])


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
                setThumbnailname(img.name)
                setuploadingSuccess(true)
            } catch (error) {
                console.log(error)
                setUploading(false)
            }

        }

    }

    const blogSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(adminCreatePostAction({
            user: adminInfo._id,
            title: title,
            body: body,
            imagelink: imglink,
            thumbnailName: thumbnailname,
            tags: tags
        }))
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
                    <Form.Label>Upload Thumbnail</Form.Label>
                    <Form.Control type="file" accept='.jpeg, .jpg, .png' onChange={checkFileType} />
                    {uploading ? <p>Uploading..</p> : uploadingSuccess ? <p>Image Uploaded</p> : <Button variant='outline-primary' onClick={uploadImage} style={{ borderColor: 'none', border: 'none', textDecoration: 'underline', marginTop: '10px' }}>Upload</Button>}
                </Form.Group>

                <Button type='submit' variant='primary' disabled={(title === '' || body === '' || imglink === '')} style={{ marginTop: '2rem' }}>
                    Submit
                </Button>
                {errorCreate && <p>{errorCreate}</p>}
                {loadingCreate && <p>Loading...</p>}
            </Form>
        </Row>

    </Col>

   

</div>

  </section>
</div>

</>

    )
}

export default AdminAddPost
