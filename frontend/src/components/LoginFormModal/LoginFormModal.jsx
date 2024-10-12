import { useState, useEffect } from "react";
import { loginUserThunk } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

const LoginFormModal = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [userErrors, setUserErrors] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    // any client side errors?  disable submit. No client side errors or client side errors fixed?  enable submit.
    setSubmitDisabled(userErrors.credential || userErrors.password);
  }, [userErrors]); // anytime this value changes, the useEffect hook should run

  const handleClientSideErrors = () => {
    const errors = {};
    // check credential and password local state and see if they pass client side validation.  If not, set and return errors
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // check for client side validation errors here to avoid Bad Request error from server
    const errors = handleClientSideErrors();
    setUserErrors(errors); // will schedule a re-render and set userErrors to either be an empty object, or an object with error properties.  Calling the setUserErrors() here will update the state of userErrors and disable submit button if necessary
    if (Object.values(errors).length > 0) return; // to avoid accidentally submitting with errors, use the most up to date value for errors, which would be the return of our synchronous function handleErrors();  NOT stateful userErrors, which will not update until next render.
    // if we get here, we are submitting the form to log a user in
    const userLoginInfo = {
      credential,
      password,
    };
    const response = await dispatch(loginUserThunk(userLoginInfo));
    // check for server side validation errors, i.e. invalid credentials, and keep modal open
    if (response.message) {
      setUserErrors(response);
    } else {
      // if we successfully logged in, close the modal
      closeModal();
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="credential">Username or email</label>
        <input
          id="credential"
          onChange={(e) => {
            setCredential(e.target.value);
          }}
          value={credential}
          type="text"
        />
        {(userErrors.credential || userErrors.message) && (
          <span>
            {userErrors.message ? userErrors.message : userErrors.credential}
          </span>
        )}
        <label htmlFor="password">Password</label>
        <input
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
        />
        {(userErrors.password || userErrors.message) && (
          <span>
            {userErrors.message ? userErrors.message : userErrors.password}
          </span>
        )}

        <button disabled={submitDisabled} type="submit">
          Login
        </button>
      </form>
    </>
  );
};

export default LoginFormModal;
