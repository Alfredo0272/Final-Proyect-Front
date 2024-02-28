import { useEffect } from 'react';
import style from './Beer.details.module.scss';
import { makeImageURL } from '../../services/images';
import { usePubs } from '../../hooks/use.pubs';
import { Beer } from '../../models/beer.model';
import BeerCard from '../cards/beer.card';

export default function BeerDetails() {
  const { currentPubItem, loadPubById } = usePubs();

  useEffect(() => {
    loadPubById();
  }, []);

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
            NAME: <span>{currentPubItem!.name}</span>
          </li>
          <li>
            OWNER: <span>{currentPubItem!.owner}</span>
          </li>
          <li>
            DIRECTION: <span>{currentPubItem!.direction}</span>
          </li>
          <li>
            TAPS: <span>{currentPubItem!.taps}</span>
          </li>
          <ul className="Beer-list">
            {currentPubItem!.beers.map((item: Beer) => (
              <BeerCard key={item.id} beer={item} />
            ))}
          </ul>
        </ul>
      </div>
    </div>
  );
}
