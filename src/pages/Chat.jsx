import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import './ChatData.css'; // Reusing or new CSS

const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: 'Hello Ahmed! I am FitAI. How can I help you reach your goals today?' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate AI Response
        setTimeout(() => {
            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: 'That is a great question! Based on your goal of muscle gain, I recommend focusing on progressive overload and ensuring you hit your protein target of 140g daily.'
            };
            setMessages(prev => [...prev, aiMsg]);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <Layout>
            <div className="chat-container">
                <div className="chat-window glass-panel">
                    <div className="chat-header">
                        <div className="ai-avatar">✨</div>
                        <div>
                            <h3>FitAI Assistant</h3>
                            <span className="status-online">Online</span>
                        </div>
                    </div>

                    <div className="messages-list">
                        {messages.map(msg => (
                            <div key={msg.id} className={`message-bubble ${msg.sender === 'user' ? 'user' : 'ai'}`}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input-area">
                        <input
                            type="text"
                            placeholder="Ask about workouts, nutrition..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <Button variant="primary" onClick={handleSend}>Send</Button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Chat;
