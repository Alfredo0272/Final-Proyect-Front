import { SyntheticEvent, useState } from 'react';
import { useUsers } from '../../hooks/use.users';
import { LoginUser } from '../../models/user.model';
import style from './Login.module.scss';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [hasLogin, setHasLogin] = useState(false);
  const { login } = useUsers();

  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const element = event.target as HTMLFormElement;
    const loggedUser = {
      email: (element.elements.namedItem('email') as HTMLInputElement).value,
      password: (element.elements.namedItem('password') as HTMLInputElement)
        .value,
    } as LoginUser;
    if (loggedUser.email === '' || loggedUser.password === '') {
      Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'LOGIN ERROR',
        text: 'Try again please',
        background:
          'linear-gradient(to right, rgba(20, 20, 20), rgba(0, 0, 0))',
        color: 'white',
        iconColor: 'red',
        showConfirmButton: false,
        padding: '4em 0',
        timer: 2500,
      });
    } else {
      try {
        await login(loggedUser);
        setHasLogin(true);
        element.reset();
        navigate('/pubs');
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  };

  return (
    <section className={style.main}>
      <h2 className={style.h2}>Login</h2>
      {!hasLogin && (
        <form onSubmit={handleSubmit} aria-label="form" className={style.form}>
          <div className={style.email}>
            <label htmlFor="email" className="email">
              Email:{' '}
            </label>
            <input type="email" id="email" name="email" role="textbox" />
          </div>
          <div className={style.password}>
            <label htmlFor="password">Password: </label>
            <input type="text" id="password" name="password" />
          </div>
          <div>
            <button type="submit" className={style.submit}>
              Sign In
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
