import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  function getUsers() {
    setLoading(true);
    axiosClient
      .get("users")
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
        console.log(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  function onDelete(user) {
    if (confirm("tens a certeza que desejas apagar?")) {
      axiosClient.delete(`users/${user.id}`).then(() => {
        getUsers();
      });
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Users</h1>
        <Link to="/users/new" className="btn-add">
          Add New
        </Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>CREATE DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
         {!loading && <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                  <Link to={'/users/'+user.id} className="btn-edit">
                    Edit
                  </Link>
                  &nbsp;
                  <button
                    onClick={(ev) => onDelete(user)}
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>}
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Carregando...
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default Users;
