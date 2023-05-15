import { useState } from "react";
import Proptypes from "prop-types";
import Message from "./Message";
const LogForm = ({ logFunc }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMsg] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await logFunc({ username, password });
      console.log(result);
      if (result === true) {
        setUsername("");
        setPassword("");
        setMsg("Successfully logged in");
        setTimeout(() => {
          setMsg(null);
        }, 5000);
      }
      else{
        setMsg("Wrong Creds");
        setTimeout(() => {
          setMsg(null);
        }, 5000);
      }
    } catch (err) {
     console.log(err)
    }
  };

  return (
    <div>
      {message ? <Message msg={message}></Message> : null}
      <form onSubmit={handleSubmit} id="login-form">
        <div>
          <p>Username: </p>
          <input
            id="username-input"
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          ></input>
          <p>Password: </p>
          <input
            id="pass-input"
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          ></input>
          <button type="submit" id="login-btn">
            login
          </button>
        </div>
      </form>
    </div>
  );
};

LogForm.propTypes = {
  logFunc: Proptypes.func.isRequired,
};

export default LogForm;
