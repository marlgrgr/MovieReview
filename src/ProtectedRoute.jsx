import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('jwt');  

  const redirectWithMessage = (message, redirectTo = '/', shouldClearJwt = false ) => (
    <Navigate to="/modal-redirect" state={{ message, redirectTo, shouldClearJwt}} replace />
  );

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp * 1000 < Date.now()) {
      return redirectWithMessage('Your session has expired. Please log in again.','/',true);
    }

    if (decoded.passwordChangeRequired && location.pathname !== '/change-password') {
      return redirectWithMessage('A password change is required.', '/change-password', false);
    }

    if ((!decoded.userRoles || decoded.userRoles.length === 0) && location.pathname !== '/change-password') {
      return redirectWithMessage('You do not have permission to access.','/',true);
    }

    if(location.pathname.startsWith('/admin/') && !decoded.userRoles.map(role => role.toLowerCase()).includes('role_admin')){
      return redirectWithMessage('Administrative permissions are required to access the administrator functionality.', '/home');
    }

    const user = {
      username: decoded.userFullname,
      role: decoded.userRoles
    };

    return React.cloneElement(children, { user });
  } catch (error){
    return redirectWithMessage('Invalid token. Please log in again.','/',true);
  }
};

export default ProtectedRoute;
