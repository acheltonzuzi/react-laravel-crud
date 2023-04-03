import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";

function UserForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [erro, setErros] = useState(null);
  const navigate = useNavigate();
  const { setNotification } = useStateContext();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`users/${id}`)
        .then(({ data }) => {
          setUser(data.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }, []);
  }

  function onSubmit(ev) {
    ev.preventDefault();
    if (id) {
      axiosClient
        .put("users/" + user.id, user)
        .then(() => {
          navigate("/users");
          setNotification("usuario atualizado com sucesso");
        })
        .catch((error) => {
          const res = error.response;
          //erro de validacao
          if (res && res.status === 422) {
            console.log("erro", res.data.errors);
            setErros(res.data.errors);
          }
        });
    } else {
      axiosClient
        .post("users", user)
        .then(() => {
          navigate("/users");
          setNotification("usuario cadastrado com sucesso");
        })
        .catch((error) => {
          const res = error.response;
          //erro de validacao
          if (res && res.status === 422) {
            console.log("erro", res.data.errors);
            setErros(res.data.errors);
          }
        });
    }
  }
  return (
    <>
      {id && <h1>Update User</h1>}
      {!id && <h1>Add User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Carregando...</div>}

        {erro && (
          <div className="alert">
            {Object.keys(erro).map((e) => (
              <p key={e}>{erro[e][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
              type="text"
              placeholder="escreva seu nome"
            />
            <input
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              value={user.email}
              type="email"
              placeholder="escreva seu email"
            />
            <input
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              placeholder="escreva sua senha"
            />
            <input
              onChange={(e) =>
                setUser({ ...user, password_confirmation: e.target.value })
              }
              type="password"
              placeholder="confirme sua senha"
            />
            <button className="btn">Salvar</button>
          </form>
        )}
      </div>
    </>
  );
}

export default UserForm;
