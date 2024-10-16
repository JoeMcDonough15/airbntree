import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupFormModal.css";

const SignupFormModal = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userErrors, setUserErrors] = useState({});
  const [submitDisabled, setSubmitDisabled] = useState();
  const { closeModal } = useModal();

  useEffect(() => {
    let disabled;
    if (
      email.length === 0 ||
      username.length < 4 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      password.length < 6 ||
      confirmPassword !== password
    ) {
      disabled = true;
    } else {
      disabled = false;
    }
    setSubmitDisabled(disabled);
  }, [email, username, firstName, lastName, password, confirmPassword]); // anytime these values changes, the useEffect hook should run

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      sessionActions.signupUserThunk({
        email,
        username,
        firstName,
        lastName,
        password,
      })
    );
    if (response.errors) {
      setUserErrors(response.errors); // errors are coming from the backend
      return;
    }
    closeModal(); // only close modal if there are no errors because of return on line 50
  };

  return (
    <div className="modal-container">
      <h1>Sign Up</h1>
      {Object.values(userErrors).map((userError, index) => {
        return (
          <span key={index} className="error-text">
            {userError}
          </span>
        );
      })}
      <form
        className="form-container flex-container col"
        onSubmit={handleSubmit}
      >
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </label>
        <label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </label>
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
          />
        </label>
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
          />
        </label>
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </label>
        <label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </label>
        <button
          className={`full-width-button ${
            !submitDisabled ? " active-button" : ""
          }`}
          disabled={submitDisabled}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupFormModal;
