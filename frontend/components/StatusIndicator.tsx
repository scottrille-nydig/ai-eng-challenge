import { useState, useEffect } from 'react';
import styles from '../styles/Chat.module.css';

type StatusProps = {
  isOnline: boolean;
};

const StatusIndicator = ({ isOnline }: StatusProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [prevStatus, setPrevStatus] = useState(isOnline);
  
  // Add animation effect when status changes
  useEffect(() => {
    if (prevStatus !== isOnline) {
      setShowAnimation(true);
      const timer = setTimeout(() => setShowAnimation(false), 1500);
      setPrevStatus(isOnline);
      return () => clearTimeout(timer);
    }
  }, [isOnline, prevStatus]);

  return (
    <div 
      className={`
        ${styles.statusIndicator} 
        ${isOnline ? styles.online : styles.offline}
        ${showAnimation ? 'statusChanged' : ''}
      `}
    >
      <span className={styles.statusDot}></span>
      {isOnline ? 'API Online' : 'API Offline'}
    </div>
  );
};

export default StatusIndicator;
