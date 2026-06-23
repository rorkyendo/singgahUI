import React, { useState } from 'react';
import { LanguageProvider } from './i18n';
import ChatLauncher from './components/ChatLauncher';
import SmartAdvisorLogin from './components/SmartAdvisorLogin';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';
import LandingPage from './components/LandingPage';

function App() {
    const [isChatOpen, setChatOpen] = useState(false);
    const [isPrivacyOpen, setPrivacyOpen] = useState(false);

    const toggleChat = () => setChatOpen(prev => !prev);
    const openWidget = () => setChatOpen(true);
    const openPrivacy = () => setPrivacyOpen(true);
    const closePrivacy = () => setPrivacyOpen(false);

    return (
        <LanguageProvider>
            <div className="App">
                <LandingPage onOpenWidget={openWidget} onOpenPrivacy={openPrivacy} />
                <ChatLauncher isOpen={isChatOpen} toggleChat={toggleChat} />
                <SmartAdvisorLogin isOpen={isChatOpen} />
                <PrivacyPolicyModal isOpen={isPrivacyOpen} onClose={closePrivacy} />
            </div>
        </LanguageProvider>
    );
}

export default App;
