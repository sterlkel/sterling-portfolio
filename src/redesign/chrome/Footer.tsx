import { person } from "../site";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.foot}>
      <span>© {new Date().getFullYear()} {person.name}</span>
      <span>
        <a href={person.github}>GitHub</a> · <a href={person.linkedin}>LinkedIn</a>
      </span>
    </footer>
  );
}
