import React, { useState, useRef, useEffect } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import { aiService } from '../services/api';
import './ChatData.css';

const Chat = () => {
    const { user, today } = useApp();
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: `Hello ${user.name || 'Friend'}! I am FitAI. Ask me about your progress today!` }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Call Backend API
        try {
            const aiResponse = await aiService.sendMessage(input);
            const aiMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: aiResponse.content
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            const errorMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: "I'm having trouble connecting to my brain right now. Please try again later."
            };
            setMessages(prev => [...prev, errorMsg]);
        }
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
                            <span className="status-online">Online • Context Aware</span>
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
                            placeholder="Ask: 'How is my hydration?' or 'Did I workout?'"
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
