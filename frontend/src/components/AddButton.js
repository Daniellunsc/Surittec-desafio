import React from 'react';
import { connect } from 'react-redux';
import { addContent } from '../actions';

const AddButton = ({ type, addCallBack, addNewContent }) => (
  <button type="button" className="btn btn-success" onClick={() => addNewContent(type)}>
    Adicionar
  </button>
);


const mapDispatchToProps = (dispatch) => ({
  addNewContent: (type) => dispatch(addContent(type)),
});

export default connect(null, mapDispatchToProps)(AddButton);
