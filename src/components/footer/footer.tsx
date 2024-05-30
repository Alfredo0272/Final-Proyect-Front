import style from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={style.footer}>
      <p className={style.firstContent}>Social Beer Application</p>
      <p className={style.secondContent}>Drink Responsibly</p>
    </footer>
  );
}
