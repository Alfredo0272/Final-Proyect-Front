import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';
import { Router } from '../router/router';
import { Header } from '../header/header';
import Footer from '../footer/footer';

export function App() {
  const { loginWithToken } = useUsers();

  useEffect(() => {
    loginWithToken();
  }, []);

  return (
    <>
      <Header></Header>
      <Router></Router>
      <Footer></Footer>
    </>
  );
}
