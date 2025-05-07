import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Login from './components/App';
import Home from './components/Home';
import MovieDetail from './components/MovieDetail';
import ProtectedRoute from './ProtectedRoute';
import ChangePassword from './components/ChangePassword';
import ModalRedirect from './components/ModalRedirect';
import UserList from './components/admin/UserList';
import UserRoles from './components/admin/UserRoles';

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/modal-redirect" element={<ModalRedirect/>} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <MovieDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin/users/:userId/roles"
          element={
            <ProtectedRoute>
              <UserRoles />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Navigate to="/home" replace />
            </ProtectedRoute>
          }
        />

        <Route
          path="/session-expired"
          element={
            <ModalRedirect
              message="Your session has expired. Please log in again."
              redirectTo="/"
              shouldClearJwt={true}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
