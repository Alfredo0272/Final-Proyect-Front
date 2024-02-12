import { Link } from 'react-router-dom';

import { Beer } from '../../models/beer.model';
import { makeImageURL } from '../../services/images';
import { useEffect } from 'react';
import { useBeers } from '../../hooks/use.beers';
import style from './Beer.card.module.scss';

type Props = {
  beer: Beer;
};

export default function BeerCard({ beer }: Props) {
  const { loadBeer, handleBeerDetails } = useBeers();

  useEffect(() => {
    loadBeer();
  }, [loadBeer]);

  const despocktBeerImg =
    beer.beerImg.publicId && makeImageURL(beer.beerImg.publicId, 160);
  console.log('beers card despockBeer Imagen', despocktBeerImg);
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
          <li key={beer.id}>
            NAME: <span>{beer.name}</span>
          </li>
          <li key={beer.id}>
            BREWER: <span>{beer.brewer}</span>
          </li>
          <li key={beer.id}>
            STYLE: <span>{beer.style}</span>
          </li>
          <li key={beer.id}>
            ALCOHOL: <span>{beer.alcohol}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
