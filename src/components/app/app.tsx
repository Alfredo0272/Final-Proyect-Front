import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';
import Home from '../home/home';

export function App() {
  const { loginWithToken } = useUsers();

  useEffect(() => {
    loginWithToken();
  }, []);

  return (
    <>
      <Home></Home>
    </>
  );
}
