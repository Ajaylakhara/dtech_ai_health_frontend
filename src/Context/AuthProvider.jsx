import { useState, useEffect } from 'react';
import { AuthContext } from '../hooks/useAuth';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedRole = localStorage.getItem('userRole');
    if (storedUser && storedRole) {
      setIsLoggedIn(true);
      setUserRole(storedRole);
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://localhost:7017/api/Users/login', {
        email,
        password,
      });

      const { userId, name, email: userEmail, role } = response.data;

      setIsLoggedIn(true);
      setUserRole(role);
      setUser({
        id: userId,
        email: userEmail,
        name: name,
      });

      localStorage.setItem('user', JSON.stringify({
        id: userId,
        email: userEmail,
        name: name,
      }));
      localStorage.setItem('userRole', role);
      if (role === 'admin') {
        localStorage.setItem('isAdmin', 'true');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data || 'Login failed. Please check your credentials.');
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAdmin');
  };

  const contextValue = {
    isLoggedIn: isLoggedIn ?? false,
    userRole: userRole ?? null,
    user: user ?? null,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
