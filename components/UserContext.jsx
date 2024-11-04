import React, { createContext, useState, useEffect } from 'react';
import RNSecureStorage from 'rn-secure-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const apiIp = 'http://192.168.1.10:8000';

  const getUserData = async () => {
    try {
      const authToken = await RNSecureStorage.getItem('authToken');
      const userId = await RNSecureStorage.getItem('userId');
      if (!authToken || !userId) return;

      const res = await fetch(`${apiIp}/api/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `Bearer ${authToken}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setUser({
          ...data.user,
          profileImage: data.user.profileImage
            ? `${apiIp}/${data.user.profileImage.replace(/\\/g, '/')}`
            : null,
        });
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getUserData(); // Fetch user data on component mount
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
