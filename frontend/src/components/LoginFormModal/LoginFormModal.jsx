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
      <p
        onClick={() => {
          logUserIn({ credential: "Demo-lition", password: "password" });
        }}
        className="demo-user"
      >
        Demo User
      </p>
    </>
  );
};

export default LoginFormModal;
