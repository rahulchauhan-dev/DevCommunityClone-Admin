import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import { reportDetailAction } from '../actions/adminActions'
import { Container } from 'react-bootstrap'

const ReportScreen = () => {

  const dispatch = useDispatch()
  const { id } = useParams()



  const reportDetail = useSelector(state => state.reportDetail)
  const { loading, error, report } = reportDetail
  

  useEffect(() => {
      dispatch(reportDetailAction(id))
  }, [dispatch, id])

  


  return (
    <>
    <div className="content-wrapper">
 
  <section className="content">
    <div className="container-fluid">
      <Container className='p-4 mt-3'>
      {loading && <Loader />}
      {error && <p>{error}</p>}

       <h5>Reported Post Id : {report.postId}</h5>
       <h5>Posted By : {report.postedUserId}</h5>

       <h6>Report Category : {report.reportCategory}</h6>

       <p>Message : {report.reportMesaage}</p>
       <p>Date: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(report.date)}</p>
       </Container>
    </div>
    
    </section>
    </div>
  </>    
    
  )
};

export default ReportScreen;
