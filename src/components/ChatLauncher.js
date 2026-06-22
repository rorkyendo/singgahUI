import React from 'react';
import { FaRegComments, FaTimes } from "react-icons/fa";

const ChatLauncher = ({ isOpen, toggleChat }) => {
    return (
        <button onClick={toggleChat} style={launcherStyles}>
            {isOpen ?
                <FaTimes style={launcherIcon} /> :
                <img src="lc_icon.png" alt="Chat Icon" style={{ width: '40px', height: '40px' }} />
            }
        </button>
    );
};

const launcherStyles = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 12px',
    backgroundColor: "#FFFFFF",
    color: 'white',
    border: 'solid 2px #007200',
    borderRadius: '50px',
    cursor: 'pointer',
    zIndex: 1000,
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    minWidth: '44px',
    minHeight: '44px'
};

const launcherIcon = {
    width: '1.5em',
    height: '1.5em',
    color: '#007200',
};

export default ChatLauncher;
