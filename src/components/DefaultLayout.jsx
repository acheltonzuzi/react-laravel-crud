import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";

function DefaultLayout() {
  const { user, token,setUser,setToken,notification } = useStateContext();
  if (!token) {
    return <Navigate to="/login"></Navigate>;
  }
  function onLogout(e){
    e.preventDefault()
    const sair=confirm("tens a certeza que queres sair?")
    if (sair) {
      axiosClient.post('logout').then(
        ()=>{
          setUser({})
          setToken(null)
        }
      )
    }
  }

  useEffect(()=>{
    axiosClient.get('user').then(
      ({data})=>{
        setUser(data)
      }
    )
  },[])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/dashboard">Dashborad</Link>
        <Link to="/users">Users</Link>
      </aside>
      <div className="content">
        <header>
          <div>Header</div>
          <div>
            {user.name}
            <a href="#"onClick={onLogout} className="btn-logout">Logout</a></div>
        </header>
        <main>
          <Outlet></Outlet>
        </main>
      </div>
      {notification &&(<div className="notification">{notification}</div>)}
    </div>
  );
}

export default DefaultLayout;
