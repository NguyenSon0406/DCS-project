import React,{ useState, useEffect } from 'react'
import JobCard from './JobCard';
const JobList =(props) => {
    // const[jobs, setJob] = useState([]);
    
   const renderJobList = props.jobs.sort((a,b) => {
   return new Date(b.postedOn) - new Date (a.postedOn)
   })
   .map((job) => {
        return <JobCard job = {job}
        key = {job.id} {...job}/>
    });
    
    return (
        <>
            {renderJobList.length > 0 ? renderJobList : "No Jobs available"}
        </>
  )
}

export default JobList;
