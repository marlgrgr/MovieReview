import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserList.css';
import Navbar from '../NavBar';
import { get, post, del } from '../../services/api';
import { useModal } from '../../context/ModalContext';

const UserList = ({user}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { showModal } = useModal();
  
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setNewUser({
      username: '',
      password: '',
      fullname: ''
    });
  };
  const [newUser, setNewUser] = useState({
    username: '',
      password: '',
      fullname: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await get(`/users?page=${page}&pageSize=10`);
      setUsers(response.data.results);
      setCurrentPage(response.data.page);
      setTotalPages(response.data.totalPages);
      setError(null);
    } catch (err) {
      setError('Error fetching users: ' + err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await del(`/users/${userId}`);
        fetchUsers();
        showModal('User successfully deleted',{});
      } catch (err) {
        showModal('Error deleting user: ' + err.message,{});
        console.error('Error deleting user:', err);
      }
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    try {
      await post(`/users`, {
        username: newUser.username,
        password: newUser.password,
        fullname: newUser.fullname
      });
      setShowCreateModal(false);
      setNewUser({ username: '',
        password: '',
        fullname: '' });
      fetchUsers();
      showModal('User successfully created',{});
    } catch (err) {
      showModal('Error creating user: ' + err.message,{});
      console.error('Error creating user:', err);
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
          <Navbar user={user}/>
      <div className="user-list-container">
        <h1>User Management</h1>
        
        <div className="actions">
          <button 
            className="create-user-btn"
            onClick={() => {
              setNewUser({
                username: '',
                password: '',
                fullname: ''
              });
              setShowCreateModal(true);
            }}
          >
            Create new user
          </button>
        </div>

        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fullname</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.fullname}</td>
                <td>{user.username}</td>
                <td className="actions-cell">
                  <Link to={`/admin/users/${user.id}/roles`} className="edit-roles-btn">
                    Edit roles
                  </Link>
                  <button 
                    className="delete-user-btn"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="pagination">
            <button onClick={() => fetchUsers(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span> Page {currentPage} </span>
            <button onClick={() => fetchUsers(currentPage + 1)} disabled={currentPage >= totalPages}>
              Next
            </button>
          </div>

        {/* Modal para crear usuario */}
        {showCreateModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Create New User</h2>
              <form onSubmit={createUser}>
                <div className="form-group">
                  <label>Fullname:</label>
                  <input 
                    type="text" 
                    value={newUser.fullname} 
                    onChange={(e) => setNewUser({...newUser, fullname: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Username:</label>
                  <input 
                    type="text" 
                    value={newUser.username} 
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input 
                    type="password" 
                    value={newUser.password} 
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    required
                  />
                </div>
                <div className="modal-actions">
                  <button type="submit" className="submit-btn">Crear</button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;