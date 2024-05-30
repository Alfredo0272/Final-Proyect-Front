import { SyntheticEvent, useState } from 'react';
import { useUsers } from '../../hooks/use.users';
import { User } from '../../models/user.model';
import style from './Register.module.scss';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Register() {
  const [hasRegister, setHasRegister] = useState(false);
  const { register } = useUsers();

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const data = {
      name: (formElement.elements.namedItem('name') as HTMLInputElement).value,
      surname: (formElement.elements.namedItem('surname') as HTMLInputElement)
        .value,
      age: (formElement.elements.namedItem('age') as HTMLInputElement)
        .valueAsNumber,
      userName: (formElement.elements.namedItem('user') as HTMLInputElement)
        .value,
      email: (formElement.elements.namedItem('email') as HTMLInputElement)
        .value,
      password: (formElement.elements.namedItem('password') as HTMLInputElement)
        .value,
    } as Partial<User>;
    if (
      data.userName === '' ||
      data.email === '' ||
      data.password === '' ||
      data.name === '' ||
      data.age! <= 18 ||
      data.surname === ''
    ) {
      Swal.fire({
        width: '20em',
        icon: 'error',
        title: 'REGISTER ERROR',
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
      register(data);
      setHasRegister(true);
      formElement.reset();
    }
  };

  return (
    <>
      <section className={style.main}>
        <h2>Register</h2>

        {!hasRegister && (
          <form
            onSubmit={handleSubmit}
            aria-label="form"
            className={style.form}
          >
            <div className={style.inputs}>
              <label htmlFor="name">Name: </label>
              <input type="text" id="name" name="name" />
            </div>
            <div className={style.inputs}>
              <label htmlFor="surname">Surname: </label>
              <input type="text" id="surname" name="surname" />
            </div>
            <div className={style.inputs}>
              <label htmlFor="age">age: </label>
              <input type="number" id="age" name="age" />
            </div>
            <div className={style.inputs}>
              <label htmlFor="userName">User name: </label>
              <input type="text" id="user" name="user" />
            </div>
            <div className={style.inputs}>
              <label htmlFor="email">Email: </label>
              <input type="email" id="email" name="email" role="textbox" />
            </div>
            <div className={style.inputs}>
              <label htmlFor="password">Password: </label>
              <input type="text" id="password" name="password" />
            </div>
            <div className={style.submit}>
              <button type="submit" className={style.button}>
                Sign Up
              </button>
            </div>
          </form>
        )}
        {hasRegister && (
          <div className={style.registered}>
            <p>Registration successful</p>
            <Link to={'/home/'}>
              <button type="button" className={style.button}>
                Continue
              </button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
