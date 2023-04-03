import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";

function Singup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmedRef = useRef();
  const { setToken, setUser } = useStateContext();
  const [erro,setErros]=useState(null)
  function onSubmit(e) {
    e.preventDefault();
    const payLoad = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmedRef.current.value,
      
    };
    
    axiosClient
      .post("signup", payLoad)
      .then(({ data }) => {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((error) => {
        const res = error.response;
        //erro de validacao
        if (res && res.status === 422) {
          console.log("erro",res.data.errors);
          setErros(res.data.errors)
        }
      });
  }
  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Cadastrar Usuario</h1>
          {erro && <div className="alert">
             {Object.keys(erro).map((e)=>(
              <p key={e}>{erro[e][0]}</p>
             ))}
          </div>}
          <input ref={nameRef} type="text" placeholder="insere o seu nome" />
          <input ref={emailRef} type="email" placeholder="insere o seu email" />
          <input
            ref={passwordRef}
            type="password"
            placeholder="insere o sua senha"
          />
          <input
            ref={passwordConfirmedRef}
            type="password"
            placeholder="confirme sua senha"
          />
          <button className="btn btn-block">Criar Conta</button>
          <p className="message">
            já tem uma conta?
            <Link to="/login">fazer login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Singup;
