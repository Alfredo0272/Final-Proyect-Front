import { useEffect } from 'react';
import { useUsers } from '../../hooks/use.users';
import { useBeers } from '../../hooks/use.beers';
import { usePubs } from '../../hooks/use.pubs';
import BeerCard from '../cards/beer.card';
import PubCard from '../cards/pub.card';
import style from './Beer.details.module.scss';
import { Pub } from '../../models/pub.model';
import { Beer } from '../../models/beer.model';

const Loading = () => <div>Loading...</div>;

export default function UserDetails() {
  const { loggedUser, loading } = useUsers();
  const { loadBeer } = useBeers();
  const { loadPubs } = usePubs();

  useEffect(() => {
    loadBeer();
    loadPubs();
  }, [loadBeer, loadPubs]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className={style.main}>
        <h2 className="main-title"> Hola {loggedUser?.userName}</h2>
        <div className={style.details}>
          <ul>
            <li>
              NAME: <span>{loggedUser?.name}</span>
            </li>
            <li>
              SURNAME: <span>{loggedUser?.surname}</span>
            </li>
            <li>
              EMAIL: <span>{loggedUser?.email}</span>
            </li>
            <li>
              EDAD: <span>{loggedUser?.age}</span>
            </li>
          </ul>
        </div>
      </div>
      <h3 className={style.main}>Visitados</h3>
      <ul className="Pub-list">
        {loggedUser?.visitado.map((item: Pub) => (
          <PubCard key={`pub-${item.id}`} pub={item} />
        ))}
      </ul>
      <h3 className={style.main}>Probados</h3>
      <ul className="Beer-list">
        {loggedUser?.probada.map((item: Beer) => (
          <BeerCard key={`beer-${item.id}`} beer={item} />
        ))}
      </ul>
    </>
  );
}
