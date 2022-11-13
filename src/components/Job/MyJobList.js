import React from 'react'
import JobCard from './JobCard';
import JobData from "./dummyData"
const MyJobList =() => {
    // const[jobs, setJob] = useState([]);
    
    return (
        <div>
            {JobData.map((job) => (<JobCard key={job.id} job = {job} {...job} />))}
        </div>
  )
}

export default MyJobList;
