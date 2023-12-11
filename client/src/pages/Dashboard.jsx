import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';
import { motion, useAnimation } from 'framer-motion';

export default function Dashboard() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const [showWelcome, setShowWelcome] = useState(true);
  const controls = useAnimation();

  const logout = () => {
    // Implement logout functionality here
  };

  useEffect(() => {
    // Hide the welcome message after 5 seconds
    const timeout = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    // Bouncing animation for the welcome box
    controls.start({
      y: [-20, 20, -20],
      transition: { duration: 1, repeat: Infinity },
    });

    return () => {
      clearTimeout(timeout);
      controls.stop();
    };
  }, [controls]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div
        animate={controls}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, #ff0, #f0f, #0ff, #00f, #0f0, #ff0)',
          opacity: 0.8,
          zIndex: -1,
        }}
      />
      <header>
        <Link to="/" className="logo">
          Code Chronicles
        </Link>
        <nav>
          <>
            <Link to="/create-post">Create new post</Link>
            <Link to="/delete-post">Delete post</Link>
            <Link to="/edit-post">Edit Post</Link>
            <button onClick={logout}>Logout ({username})</button>
          </>
        </nav>
      </header>

      {showWelcome && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 720, scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 30,
          }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            zIndex: 999,
          }}
        >
          <h2>Welcome!</h2>
          <p>Thank you for visiting the CodeChronicles.</p>
          <button onClick={() => setShowWelcome(false)}>Close</button>
          {/* Firework effect */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#ffcc00',
              position: 'absolute',
              top: '-20px',
              left: '-10px',
              zIndex: 1,
            }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
            }}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#ffcc00',
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              zIndex: 1,
            }}
          />
        </motion.div>
      )}
    </div>
  );
}














