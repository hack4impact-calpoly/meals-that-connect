import styles from '../css/Component.module.css';
import { Link } from "react-router-dom";

function Columns() {
  return (
    <div className = {styles.columns}>
        <h1>You Are:</h1>
        <div className = {styles.row}>
        <div className = {styles.column}>
            <p>Site Manager</p>
            <Link to="login"><button href="/login">Login</button></Link>
        </div>
        <div className = {styles.column}>
            <p>Data Entry</p>
            <Link to="login"><button href="/login" className={styles.button}>Login</button></Link>
        </div>
        <div className = {styles.column}>
            <p>Driver or Kitchen Staff</p>
            <Link to="login"><button href="/login" className={styles.button}>Login</button></Link>
        </div>
        </div>
    </div>
  );
}

export default Columns;