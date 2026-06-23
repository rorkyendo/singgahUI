import React from 'react';
import { FaTimes } from "react-icons/fa";

const ChatLauncher = ({ isOpen, toggleChat }) => {
    return (
        <button className="chat-launcher" onClick={toggleChat} style={launcherStyles}>
            {isOpen ?
                <FaTimes style={launcherIcon} /> :
                <img src="avatar.jpg" alt="Mbok Yem" style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }} />
            }
        </button>
    );
};

const launcherStyles = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '4px',
    backgroundColor: "#FFFFFF",
    color: 'white',
    border: 'solid 2px #007200',
    borderRadius: '50%',
    cursor: 'pointer',
    zIndex: 1000,
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    minWidth: '44px',
    minHeight: '44px',
};

const launcherIcon = {
    width: '1.5em',
    height: '1.5em',
    color: '#007200',
};

export default ChatLauncher;
