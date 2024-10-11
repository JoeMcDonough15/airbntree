import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as sessionActions from "../../store/session";

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userErrors, setUserErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // ! their code.  I'd prefer to have a handleErrors() that runs and returns out of here before submitting if there are any client side errors
    if (password === confirmPassword) {
      setUserErrors({});
      const response = await dispatch(
        sessionActions.signupUserThunk({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      );
      if (response?.errors) {
        setUserErrors(response.errors);
      }
    } else {
      return setUserErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {userErrors.email && <p>{userErrors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {userErrors.username && <p>{userErrors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {userErrors.firstName && <p>{userErrors.firstName}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {userErrors.lastName && <p>{userErrors.lastName}</p>}
        <label>
          Password
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {userErrors.password && <p>{userErrors.password}</p>}
        <label>
          Confirm Password
          <input
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {userErrors.confirmPassword && <p>{userErrors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignupFormPage;
