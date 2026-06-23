import React, { useState } from 'react';
import { LanguageProvider } from './i18n';
import ChatLauncher from './components/ChatLauncher';
import SmartAdvisorLogin from './components/SmartAdvisorLogin';

function App() {
    const [isChatOpen, setChatOpen] = useState(true);

    const toggleChat = () => {
        setChatOpen(!isChatOpen);
    };

    return (
        <LanguageProvider>
            <div className="App">
                <ChatLauncher isOpen={isChatOpen} toggleChat={toggleChat} />
                <SmartAdvisorLogin isOpen={isChatOpen} />
            </div>
        </LanguageProvider>
    );
}

export default App;
