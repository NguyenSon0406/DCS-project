import React from 'react'
import JobCard from './JobCard';
const JobList =(props) => {

   const renderJobList = props.jobs.sort((a,b) => {
   return new Date(b.createdAt) - new Date (a.createdAt)
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
