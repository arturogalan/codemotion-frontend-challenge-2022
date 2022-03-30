import React from 'react';

function ResidentsList(props) {
	return (
		<div className="pa-10 mt-10 w-75">
			<div className="font-weight-bold text-center">Residents List</div>
			<ul className="mt-10 styled w-50 mx-auto" data-testid="residentsNameList">
				{ props.residentsList.map((residentName)=> {
          return (<li key={residentName} className="slide-up-fade-in">
            {residentName}
				  </li>)
        })
        }
			</ul>
		</div>
	);
}

export default ResidentsList;
