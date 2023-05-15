// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const disabled = credential.length < 4 || password.length < 6;

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} id="login-form">
        {errors.credential && (
          <div className="errors">The provided credentials were invalid.</div>
        )}
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={disabled}>
          Log In
        </button>
        <h2
          id="demo-user-button"
          onClick={() => {
            dispatch(
              sessionActions.login({
                credential: "Demo-lition",
                password: "password",
              })
            )
              .then(closeModal)
              .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                  setErrors(data.errors);
                }
              });
          }}
        >
          Demo User
        </h2>
      </form>
    </>
  );
}

export default LoginFormModal;
