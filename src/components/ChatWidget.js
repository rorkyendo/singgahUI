import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPaperPlane } from "react-icons/fa";
import { sendChat } from "../api/chat";
import { useDispatch } from 'react-redux';
import { setChatMessage } from '../store/chatSlice';
import { store } from '../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/rubik';

const ChatWidget = ({ isOpen, name, phone, inputFrom, sessionId, sendTrigger, setSendTrigger }) => {
    const { chatMessage } = useSelector((state) => state.chat);
    const [input, setInput] = useState(inputFrom);
    const [sessId, setSessionId] = useState(sessionId);
    const [isTyping, setIsTyping] = useState(false);
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (inputFrom) setInput(inputFrom);
        if (sessId) setSessionId(sessionId);
    }, [inputFrom, sessionId]);

    useEffect(() => {
        if (sendTrigger && input && input.trim() !== "") {
            const timer = setTimeout(() => {
                sendMessage();
                setSendTrigger(false);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [sendTrigger, input, name, sessionId]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessage, isTyping]);

    const sendMessage = () => {
        if (!input || input.trim() === "") return;

        const userMsg = {
            user: name,
            text: input,
            type: 'text'
        };

        dispatch(setChatMessage(Array.isArray(chatMessage) ? [...chatMessage, userMsg] : [userMsg]));

        setTimeout(() => {
            setIsTyping(true);
        }, 300);

        sendChat(sessionId, input).then((response) => {
            setTimeout(() => {
                setIsTyping(false);

                const botArray = Array.isArray(response?.messages)
                    ? response.messages
                    : Array.isArray(response?.message)
                        ? response.message
                        : [];

                if (botArray.length > 0) {
                    const newMessages = botArray.map(msg => ({
                        user: 'bot',
                        text: msg,
                        type: 'text',
                        is_product: response.is_product,
                        product: response.product || []
                    }));
                    const currentMessages = Array.isArray(store.getState().chat.chatMessage)
                        ? store.getState().chat.chatMessage
                        : [];
                    dispatch(setChatMessage([...currentMessages, ...newMessages]));
                }
            }, Math.max(800, response?.messages?.join(' ').length * 20 || 800));
        }).catch((error) => {
            setTimeout(() => {
                setIsTyping(false);
            }, 500);
            console.error('Error sending message:', error);
        });

        setInput("");
    };

    if (!isOpen) return null;

    return (
        <>
            <div style={widgetStyles.messages}>
                {chatMessage.map((msg, index) => {
                    const isLastBotMsgWithProduct =
                        msg.user === 'bot' &&
                        msg.is_product &&
                        Array.isArray(msg.product) &&
                        msg.product.length > 0 &&
                        chatMessage.slice(index + 1).findIndex(
                            m => m.user === 'bot' && m.is_product && Array.isArray(m.product) && m.product.length > 0
                        ) === -1;

                    if (msg.user === name) {
                        return (
                            <div
                                key={index}
                                style={{
                                    alignSelf: 'flex-end',
                                    background: '#00880D',
                                    color: '#fff',
                                    padding: '10px 14px',
                                    fontSize: 14,
                                    maxWidth: '80%',
                                    borderRadius: '8px 8px 8px 8px',
                                    border: '1px solid',
                                    marginBottom: 10,
                                    fontFamily: 'Rubik, Arial, sans-serif',
                                }}
                            >
                                {msg.type === "text" && (
                                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                )}
                            </div>
                        );
                    }

                    return (
                        <React.Fragment key={index}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    marginBottom: 10,
                                    maxWidth: '80%',
                                }}
                            >
                                <img
                                    src="mbaksinggah.png"
                                    alt="Bot"
                                    style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        marginRight: 10,
                                        marginTop: 2,
                                        border: '1.5px solid #eee',
                                        background: '#fff',
                                    }}
                                />
                                <div
                                    style={{
                                        alignSelf: 'flex-start',
                                        background: '#ffffff',
                                        color: '#000',
                                        padding: '10px 14px',
                                        fontSize: 14,
                                        borderRadius: '8px 8px 8px 8px',
                                        fontFamily: 'Rubik, Arial, sans-serif',
                                        boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                                    }}
                                >
                                    {msg.type === "text" && (
                                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                    )}
                                </div>
                            </div>
                            {isLastBotMsgWithProduct && (
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: 12,
                                        flex: '0 0 auto',
                                        marginBottom: 10,
                                        marginLeft: 42,
                                        overflowX: 'auto',
                                        overflowY: 'visible',
                                        padding: 8,
                                        background: '#fff',
                                        borderRadius: 12,
                                        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                                    }}
                                >
                                    {msg.product.map((item, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                background: "#F7F7F7",
                                                borderRadius: 10,
                                                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                                padding: 10,
                                                width: 180,
                                                minWidth: 180,
                                                flex: "0 0 auto",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div style={{
                                                width: 120,
                                                height: 80,
                                                background: 'linear-gradient(135deg, #16a34a 0%, #0d6b2e 100%)',
                                                borderRadius: 8,
                                                marginBottom: 8,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontSize: 24,
                                                fontWeight: 700
                                            }}>
                                                🏠
                                            </div>
                                            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2, textAlign: 'center' }}>{item.nama_tempat}</div>
                                            <div style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>{item.tipe}</div>
                                            <div style={{ fontSize: 12, color: "#222", marginBottom: 2 }}>{item.harga}</div>
                                            <div style={{ fontSize: 12, color: "#16a34a", marginBottom: 6 }}>📍 {item.lokasi}</div>
                                            <button
                                                style={{
                                                    background: "#16a34a",
                                                    color: "#fff",
                                                    border: "none",
                                                    borderRadius: 8,
                                                    padding: "4px 18px",
                                                    fontWeight: 600,
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => {
                                                    toast.success('Tempat berhasil disimpan!');
                                                }}
                                            >
                                                Simpan
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}

                {isTyping && (
                    <div
                        style={{
                            alignSelf: 'flex-start',
                            background: '#f5f5f5',
                            color: '#666',
                            padding: '12px 16px',
                            fontSize: 14,
                            maxWidth: '80%',
                            borderRadius: '16px 16px 16px 4px',
                            border: '1px solid #e0e0e0',
                            marginBottom: 10,
                            fontFamily: 'Rubik, Arial, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <div className="typing-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span>Mbak Singgah sedang mengetik...</span>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>
            <div style={widgetStyles.inputArea}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{
                        ...widgetStyles.inputNew,
                        backgroundColor: isTyping ? '#f5f5f5' : '#fff',
                        color: isTyping ? '#999' : '#444'
                    }}
                    placeholder={isTyping ? "Menunggu respons..." : "Tanya Mbak Singgah..."}
                    rows={1}
                    disabled={isTyping}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey && !isTyping) {
                            e.preventDefault();
                            sendMessage();
                        }
                    }}
                />
                <button
                    style={{
                        ...widgetStyles.sendBtn,
                        backgroundColor: isTyping ? '#cccccc' : '#16a34a',
                        cursor: isTyping ? 'not-allowed' : 'pointer'
                    }}
                    onClick={sendMessage}
                    disabled={isTyping}
                >
                    <FaPaperPlane />
                </button>
            </div>
            <ToastContainer position="top-center" autoClose={1500} />
        </>
    );
};

const widgetStyles = {
    messages: {
        flex: 1,
        padding: '10px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
    },
    inputArea: {
        display: 'flex',
        padding: '15px',
        marginBottom: 'env(safe-area-inset-bottom, 10px)',
    },
    inputNew: {
        flex: 1,
        padding: '12px 12px',
        border: '1.5px solid #16a34a',
        borderRadius: '20px',
        outline: 'none',
        fontSize: '13px',
        marginRight: '8px',
        resize: 'none',
        minHeight: '38px',
        maxHeight: '90px',
        lineHeight: 1.5,
        background: '#fff',
        color: '#444',
        fontFamily: 'Rubik, Arial, sans-serif',
        overflow: 'hidden'
    },
    sendBtn: {
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        backgroundColor: '#16a34a',
        color: 'white',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4px',
        transition: 'background-color 0.3s',
        cursor: 'pointer',
        fontSize: '18px',
        marginTop: 10,
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        minWidth: '38px',
        minHeight: '38px'
    },
};

export default ChatWidget;
