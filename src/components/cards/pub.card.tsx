import { Pub } from '../../models/pub.model';
import { usePubs } from '../../hooks/use.pubs';
import { makeImageURL } from '../../services/images';
import style from './Cards.module.scss';
import { Link } from 'react-router-dom';

type Props = {
  pub: Pub;
};

export default function PubCard({ pub }: Props) {
  const { handlePubDetails } = usePubs();

  const despocktPubImg =
    pub?.logo?.publicId && makeImageURL(pub.logo.publicId, 160);

  return (
    <div className={style.main}>
      <div className={style.details}>
        <Link to={'/pubs/' + pub.id}>
          <img
            src={despocktPubImg}
            alt={`movil pub image de ${pub.name}`}
            onClick={() => handlePubDetails(pub)}
          />
        </Link>
        <ul>
          <li key={`${pub.id}-name`}>
            NAME: <span>{pub.name}</span>
          </li>
          <li key={`${pub.id}-owner`}>
            OWNER: <span>{pub.owner}</span>
          </li>
          <li key={`${pub.id}-direction`}>
            DIRECTION: <span>{pub.direction}</span>
          </li>
          <li key={`${pub.id}-taps`}>
            TAPS: <span>{pub.taps}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
