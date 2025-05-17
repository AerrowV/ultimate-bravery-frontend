import { Link } from "react-router-dom";
import styles from '../App.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <a href="https://example.com/1" className={styles.box} style={{ backgroundImage: `url('/images/image1.jpg')` }}>
        <div className={styles.overlay}>
          <h2 className={styles.title}>Box 1</h2>
        </div>
      </a>
      <a href="https://example.com/2" className={styles.box} style={{ backgroundImage: `url('/images/image2.jpg')` }}>
        <div className={styles.overlay}>
          <h2 className={styles.title}>Box 2</h2>
        </div>
      </a>
      <a href="https://example.com/3" className={styles.box} style={{ backgroundImage: `url('/images/image3.jpg')` }}>
        <div className={styles.overlay}>
          <h2 className={styles.title}>Box 3</h2>
        </div>
      </a>
    </div>
  );
}
