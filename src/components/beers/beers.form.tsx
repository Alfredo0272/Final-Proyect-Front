import { useNavigate } from 'react-router-dom';
import { useBeers } from '../../hooks/use.beers';
import { SyntheticEvent } from 'react';
import style from './Beers.form.module.scss';

export default function CreateBeer() {
  const { createBeer } = useBeers();
  const navigate = useNavigate();

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const formElement = event.target as HTMLFormElement;
    const newBeer = new FormData(formElement);
    await createBeer(newBeer);
    formElement.reset();
    navigate('/beers');
  };

  return (
    <>
      <form role="form" onSubmit={handleSubmit} aria-label="Create Beers Form">
        <h1>Create Beers</h1>
        <div className={style.inputs}>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={style.inputs}>
          <label htmlFor="brewer">Brewer: </label>
          <input type="text" id="brewer" name="brewer" required />
        </div>
        <div className={style.inputs}>
          <label htmlFor="style">Style: </label>
          <input type="text" id="style" name="style" required />
        </div>
        <div className={style.inputs}>
          <label htmlFor="alcohol">Alcohol: </label>
          <input type="text" id="alcohol" name="alcohol" required />
        </div>
        <div className={style.inputs}>
          <label htmlFor="beerImg">Beer Image: </label>
          <input type="file" id="beerImg" name="beerImg" required />
        </div>
        <div className={style.submit}>
          <button type="submit">Create</button>
        </div>
      </form>
    </>
  );
}
