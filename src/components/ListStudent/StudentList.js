import React,{ useState, useEffect } from 'react'
import StudentCard from './StudentCard';
const StudentList =(props) => {
    
   const renderStudentList = props.students.map((student, index) => {
        return <StudentCard student = {student}
        key = {index} {...student}/>
    });
    
    return (
        <>
            {renderStudentList.length > 0 ? renderStudentList : "No suitable Students"}
        </>
  )
}

export default StudentList;
