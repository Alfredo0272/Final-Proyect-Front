import { useNavigate } from 'react-router-dom';
import { usePubs } from '../../hooks/use.pubs';
import { SyntheticEvent } from 'react';
import style from './Pubs.form.module.scss';
export default function CreatePubs() {
  const { createPub } = usePubs();
  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const newPub = new FormData(formElement);
    await createPub(newPub);
    formElement.reset();
    navigate('/pubs');
  };

  return (
    <>
      <form role="form" onSubmit={handleSubmit} aria-label="Register Pubs Form">
        <h1>Register Pubs</h1>
        <div className={style.inputs}>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={style.inputs}>
          <label htmlFor="owner">Owner: </label>
          <input type="text" id="owner" name="owner" required />
        </div>
        <div className={style.inputs}>
          <label htmlFor="direction">Direction: </label>
          <input type="text" id="direction" name="direction" required />
        </div>
        <div className={style.inputs}>
          <label htmlFor="taps">Taps: </label>
          <input type="number" id="taps" name="taps" required />
        </div>
        <div className={style.inputs}>
          <label htmlFor="logo">Logo Image: </label>
          <input type="file" id="logo" name="logo" required />
        </div>
        <div className={style.submit}>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  );
}
