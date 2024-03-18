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
  const registerLink = (
    <Link to="/register">
      <button className={style.route}>Register</button>
    </Link>
  );
  const homeLink = (
    <Link to="/home">
      <button className={style.route}>Back</button>
    </Link>
  );

  return (
    <section className={style.section}>
      {!currentUserItem && location.pathname === '/' && registerLink}
      {!currentUserItem && location.pathname === '/home' && registerLink}
      {!currentUserItem && location.pathname === '/register' && homeLink}
      {!currentUserItem && location.pathname === '/*' && homeLink}
      {currentUserItem && (
        <>
          {location.pathname !== '/addBeer' && (
            <Link to="/addBeer" className={style.container}>
              <button className={style.route}>Create</button>
            </Link>
          )}
          {location.pathname !== '/addPubs' &&
            currentUserItem.role === 'Admin' && (
              <Link to="/addPubs" className={style.container}>
                <button className={style.route}>Registre Pub</button>
              </Link>
            )}
          <Link to="/beers" className={style.container}>
            <button className={style.route}>Beers</button>
          </Link>
          <Link to="/user" className={style.container}>
            <button className={style.route}>User</button>
          </Link>
          <Link to="/" className={style.container} onClick={logoutUser}>
            <button className={style.route}>Logout</button>
          </Link>
          <Link to="/pubs" className={style.container}>
            <button className={style.route}>Pubs</button>
          </Link>
        </>
      )}
    </section>
  );
}
