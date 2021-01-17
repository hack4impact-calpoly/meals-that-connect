import styles from '../css/Component.module.css';

function Columns() {
  return (
    <div className = {styles.row}>
        <h1>You Are:</h1>
        <div className = {styles.column}>
            <p>Description Here</p>
            <button href="#">CTA</button>
        </div>
        <div className = {styles.column}>
            <p>Description Here</p>
            <button href="#" className={styles.button}>CTA</button>
        </div>
        <div className = {styles.column}>
            <p>Description Here</p>
            <button href="#" className={styles.button}>CTA</button>
        </div>
    </div>
  );
}

export default Columns;