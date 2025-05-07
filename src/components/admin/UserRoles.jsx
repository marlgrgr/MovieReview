import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserRoles.css';
import Navbar from '../NavBar';
import { get, post, del } from '../../services/api';
import { useModal } from '../../context/ModalContext';

const UserRoles = ({user}) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userRoles, setUserRoles] = useState([]);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const { showModal } = useModal();

  useEffect(() => {
    fetchUserData();
    fetchRoles();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const userResponse = await get(`/users/${userId}`);
      setUsername(userResponse.data.username);
      
      const rolesResponse = await get(`/userRoles/user/${userId}/all`);
      setUserRoles(rolesResponse.data);
      setError(null);
    } catch (err) {
      setError('Error fetching user data: ' + err.message);
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await get(`/roles`);
      setAvailableRoles(response.data);
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError('Error fetching roles: ' + err.message);
    }
  };

  const addRole = async (roleId) => {
    try {
      await post(`/userRoles`, {
          user: { id: userId },
          role: { id: roleId }
        });
      
      fetchUserData();
      showModal('Role added successfully',{});
    } catch (err) {
      showModal('Error adding role: ' + err.message,{});
      console.error('Error adding role:', err);
    }
  };

  const removeRole = async (userRoleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await del(`/userRoles/${userRoleId}`);
        
        fetchUserData();
        showModal('Role deleted succesfully',{});
      } catch (err) {
        showModal('Error removing role: ' + err.message,{});
        console.error('Error removing role:', err);
      }
    }
  };

  const getRolesAvailableToAdd = () => {
    const userRoleIds = userRoles.map(userRole => userRole.role.id);
    return availableRoles.filter(role => !userRoleIds.includes(role.id));
  };

  if (loading) return <div className="loading">Loading role information...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Navbar user={user}/>
      <div className="user-roles-container">
        <h1>Roles management</h1>
        <h2>User: {username}</h2>
        
        <div className="roles-sections">
          <div className="current-roles-section">
            <h3>Current Roles</h3>
            {userRoles.length === 0 ? (
              <p>The user has no roles assigned</p>
            ) : (
              <ul className="roles-list">
                {userRoles.map((userRole) => (
                  <li key={userRole.id} className="role-item">
                    <span>{userRole.role.role}</span>
                    <button 
                      className="remove-role-btn"
                      onClick={() => removeRole(userRole.id)}
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="available-roles-section">
            <h3>Available roles</h3>
            {getRolesAvailableToAdd().length === 0 ? (
              <p>No additional roles available</p>
            ) : (
              <ul className="roles-list">
                {getRolesAvailableToAdd().map((role) => (
                  <li key={role.id} className="role-item">
                    <span>{role.role}</span>
                    <button 
                      className="add-role-btn"
                      onClick={() => addRole(role.id)}
                    >
                      Add
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <div className="actions">
          <button 
            className="back-btn"
            onClick={() => navigate('/admin/users')}
          >
            Back to the user list
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserRoles;