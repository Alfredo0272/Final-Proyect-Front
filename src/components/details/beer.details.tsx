import { useEffect, useState } from 'react';
import { useBeers } from '../../hooks/use.beers';
import style from './Beer.details.module.scss';
import { makeImageURL } from '../../services/images';
import { useUsers } from '../../hooks/use.users';
import { useLocation } from 'react-router-dom';
import { usePubs } from '../../hooks/use.pubs';

export default function BeerDetails() {
  const { currentBeerItem, loadBeerById } = useBeers();
  const { addBeer, delBeer, userStore } = useUsers();
  const { pubs, addBeerToTap, loadPubs } = usePubs();
  const beer = currentBeerItem?.id;
  const location = useLocation();
  const [pub, setSelectedPub] = useState<string | null>(null);
  const [showPubList, setShowPubList] = useState(false);
  const token = userStore.get()?.token;

  useEffect(() => {
    loadBeerById();
    loadPubs();
  }, [loadBeerById, loadPubs]);

  const desktopDetailBeerImg =
    currentBeerItem?.beerImg.publicId &&
    makeImageURL(currentBeerItem.beerImg.publicId, 550);

  const handleAddBeer = () => {
    addBeer(beer!, token!);
  };

  const handleAddBeerToTap = () => {
    if (pub) {
      addBeerToTap(beer!, pub, token!);
    }
  };

  const handleDelBeer = () => {
    delBeer(beer!, token!);
  };

  return (
    <div className={style.main}>
      <h2 className="main-title"> Details </h2>

      <div className={style.details}>
        <img src={desktopDetailBeerImg} alt="image"></img>
        <ul>
          <li>
            NAME: <span>{currentBeerItem?.name}</span>
          </li>
          <li>
            BREWER: <span>{currentBeerItem?.brewer}</span>
          </li>
          <li>
            STYLE: <span>{currentBeerItem?.style}</span>
          </li>
          <li>
            ALCOHOL: <span>{currentBeerItem?.alcohol}</span>
          </li>

          {location.pathname === `/details/${currentBeerItem?.id}` && (
            <button onClick={handleAddBeer} className={style.button}>
              {' '}
              ❤️{' '}
            </button>
          )}

          <button onClick={handleDelBeer} className={style.button}>
            {' '}
            🗑{' '}
          </button>

          <button onClick={() => setShowPubList(true)} className={style.button}>
            {' '}
            🔼{' '}
          </button>

          {showPubList && (
            <div className={style.pubList}>
              <h3>Select a pub:</h3>
              <ul>
                {pubs.map((pub) => (
                  <li key={pub.id} onClick={() => setSelectedPub(pub.id)}>
                    {' '}
                    {pub.name}{' '}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setShowPubList(false);
                  handleAddBeerToTap();
                }}
                className={style.button}
              >
                {' '}
                Confirm{' '}
              </button>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}
