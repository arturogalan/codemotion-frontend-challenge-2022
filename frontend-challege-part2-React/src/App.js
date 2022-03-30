import React, { useState } from 'react';
import './App.css';
import ResidentsList from './Components/ResidentsList';
import Search from './Components/Search';
import Error from './Components/Error';
import 'h8k-components';

const title = "Hacker Dormitory";
function App() {


  const [hasError, setHasError] = useState(false);
  const [errorDescription, setErrorDescription] = useState('');
  const [residentsList, setResidentsList] = useState([])

  function handleError(e) {
    setHasError(true);
    setErrorDescription(e);
  }
  function handleAddResident(foundStudent) {
    setResidentsList(residentsList.concat(foundStudent.name))
  }
  return (
    <div className="App">
        <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center align-items-center w-50 mx-auto">
        <Search onChangeError={handleError} onAddStudent={handleAddResident}/>
        {hasError && (<Error errorDescription={errorDescription}/>)}
        <ResidentsList residentsList={residentsList}/>
      </div>
    </div>
  );
}

export default App;
