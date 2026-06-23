import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPaperPlane } from "react-icons/fa";
import { useLanguage } from '../i18n';
import { sendChat, getPropertyDetail } from "../api/chat";
import { useDispatch } from 'react-redux';
import { setChatMessage } from '../store/chatSlice';
import { store } from '../store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fontsource/rubik';

const ChatWidget = ({ isOpen, name, phone, inputFrom, sessionId, sendTrigger, setSendTrigger }) => {
    const { t, lang } = useLanguage();
    const { chatMessage } = useSelector((state) => state.chat);
    const [input, setInput] = useState(inputFrom);
    const [isTyping, setIsTyping] = useState(false);
    const [detailModal, setDetailModal] = useState({ open: false, item: null, images: [], description: '', loading: false, activeIndex: 0 });
    const dispatch = useDispatch();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (inputFrom) setInput(inputFrom);
    }, [inputFrom]);

    const sendMessage = useCallback(() => {
        if (!input || input.trim() === "") return;

        const userMsg = {
            user: name,
            text: input,
            type: 'text'
        };

        const currentMessages = Array.isArray(chatMessage) ? chatMessage : [];
        const lastMsg = currentMessages[currentMessages.length - 1];
        const isAlreadyAdded = lastMsg && lastMsg.user === name && lastMsg.text === input;

        if (!isAlreadyAdded) {
            dispatch(setChatMessage([...currentMessages, userMsg]));
        }

        setTimeout(() => {
            setIsTyping(true);
        }, 300);

        sendChat(sessionId, input, lang).then((response) => {
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
                        product: response.product || [],
                        source_counts: response.source_counts || {}
                    }));
                    const latestMessages = Array.isArray(store.getState().chat.chatMessage)
                        ? store.getState().chat.chatMessage
                        : [];
                    dispatch(setChatMessage([...latestMessages, ...newMessages]));
                }
            }, Math.max(800, response?.messages?.join(' ').length * 20 || 800));
        }).catch((error) => {
            setTimeout(() => {
                setIsTyping(false);
            }, 500);
            console.error('Error sending message:', error);
        });

        setInput("");
    }, [input, name, sessionId, chatMessage, dispatch, setIsTyping, setInput, lang]);

    useEffect(() => {
        if (sendTrigger && input && input.trim() !== "") {
            const timer = setTimeout(() => {
                sendMessage();
                setSendTrigger(false);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [sendTrigger, input, name, sessionId, sendMessage, setSendTrigger]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessage, isTyping]);

    const openDetail = async (item) => {
        if (!item.url || !item.sumber) return;
        setDetailModal({ open: true, item, images: [], description: '', loading: true, activeIndex: 0 });
        try {
            const data = await getPropertyDetail(item.url, item.sumber);
            const images = Array.isArray(data.images) ? data.images : [];
            const description = data.description || '';
            setDetailModal(prev => ({
                ...prev,
                images,
                description,
                loading: false,
                activeIndex: 0,
            }));
        } catch (e) {
            setDetailModal(prev => ({ ...prev, loading: false }));
        }
    };

    const closeDetail = () => setDetailModal({ open: false, item: null, images: [], loading: false, activeIndex: 0 });

    const nextImage = () => {
        setDetailModal(prev => ({
            ...prev,
            activeIndex: prev.images.length ? (prev.activeIndex + 1) % prev.images.length : 0,
        }));
    };

    const prevImage = () => {
        setDetailModal(prev => ({
            ...prev,
            activeIndex: prev.images.length ? (prev.activeIndex - 1 + prev.images.length) % prev.images.length : 0,
        }));
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
                                    src="avatar.svg"
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
                                <div style={{ marginLeft: 42, marginBottom: 6 }}>
                                    {msg.source_counts && Object.keys(msg.source_counts).length > 0 && (
                                        <div style={{ fontSize: 11, color: '#666', marginBottom: 6, padding: '0 4px' }}>
                                            {Object.entries(msg.source_counts)
                                                .filter(([, count]) => count > 0)
                                                .map(([source, count]) => `${source}: ${count}`)
                                                .join(' | ')}
                                        </div>
                                    )}
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: 12,
                                        flex: '0 0 auto',
                                        marginBottom: 10,
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
                                                width: 150,
                                                minWidth: 150,
                                                flex: "0 0 auto",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div style={{
                                                width: 120,
                                                height: 80,
                                                background: item.image ? 'transparent' : 'linear-gradient(135deg, #16a34a 0%, #0d6b2e 100%)',
                                                borderRadius: 8,
                                                marginBottom: 8,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#fff',
                                                fontSize: item.image ? 0 : 24,
                                                fontWeight: 700,
                                                overflow: 'hidden',
                                            }}>
                                                {item.image ? (
                                                    <img
                                                        src={item.image}
                                                        alt={item.nama_tempat}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                        onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = '🏠'; e.target.parentElement.style.fontSize = 24; }}
                                                    />
                                                ) : '🏠'}
                                            </div>
                                            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2, textAlign: 'center' }}>{item.nama_tempat}</div>
                                            <div style={{ fontSize: 12, color: "#666", marginBottom: 2 }}>{item.tipe}</div>
                                            <div style={{ fontSize: 12, color: "#222", marginBottom: 2 }}>{item.harga}</div>
                                            <div style={{ fontSize: 12, color: "#16a34a", marginBottom: 6 }}>📍 {item.lokasi}</div>
                                            <div style={{ display: 'flex', gap: 6, width: '100%' }}>
                                                <button
                                                    style={{
                                                        flex: 1,
                                                        background: "#16a34a",
                                                        color: "#fff",
                                                        border: "none",
                                                        borderRadius: 8,
                                                        padding: "4px 8px",
                                                        fontWeight: 600,
                                                        cursor: "pointer",
                                                        fontSize: 12,
                                                    }}
                                                    onClick={() => {
                                                        toast.success(t('chat.saved'));
                                                    }}
                                                >
                                                    {t('chat.save')}
                                                </button>
                                                <button
                                                    style={{
                                                        flex: 1,
                                                        background: "#f8fafc",
                                                        color: "#16a34a",
                                                        border: "1px solid #16a34a",
                                                        borderRadius: 8,
                                                        padding: "4px 8px",
                                                        fontWeight: 600,
                                                        cursor: "pointer",
                                                        fontSize: 12,
                                                    }}
                                                    onClick={() => openDetail(item)}
                                                >
                                                    Detail
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
                        <span>{t('chat.typing')}</span>
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
                    placeholder={isTyping ? t('chat.waiting') : t('chat.placeholder')}
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
            {detailModal.open && detailModal.item && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.6)',
                        zIndex: 2000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 16,
                    }}
                    onClick={closeDetail}
                >
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: 16,
                            width: '100%',
                            maxWidth: 420,
                            maxHeight: '90vh',
                            overflowY: 'auto',
                            position: 'relative',
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button
                            onClick={closeDetail}
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                background: 'rgba(0,0,0,0.5)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                cursor: 'pointer',
                                zIndex: 10,
                                fontSize: 16,
                            }}
                        >
                            ✕
                        </button>

                        <div style={{ position: 'relative', width: '100%', height: 220, background: '#f1f1f1' }}>
                            {detailModal.loading ? (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                                    Loading...
                                </div>
                            ) : detailModal.images.length > 0 ? (
                                <>
                                    <img
                                        src={detailModal.images[detailModal.activeIndex]}
                                        alt="Property"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {detailModal.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                style={{
                                                    position: 'absolute',
                                                    left: 10,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'rgba(0,0,0,0.5)',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: 36,
                                                    height: 36,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                ‹
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                style={{
                                                    position: 'absolute',
                                                    right: 10,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                    background: 'rgba(0,0,0,0.5)',
                                                    color: '#fff',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: 36,
                                                    height: 36,
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                ›
                                            </button>
                                            <div style={{
                                                position: 'absolute',
                                                bottom: 10,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                background: 'rgba(0,0,0,0.5)',
                                                color: '#fff',
                                                borderRadius: 12,
                                                padding: '2px 10px',
                                                fontSize: 12,
                                            }}>
                                                {detailModal.activeIndex + 1} / {detailModal.images.length}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#aaa', fontSize: 48 }}>
                                    🏠
                                </div>
                            )}
                        </div>

                        <div style={{ padding: 16 }}>
                            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{detailModal.item.nama_tempat}</div>
                            <div style={{ fontSize: 14, color: '#16a34a', marginBottom: 4 }}>{detailModal.item.harga}</div>
                            <div style={{ fontSize: 13, color: '#666', marginBottom: 12 }}>📍 {detailModal.item.lokasi}</div>
                            <div style={{ fontSize: 13, color: '#444', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                                {detailModal.loading ? 'Loading detail...' : (detailModal.description || 'No description available.')}
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
        marginTop: 10,
        transition: 'background-color 0.3s',
        cursor: 'pointer',
        fontSize: '18px',
        WebkitTapHighlightColor: 'transparent',
        touchAction: 'manipulation',
        minWidth: '38px',
        minHeight: '38px'
    },
};

export default ChatWidget;
