import { useEffect, useMemo, useState } from 'react';
import { useBeers } from '../../hooks/use.beers';
import style from './Beer.details.module.scss';
import { makeImageURL } from '../../services/images';
import { useUsers } from '../../hooks/use.users';
import { useLocation } from 'react-router-dom';
import { usePubs } from '../../hooks/use.pubs';
import { Pub } from '../../models/pub.model';

export default function BeerDetails() {
  const { currentBeerItem, loadBeerById } = useBeers();
  const { addBeer, delBeer, userStore } = useUsers();
  const { pubs, addBeerToTap, delBeerFromTap, loadPubs } = usePubs();
  const beerId = currentBeerItem?.id;
  const location = useLocation();
  const [showPubList, setShowPubList] = useState(false);
  const [pubAction, setPubAction] = useState<'add' | 'delete' | null>(null);
  const token = userStore.get()?.token;

  useEffect(() => {
    loadBeerById();
  }, [loadBeerById]);

  useEffect(() => {
    loadPubs();
  }, [loadPubs]);

  const desktopDetailBeerImg = useMemo(
    () =>
      currentBeerItem?.beerImg.publicId &&
      makeImageURL(currentBeerItem.beerImg.publicId, 550),
    [currentBeerItem]
  );

  const handleUserBeerAction = (action: 'add' | 'delete') => {
    const beerAction = action === 'add' ? addBeer : delBeer;
    if (beerId) {
      beerAction(beerId, token!);
    }
  };

  const handlePubActionConfirmation = (selectedPub: Pub) => {
    if (selectedPub && pubAction) {
      const pubActionFunction =
        pubAction === 'add' ? addBeerToTap : delBeerFromTap;
      pubActionFunction(selectedPub, beerId!, token!);
      setShowPubList(false);
      setPubAction(null);
    }
  };

  return (
    <div className={style.main}>
      <h2 className="main-title">Details</h2>

      <div className={style.details}>
        {desktopDetailBeerImg && <img src={desktopDetailBeerImg} alt="image" />}
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
          {location.pathname === `/details/${beerId}` && (
            <>
              <button
                onClick={() => handleUserBeerAction('add')}
                className={style.button}
              >
                ❤️
              </button>
              <button
                onClick={() => handleUserBeerAction('delete')}
                className={style.button}
              >
                🗑
              </button>
            </>
          )}

          {location.pathname === `/details/${beerId}` && (
            <div className={style.actionButtons}>
              <button
                onClick={() => {
                  setShowPubList(true);
                  setPubAction('add');
                }}
                className={style.button}
              >
                Add Beer to Pub
              </button>
              <button
                onClick={() => {
                  setShowPubList(true);
                  setPubAction('delete');
                }}
                className={style.button}
              >
                Delete Beer from Pub
              </button>
            </div>
          )}
        </ul>
      </div>

      {showPubList && (
        <div className={style.pubList}>
          <h3>Select a pub:</h3>
          <ul>
            {pubs!.map((pub) => (
              <li key={pub.id}>
                <button
                  onClick={() => handlePubActionConfirmation(pub)}
                  className={style.button}
                >
                  {pub.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
