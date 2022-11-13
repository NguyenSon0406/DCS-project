import React,{ useState, useEffect } from 'react'
import JobCard from './StudentCard';
import JobData from "./dummyData2"
const JobList =(props) => {
    // const[jobs, setJob] = useState([]);
    
   const renderJobList = props.jobs.map((job) => {
        return <JobCard
        key = {job.id} {...job}/>
    });
    
    return (
        <>
            {renderJobList.length > 0 ? renderJobList : "No Contacts available"}
        </>
  )
}

export default JobList;
