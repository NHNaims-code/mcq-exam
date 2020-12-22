import React from 'react';


const EditExam = ({data}) => {


   
    return (
        <div className="w-100 bg-warning">
            <h1>Welcome: {data}</h1>
            <input type="text" className="form-control"/>
      </div>
    );
};

export default EditExam;