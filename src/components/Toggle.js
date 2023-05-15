import { useState } from "react";
import Proptypes from 'prop-types'
const Toggle = (props) => {
  const [show, setShow] = useState(false);
  const displayStatus = { display: show ? "" : "none" };
  const buttonStatus = {display: show ? "none":""}   
  const toggleVisbility = () => {
    setShow(!show);
  };
  return (
    <>
        <div style={buttonStatus}>
        <button onClick={toggleVisbility}>{props.buttonLabel}</button>
        </div>
    
      <div style={displayStatus}>{props.children} <button onClick={toggleVisbility} data-btn-name="cancel-btn">cancel</button></div>
    </>
  );
};

Toggle.propTypes = {
  buttonLabel:Proptypes.string.isRequired
}

export default Toggle;
