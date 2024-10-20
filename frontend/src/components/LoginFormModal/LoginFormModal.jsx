import { useState, useEffect } from "react";
import { loginUserThunk } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import FormField from "../FormField";
import ErrorText from "../ErrorText";
import "./LoginFormModal.css";

const LoginFormModal = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [userErrors, setUserErrors] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    setSubmitDisabled(credential.length < 4 || password.length < 6);
  }, [credential, password]); // anytime these values changes, the useEffect hook should run

  const logUserIn = async (userDetails) => {
    const response = await dispatch(loginUserThunk(userDetails));
    if (response.message) {
      setUserErrors(response);
    } else {
      // if we successfully logged in, close the modal
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLoginInfo = {
      credential,
      password,
    };
    logUserIn(userLoginInfo);
  };

  return (
    <div className="login-modal modal-container">
      <h2 className="login-header">Log In</h2>
      {userErrors.message && (
        <div className="server-errors-container">
          <ErrorText text="The provided credentials were invalid" />
        </div>
      )}
      <form
        className="form-container flex-container col"
        onSubmit={handleSubmit}
      >
        <FormField
          inputId="credential"
          setInputVal={setCredential}
          inputVal={credential}
          inputType="text"
          labelText="Username or email"
        />

        <FormField
          inputId="password"
          setInputVal={setPassword}
          inputVal={password}
          inputType="password"
          labelText="Password"
        />

        <button
          className={`full-width-button ${
            !submitDisabled ? " active-button" : ""
          }`}
          disabled={submitDisabled}
          type="submit"
        >
          Login
        </button>
      </form>
      <p
        onClick={() => {
          logUserIn({ credential: "Demo-lition", password: "password" });
        }}
        className="demo-user"
      >
        Demo User
      </p>
    </div>
  );
};

export default LoginFormModal;
