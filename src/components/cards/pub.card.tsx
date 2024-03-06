import { Pub } from '../../models/pub.model';
import { usePubs } from '../../hooks/use.pubs';
import { useEffect } from 'react';
import { makeImageURL } from '../../services/images';
import style from './Cards.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  pub: Pub;
};

export default function PubCard({ pub }: Props) {
  const { loadPubs, handlePubDetails } = usePubs();

  useEffect(() => {
    loadPubs();
  }, [loadPubs]);

  const despocktPubImg =
    pub.logo.publicId && makeImageURL(pub.logo.publicId, 160);

  return (
    <div className={style.main}>
      <div className={style.details}>
        <Link to={'/details/' + pub.id}>
          <img
            src={despocktPubImg}
            alt={`movil beer image de ${pub.name}`}
            onClick={() => handlePubDetails(pub)}
          />
        </Link>
        <ul>
          <li key={pub.id}>
            NAME: <span>{pub.name}</span>
          </li>
          <li key={pub.id}>
            OWNER: <span>{pub.owner}</span>
          </li>
          <li key={pub.id}>
            DIRECTION: <span>{pub.direction}</span>
          </li>
          <li key={pub.id}>
            TAPS: <span>{pub.taps}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
