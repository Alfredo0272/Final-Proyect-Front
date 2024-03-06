import { UserButtons } from '../buttons/user.button';
import style from './Header.module.scss';

export function Header() {
  return (
    <header className={style.header}>
      <div className={style.buttons}>
        <UserButtons />
      </div>
    </header>
  );
}
