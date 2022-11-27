import React from 'react'
import JobCard from './JobCard';
const MyJobList =(props) => {

    const renderJobList = props.jobs.sort((a,b) => {
        return new Date(b.createdAt) - new Date (a.createdAt)
        })
        .map((job) => {
             return <JobCard job = {job}
             key = {job.id} {...job}/>
         });
    return (
        <div>
             {renderJobList ? renderJobList : "You don't post any yet!"}
        </div>
  )
}

export default MyJobList;
