import React,{useEffect} from 'react'
import {Row,Table,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { listReports, resolveReportAction } from '../actions/adminActions'
import Loader from '../components/Loader'



const Reports = () => {

    const dispatch = useDispatch()

    const reportList = useSelector(state => state.reportList)
    const { loading, error, reports } = reportList

    const reportResolve = useSelector(state => state.reportResolve)
    const { loading:resolving, error:errorResolving, success:successResolved } = reportResolve
    

    useEffect(() => {
        

        if(!reports || successResolved){
          dispatch({ type: 'REPORT_RESOLVED_RESET' })

          dispatch(listReports())
        }

    }, [dispatch,successResolved,reports])

    const markAsSolved = (id) => {
      
      dispatch(resolveReportAction(id))
    }

    return (
        <>
        {/* Content Wrapper. Contains page content */}
<div className="content-wrapper">
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0">Reports</h1>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
   
    <> 
<Row><Table striped bordered hover responsive className='table-sm' style={{ marginTop: '1rem' }}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>DATE</th>
                                            <th>CATEGORY</th>
                                            <th>POST ID</th>
                                            <th>POST USER ID</th>
                                            <th>STATUS</th>
                                            <th></th>    
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {resolving && <p>Resolving</p>}
                                      {errorResolving && <p>{errorResolving}</p>}
                                        {loading && <Loader />}
                                        {error && <p>{error}</p>}
                                        {reports && reports.map((report) => (
                                            <tr key={report._id}>
                                                <td>{report._id}</td>
                                                <td>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(report.date)}</td>
                                                <td>
                                                {report.reportCategory}
                                                </td>
                                                <td>
                                                 
                                                {report.postId}
                                                </td>
                                                <td>
                                                   {report.postedUserId}                                                 
                                                </td>
                                                <td style={{verticalAlign:'middle',textAlign:'center'}}>
                                                   {report.isResolved ? <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 40 40" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
</svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 40 40" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>}                                                 
                                                </td>
                                                <td>{!report.isResolved && <Button className='btn btn-block' onClick={() => markAsSolved(report._id)}>
                                                        Mark as Solved
                                                    </Button>
                                                  }
                                                    
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

export default Reports
