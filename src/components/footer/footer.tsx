import style from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <p className="footer--first-content">Social Beer Aplication</p>
      <p className="footer--second-content"> Drink Responsably</p>
    </footer>
  );
}
