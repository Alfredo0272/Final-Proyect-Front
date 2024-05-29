import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useUsers } from '../../hooks/use.users';
import style from './User.button.module.scss';

export function UserButtons() {
  const { loggedUser: currentUserItem } = useSelector(
    (state: RootState) => state.usersState
  );
  const { logoutUser } = useUsers();
  const location = useLocation();

  const links = {
    register: (
      <Link to="/register">
        <button className={style.route}>Register</button>
      </Link>
    ),
    home: (
      <Link to="/home">
        <button className={style.route}>Back</button>
      </Link>
    ),
    addBeer: (
      <Link to="/addBeer" className={style.container}>
        <button className={style.route}>Create</button>
      </Link>
    ),
    addPubs: (
      <Link to="/addPubs" className={style.container}>
        <button className={style.route}>Register Pub</button>
      </Link>
    ),
    beers: (
      <Link to="/beers" className={style.container}>
        <button className={style.route}>Beers</button>
      </Link>
    ),
    user: (
      <Link to="/user" className={style.container}>
        <button className={style.route}>User</button>
      </Link>
    ),
    logout: (
      <Link to="/" className={style.container} onClick={logoutUser}>
        <button className={style.route}>Logout</button>
      </Link>
    ),
    pubs: (
      <Link to="/pubs" className={style.container}>
        <button className={style.route}>Pubs</button>
      </Link>
    ),
  };

  return (
    <section className={style.section}>
      {!currentUserItem &&
        ['/', '/home'].includes(location.pathname) &&
        links.register}
      {!currentUserItem && location.pathname === '/register' && links.home}
      {!currentUserItem && location.pathname === '/*' && links.home}
      {currentUserItem && (
        <>
          {location.pathname !== '/addBeer' && links.addBeer}
          {location.pathname !== '/addPubs' &&
            currentUserItem.role === 'Admin' &&
            links.addPubs}
          {links.beers}
          {links.user}
          {links.logout}
          {links.pubs}
        </>
      )}
    </section>
  );
}
