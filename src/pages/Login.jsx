import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";
function Login() {
  const password = useRef();
  const emailRef = useRef();
  const [erro, setErro] = useState();
  const { setToken, setUser } = useStateContext();
  function onSubmit(e) {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: password.current.value,
    };
    axiosClient
      .post("login", payload)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((error) => {
        const res = error.response;
        //erro de validacao
        if (res && res.status === 422) {
          if(res.data.errors){
            setErro(res.data.errors);
          }
          else{
            setErro({
              email:[res.data.message]
            })
          }
        }
      });
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Fazer Login</h1>
          {erro && (
            <div className="alert">
              {Object.keys(erro).map((e) => (
                <p key={e}>{erro[e][0]}</p>
              ))}
            </div>
          )}
          <input type="email" ref={emailRef} placeholder="insere o seu email" />
          <input
            type="password"
            ref={password}
            placeholder="insere o sua senha"
          />
          <button className="btn btn-block">Login</button>
          <p className="message">
            não tem uma conta?
            <Link to="/signup">criar conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
