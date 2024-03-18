import { useEffect } from 'react';
import style from './Pub.details.module.scss';
import { makeImageURL } from '../../services/images';
import { usePubs } from '../../hooks/use.pubs';
import { Beer } from '../../models/beer.model';
import BeerCard from '../cards/beer.card';
import { useBeers } from '../../hooks/use.beers';
import { useUsers } from '../../hooks/use.users';

export default function PubDetails() {
  const { currentPubItem, loadPubById } = usePubs();
  const { loadBeer } = useBeers();
  const { addPub, delPub, userStore } = useUsers();
  const token = userStore.get()?.token;
  const pub = currentPubItem!.id;

  useEffect(() => {
    loadPubById();
    loadBeer();
  }, [loadPubById, loadBeer]);

  const handleAddVisitedPub = () => {
    addPub(pub!, token!);
  };

  const handleDelVisitedPub = () => {
    delPub(pub!, token!);
  };

  const desktopDetailPubImg =
    currentPubItem?.logo.publicId &&
    makeImageURL(currentPubItem.logo.publicId, 550);

  return (
    <div className={style.main}>
      <h2 className="main-title"> Details </h2>

      <div className={style.details}>
        <img src={desktopDetailPubImg} alt="image"></img>
        <ul>
          <li>
            NAME: <span>{currentPubItem?.name}</span>
          </li>
          <li>
            OWNER: <span>{currentPubItem?.owner}</span>
          </li>
          <li>
            DIRECTION: <span>{currentPubItem?.direction}</span>
          </li>
          <li>
            TAPS: <span>{currentPubItem?.taps}</span>
          </li>

          <div className={style.buttons}>
            <button onClick={handleAddVisitedPub}> ❤️ </button>
            <button onClick={handleDelVisitedPub}> 🗑 </button>
          </div>
          <ul className="Beer-list">
            {currentPubItem?.beers.map((item: Beer) => (
              <BeerCard key={item.id} beer={item} />
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
}
