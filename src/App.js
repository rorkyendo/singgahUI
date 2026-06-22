import React, { useState } from 'react';
import ChatLauncher from './components/ChatLauncher';
import SmartAdvisorLogin from './components/SmartAdvisorLogin';

function App() {
    const [isChatOpen, setChatOpen] = useState(true);

    const toggleChat = () => {
        setChatOpen(!isChatOpen);
    };

    return (
        <div className="App">
            <ChatLauncher isOpen={isChatOpen} toggleChat={toggleChat} />
            <SmartAdvisorLogin isOpen={isChatOpen} />
        </div>
    );
}

export default App;
