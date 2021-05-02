import React from 'react';

import { ChallengesContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/Profile.module.css';

const Profile: React.FC = () => {
  const { level } = React.useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/geovannemoro.png" alt="Geovanne Moro" />
      <div>
        <strong>Geovanne Moro</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          {`Level ${level}`}
        </p>
      </div>
    </div>
  );
};

export default Profile;
