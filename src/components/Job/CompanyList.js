import { Pagination } from '@mui/material';
import React from 'react'
import CompanyCard from './CompanyCard';
import JobData from './dummyData';

const CompanyList = () => {
  return (
   <div >
     {JobData.map((job) => (
        <CompanyCard key={job.id} {...job}/>
      ))}
      <Pagination 
                  style={{marginTop:"40px"}} 
                  count={2}                  
                  variant="outlined" 
                  shape="rounded" 
       />    
   </div>
  )
}

export default CompanyList;
