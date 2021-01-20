import styles from '../css/Component.module.css';

function FrontBanner() {
  return (
    <header className={styles.home}>
        <h4>Our meals don’t just provide necessary nutrition to the seniors in our county. 
          They provide a community. </h4>
        <h5>Meals That Connect serves free nutritious noontime meals every weekday to 1,800 seniors 
          throughout San Luis Obispo. Seniors gather together at dining rooms throughout the county 
          to eat together, share stories and build friendships. For those who are unable to leave 
          their homes, volunteers personally deliver meals, using those visits as opportunities to 
          check in on the seniors.</h5>
    </header>
  );
}

export default FrontBanner;