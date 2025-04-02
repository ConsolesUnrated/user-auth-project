import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 10000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div style={{
      ...styles.toast,
      ...(type === 'success' ? styles.success : {}),
      ...(type === 'error' ? styles.error : {})
    }}>
      {message}
    </div>
  );
};

const styles = {
  toast: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '12px 24px',
    borderRadius: '4px',
    color: 'white',
    fontSize: '18px',
    zIndex: 1000,
    animation: 'slideIn 0.3s ease-out',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  success: {
    backgroundColor: '#4CAF50',
  },
  error: {
    backgroundColor: '#f44336',
  }
};

export default Toast; 