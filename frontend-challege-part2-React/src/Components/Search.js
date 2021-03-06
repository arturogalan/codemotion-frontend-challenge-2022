import React, { useState }  from 'react';

// `joiningDate` && `validityDate` format "yyyy-mm-dd"
import {STUDENTS} from '../studentsList.js'


function checkValidity(joiningDate, validityDate) {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const [year, month, day] = joiningDate.split('-');
	const [yyyy, mm, dd] = validityDate.split('-');
	const maxValid = new Date(yyyy, mm - 1, dd);
	const selected = new Date(year, month - 1, day);
	return (maxValid >= selected) && (maxValid >= today);
}
function Search(props) {
  const [joiningDate, setJoiningDate] = useState('');
  const [studentName, setStudentName] = useState('');
  
  function checkStudentName() {
    if (!joiningDate || !studentName) return;

    const foundStudent = STUDENTS.find((student)=> {
      return student.name.toLocaleLowerCase() === studentName.toLocaleLowerCase()
    })
    const clearData = ()=> {
      setJoiningDate('')
      setStudentName('')
    }

    if (!foundStudent) {
      props.onChangeError(`Sorry, ${studentName} is not a verified student!`)
      clearData();
      return;
    }
    if (!checkValidity(joiningDate, foundStudent.validityDate)) {
      props.onChangeError(`Sorry, ${studentName}'s validity has Expired!`)
      clearData();
      return;
    }

    props.onAddStudent(foundStudent)
    clearData();

  }

	return (
		<div className="my-50 layout-row align-items-end justify-content-end">
			<label htmlFor="studentName">Student Name:
				<div>
					<input id="studentName" data-testid="studentName" type="text" value={studentName} onChange={e => setStudentName(e.target.value)} className="mr-30 mt-10"/>
				</div>
			</label>
			<label htmlFor="joiningDate">Joining Date:
				<div>
					<input id="joiningDate" data-testid="joiningDate" type="date" value={joiningDate} onChange={e => setJoiningDate(e.target.value)} className="mr-30 mt-10"/>
				</div>
			</label>
			<button type="button" data-testid="addBtn" className="small mb-0" onClick={checkStudentName}>Add</button>
		</div>
	);
}

export default Search;
