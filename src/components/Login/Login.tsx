import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "./Login.css";
import validateLoginInfo from "./validateLoginInfo";
import axiosInstance from '../../utils/axiosConfig';

interface LoginValues {
  usernameOrEmail: string;
  pass: string;
}

function Login() {
  const [loginValues, setLoginValues] = useState<LoginValues>({
    usernameOrEmail: "",
    pass: "",
  });
  axiosInstance.defaults.withCredentials = false;

  const [errors, setErrors] = useState<{ fields?: string; pass?: string }>({});
  const [loginStatus, setLoginStatus] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setErrors(validateLoginInfo(loginValues));

    axiosInstance
      .post(`https://localhost:7290/api/User/Login`,{
        usernameOrEmail: loginValues.usernameOrEmail,
        password: loginValues.pass,
      },)
      .then((response) => {
        e.preventDefault();
        if (response.status != 401) {
          const user = response.data;
          localStorage.setItem("currentUser", response.data.jwtToken);
          console.log(response)
          window.location.href = "/statistics";

        }
      }).catch(error =>{

        alert(error.response.data.message);

      })
  };

  useEffect(() => {
    axiosInstance.post(`https://localhost:7290/api/User/Login`).then((response) => {
      console.log('hey')
      console.log(response);
      if (response.data.loggedIn == true) {
        setLoginStatus(response.data.user[0].usernameOrEmail);
      }
    });
  }, []);

  return (
    <form onSubmit={handleSubmit} className="main">
      <div className="sub-main">
        <div>
          <div>
            <h1 className="login-title">Login Page</h1>
            <div className="input-area">
              <input
                type="text"
                placeholder="Enter your username"
                value={loginValues.usernameOrEmail}
                onChange={handleChange}
                name="usernameOrEmail"
                className="name"
              />
            </div>

            <div className="input-area">
              <input
                type="password"
                placeholder="Enter your password"
                value={loginValues.pass}
                onChange={handleChange}
                name="pass"
                className="name"
              />
            </div>

            <div className="button-area">
              <a href="/statistics">
                <button type="submit" className="loginpage-button">
                  Log In
                </button>{" "}
              </a>
            </div>

            <div className="loginerror-msg">
              <p>{errors.fields}</p>
              <p>{errors.pass}</p>
            </div>

          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
