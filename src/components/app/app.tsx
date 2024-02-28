import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';
import { Router } from '../router/router';

export function App() {
  const { loginWithToken } = useUsers();

  useEffect(() => {
    loginWithToken();
  }, []);

  return (
    <>
      <Router></Router>
    </>
  );
}
