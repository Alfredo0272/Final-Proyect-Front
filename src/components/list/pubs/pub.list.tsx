import { useEffect } from 'react';
import style from './Pub.list.module.scss';
import { usePubs } from '../../../hooks/use.pubs';
import { Pub } from '../../../models/pub.model';
import PubCard from '../../cards/pub.card';

export default function PubList() {
  const { loadPubs, pubs } = usePubs();

  useEffect(() => {
    loadPubs();
  }, [loadPubs]);

  return (
    <div className={style.list}>
      <h2>Pubs</h2>

      <ul className={style.list}>
        {pubs.map((item: Pub) => (
          <PubCard key={item.id} pub={item} />
        ))}
      </ul>
    </div>
  );
}
