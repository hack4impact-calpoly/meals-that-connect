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
            <p>Responsible for collecting and organizing all client and route information.
            The site manager determines how many clients need meals and how to organize the delivery routes.
            </p>
            <Link to="login/site-manager"><button href="/login">CLICK HERE</button></Link>
          </div>
          <div id = {styles.column2}>
            <h1>DATA ENTRIER</h1>
            <p>Responsible for checking that ordered meal totals match the recorded delivery totals and 
               then uploading meal totals into the state supplied database: Wellsky.</p>
            <Link to="login/data-entry"><button href="/login" className={styles.button}>CLICK HERE</button></Link>
        </div>
          <div id = {styles.column3}>
            <h1>VOLUNTEER</h1>
            <p>There are two types of volunteer classifications: drivers and kitchen help; although a single volunteer can serve in both capacities. 
               Both types of volunteers will be responsible for logging their hours worked.</p>
            <Link to="login/volunteer"><button href="/login" className={styles.button}>CLICK HERE</button></Link>
          </div>
        </div>
    </div>
  );
}

export default Columns;