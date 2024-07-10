import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdDelete, MdSave } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const UsersDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
        setLoading(false);
      });
  };

  const handleDelete = (_id) => {
    axios
      .delete(`http://localhost:8000/users/${_id}`)
      .then(() => {
        fetchUsers(); // Fetch the updated list of users after deletion
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setError("Error deleting user");
      });
  };

  const handleEdit = (user) => {
    console.log(user);
    setEditUserId(user._id);
    setEditEmail(user.email);
    setEditPassword(user.password);
  };

  const handleSave = (id) => {
    console.log(id);
    axios
      .put(`http://localhost:8000/users/${id}`, {
        email: editEmail,
        password: editPassword,
      })
      .then(() => {
        setEditUserId(null);
        fetchUsers(); // Fetch the updated list of users after saving
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setError("Error updating user");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="user-container">
        <h1>User Details</h1>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                {editUserId === user._id ? (
                  <>
                    <b>Email: </b>
                    <input
                      type="text"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                    &nbsp; &nbsp;
                    <b>Password: </b>
                    <input
                      type="text"
                      value={editPassword}
                      onChange={(e) => setEditPassword(e.target.value)}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleSave(user._id)}>
                      <MdSave />
                    </button>
                  </>
                ) : (
                  <>
                    <b>Email: </b>
                    {user.email}
                    &nbsp; &nbsp; <b>Password: </b>
                    {user.password}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleEdit(user)}>
                      <FiEdit />
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(user._id)}>
                  <MdDelete />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UsersDetails;
