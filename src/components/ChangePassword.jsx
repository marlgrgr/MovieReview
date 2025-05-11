import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import Navbar from './NavBar';
import { post } from '../services/api';
import './ChangePassword.css';

const ChangePassword = ({user}) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { showModal } = useModal();
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      const response = await post('/auth/changePassword',
        {
          oldPassword: currentPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword
        });

      if (response.status === 204) {
        showModal("Password changed successfully",{});
        localStorage.removeItem('jwt');
        navigate('/');
      }
    } catch (error) {
        if(error && error.response && error.response.data.code === "AUTH-0010"){
            setMessage('Password must be at least 8 characters long, contain at least one letter, one number, and one special character.');
        }else if(error && error.response && error.response.data && error.response.data.message){
            setMessage('Failed to change password. ' + error.response.data.message);
        }else{
            setMessage('Failed to change password. Please check your current password.');
        }
    }
  };

  return (
    <div>
      <Navbar user={user}/>
      <div className="container">
        <h1>Change Password</h1>
        <form onSubmit={handleChangePassword}>
          <div>
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
};

export default ChangePassword;
