import styles from '../../css/Component.module.css';
import { Link } from "react-router-dom";

function Columns() {
  return (
    <div className = {styles.columns}>
        <h1>Log in or sign up</h1>
        <h1 id= {styles.arrow}> V </h1>
        <div className = {styles.row}>
          <div id = {styles.column1}>
            <h1>SITE MANAGER</h1>
            <p>short description</p>
            <Link to="login/site-manager"><button href="/login">CLICK HERE</button></Link>
          </div>
          <div id = {styles.column2}>
            <h1>DATA ENTRIER</h1>
            <p>short description</p>
            <Link to="login/data-entry"><button href="/login" className={styles.button}>CLICK HERE</button></Link>
        </div>
          <div id = {styles.column3}>
            <h1>VOLUNTEER</h1>
            <p>short description</p>
            <Link to="login/volunteer"><button href="/login" className={styles.button}>CLICK HERE</button></Link>
          </div>
        </div>
    </div>
  );
}

export default Columns;