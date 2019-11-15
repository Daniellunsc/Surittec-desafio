import React from "react";
import {connect} from 'react-redux';
import { addContent } from "../actions";

class AddButton extends React.Component {
  render(){
    const {type, addCallBack, addNewContent} = this.props;
    return(
      <button className="btn btn-success" onClick={() => addNewContent(type)}>
      Adicionar
    </button>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewContent: (type) => dispatch(addContent(type))
  }
}

export default connect(null, mapDispatchToProps)(AddButton);
