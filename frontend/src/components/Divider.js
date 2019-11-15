import React from 'react';
import AddButton from './AddButton';

const Divider = ({text, type}) => (
    <>
    <div className="dropdown-divider" />
    
    <div className="d-flex justify-content-between my-2">
        <label className="text-muted text-center">{text}</label>
        {type && <AddButton type={type}/>}
    </div>
    </>
)

export default Divider;