import { Link } from 'react-router-dom';
import { Beer } from '../../models/beer.model';
import { makeImageURL } from '../../services/images';
import { useBeers } from '../../hooks/use.beers';
import style from './Cards.module.scss';

type Props = {
  beer: Beer;
};

export default function BeerCard({ beer }: Props) {
  const { handleBeerDetails } = useBeers();

  const despocktBeerImg =
    beer?.beerImg?.publicId && makeImageURL(beer.beerImg.publicId, 160);
  return (
    <div className={style.main}>
      <div className={style.details}>
        <Link to={'/details/' + beer.id}>
          <img
            src={despocktBeerImg}
            alt={`movil beer image de ${beer.name}`}
            onClick={() => handleBeerDetails(beer)}
          />
        </Link>
        <ul>
          <li>
            NAME: <span>{beer.name}</span>
          </li>
          <li>
            BREWER: <span>{beer.brewer}</span>
          </li>
          <li>
            STYLE: <span>{beer.style}</span>
          </li>
          <li>
            ALCOHOL: <span>{beer.alcohol}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
