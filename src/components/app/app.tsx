import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';

export function App() {
  const { loginWithToken } = useUsers();

  useEffect(() => {
    loginWithToken();
  }, []);

  return <></>;
}
