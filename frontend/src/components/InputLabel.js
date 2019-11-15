import React from 'react';

class InputLabel extends React.Component {
  state = {};

  render() {
    const { text, required } = this.props;
    return (
      <div className="mb-1">
        <small><b>{text}</b></small>
        {required
          && <small style={{ color: 'red' }}>*</small>
        }
      </div>
    );
  }
}


export default InputLabel;