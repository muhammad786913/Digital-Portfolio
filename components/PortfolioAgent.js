'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Loader2,
  MessageSquare,
  Minimize2,
  Maximize2,
  RefreshCw,
  Zap
} from 'lucide-react';

// Custom GitHub SVG icon (removed from lucide-react v1+)
function GithubIcon({ size = 16, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ─── Simple Markdown Renderer ─────────────────────────────────────────────────
function MarkdownText({ text }) {
  const renderLine = (line, idx) => {
    // Heading 2
    if (line.startsWith('## ')) {
      return (
        <h3 key={idx} className="agent-heading">
          {renderInline(line.slice(3))}
        </h3>
      );
    }
    // Heading 3
    if (line.startsWith('### ')) {
      return (
        <h4 key={idx} className="agent-subheading">
          {renderInline(line.slice(4))}
        </h4>
      );
    }
    // Table header separator
    if (line.startsWith('|---')) return null;
    // Table row
    if (line.startsWith('|')) {
      const cells = line.split('|').filter(c => c.trim());
      const isHeader = !text.split('\n').slice(0, idx).some(l => l.startsWith('|---'));
      const Tag = (idx === text.split('\n').findIndex(l => l.startsWith('|'))) ? 'th' : 'td';
      return (
        <tr key={idx} className="agent-table-row">
          {cells.map((cell, ci) => (
            <Tag key={ci} className="agent-table-cell">{renderInline(cell.trim())}</Tag>
          ))}
        </tr>
      );
    }
    // Bullet
    if (line.startsWith('• ') || line.startsWith('- ')) {
      return (
        <li key={idx} className="agent-list-item">
          {renderInline(line.slice(2))}
        </li>
      );
    }
    // Empty line
    if (line.trim() === '') return <br key={idx} />;
    // Normal paragraph
    return <p key={idx} className="agent-paragraph">{renderInline(line)}</p>;
  };

  const renderInline = (text) => {
    const parts = [];
    let remaining = text;
    let key = 0;

    // Process bold (**text**), italic (*text*), and inline code (`code`)
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
      }
      const raw = match[0];
      if (raw.startsWith('**')) {
        parts.push(<strong key={key++} className="agent-bold">{raw.slice(2, -2)}</strong>);
      } else if (raw.startsWith('*')) {
        parts.push(<em key={key++} className="agent-italic">{raw.slice(1, -1)}</em>);
      } else if (raw.startsWith('`')) {
        parts.push(<code key={key++} className="agent-code">{raw.slice(1, -1)}</code>);
      }
      lastIndex = match.index + raw.length;
    }

    if (lastIndex < text.length) {
      parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : text;
  };

  const lines = text.split('\n');

  // Group table rows
  const elements = [];
  let tableBuffer = [];
  let listBuffer = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('|')) {
      inTable = true;
      if (!line.startsWith('|---')) tableBuffer.push(line);
    } else {
      if (inTable) {
        elements.push(
          <table key={`table-${i}`} className="agent-table">
            <tbody>
              {tableBuffer.map((tl, ti) => {
                const cells = tl.split('|').filter(c => c.trim());
                const isFirst = ti === 0;
                return (
                  <tr key={ti} className={`agent-table-row ${isFirst ? 'agent-table-header-row' : ''}`}>
                    {cells.map((cell, ci) => (
                      isFirst
                        ? <th key={ci} className="agent-table-header-cell">{renderInline(cell.trim())}</th>
                        : <td key={ci} className="agent-table-cell">{renderInline(cell.trim())}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
        tableBuffer = [];
        inTable = false;
      }

      if (line.startsWith('• ') || line.startsWith('- ')) {
        listBuffer.push(line);
      } else {
        if (listBuffer.length > 0) {
          elements.push(
            <ul key={`list-${i}`} className="agent-list">
              {listBuffer.map((ll, li) => (
                <li key={li} className="agent-list-item">
                  {renderInline(ll.slice(2))}
                </li>
              ))}
            </ul>
          );
          listBuffer = [];
        }
        elements.push(renderLine(line, i));
      }
    }
  }

  // Flush remaining buffers
  if (listBuffer.length > 0) {
    elements.push(
      <ul key="list-final" className="agent-list">
        {listBuffer.map((ll, li) => (
          <li key={li} className="agent-list-item">{renderInline(ll.slice(2))}</li>
        ))}
      </ul>
    );
  }
  if (tableBuffer.length > 0) {
    elements.push(
      <table key="table-final" className="agent-table">
        <tbody>
          {tableBuffer.map((tl, ti) => {
            const cells = tl.split('|').filter(c => c.trim());
            return (
              <tr key={ti} className={`agent-table-row ${ti === 0 ? 'agent-table-header-row' : ''}`}>
                {cells.map((cell, ci) => (
                  ti === 0
                    ? <th key={ci} className="agent-table-header-cell">{renderInline(cell.trim())}</th>
                    : <td key={ci} className="agent-table-cell">{renderInline(cell.trim())}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return <div className="agent-message-content">{elements}</div>;
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="agent-typing-indicator">
      <div className="agent-avatar-sm">
        <Bot size={14} />
      </div>
      <div className="agent-typing-bubbles">
        <span className="agent-typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="agent-typing-dot" style={{ animationDelay: '180ms' }} />
        <span className="agent-typing-dot" style={{ animationDelay: '360ms' }} />
      </div>
    </div>
  );
}

// ─── Message Component ────────────────────────────────────────────────────────
function Message({ msg }) {
  const isUser = msg.role === 'user';

  return (
    <div className={`agent-message-wrapper ${isUser ? 'agent-message-user' : 'agent-message-bot'}`}>
      {!isUser && (
        <div className="agent-avatar-sm">
          <Bot size={14} />
        </div>
      )}
      <div className={`agent-bubble ${isUser ? 'agent-bubble-user' : 'agent-bubble-bot'}`}>
        {isUser ? (
          <p className="agent-user-text">{msg.content}</p>
        ) : (
          <MarkdownText text={msg.content} />
        )}

        {/* Action Links */}
        {msg.links && msg.links.length > 0 && (
          <div className="agent-links-container">
            {msg.links.map((link, i) => {
              const isGithub = link.url.includes('github.com');
              const isExternal = link.url.startsWith('http');
              return (
                <a
                  key={i}
                  href={link.url}
                  target={isExternal ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="agent-link-chip"
                >
                  {isGithub ? <GithubIcon size={12} /> : <ExternalLink size={12} />}
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </div>
      {isUser && (
        <div className="agent-user-avatar">
          <span>U</span>
        </div>
      )}
    </div>
  );
}

// ─── Suggestion Pills ─────────────────────────────────────────────────────────
function SuggestionPills({ suggestions, onSelect }) {
  if (!suggestions || suggestions.length === 0) return null;
  return (
    <div className="agent-suggestions">
      {suggestions.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(s)}
          className="agent-suggestion-pill"
        >
          <ChevronRight size={11} className="agent-suggestion-icon" />
          {s}
        </button>
      ))}
    </div>
  );
}

// ─── Main Portfolio Agent Component ───────────────────────────────────────────
export default function PortfolioAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: `👋 Hey! I'm **MBR Agent** — your guide to **Muhammad bin Rashid's** portfolio.\n\nAsk me anything about his skills, projects, experience, or GitHub! I can also search his GitHub profile for you.\n\nWhat would you like to know? 🚀`,
      links: [],
      suggestions: ["What are his skills?", "Show me his projects", "Search GitHub profile", "How do I hire him?"]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setShowPulse(false);
    }
  }, [isOpen]);

  const handleSend = useCallback(async (messageText) => {
    const text = (messageText || input).trim();
    if (!text || isLoading) return;

    setInput('');
    const userMsg = { id: Date.now(), role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (!res.ok) throw new Error('Agent request failed');
      const data = await res.json();

      const botMsg = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.text || 'I had trouble with that. Could you rephrase?',
        links: data.links || [],
        suggestions: data.suggestions || []
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: `⚠️ I encountered an issue. Please try again in a moment!\n\nOr contact Muhammad directly at **muhammadrashid786114786@gmail.com**`,
        links: [{ label: "Send Email", url: "mailto:muhammadrashid786114786@gmail.com" }],
        suggestions: ["Try again", "What are his skills?", "Show projects"]
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([{
      id: 'welcome-reset',
      role: 'assistant',
      content: `♻️ Chat reset! Ask me anything about **Muhammad bin Rashid** — skills, projects, GitHub, services, or contact info!`,
      links: [],
      suggestions: ["What are his skills?", "Show me his projects", "Search GitHub profile", "How do I hire him?"]
    }]);
  };

  const lastBotMessage = [...messages].reverse().find(m => m.role === 'assistant');

  return (
    <>
      {/* ── Floating Toggle Button ── */}
      {!isOpen && (
        <button
          id="portfolio-agent-toggle"
          onClick={() => setIsOpen(true)}
          className="agent-fab"
          aria-label="Open Portfolio Agent"
        >
          {showPulse && <span className="agent-fab-pulse" />}
          <Bot size={24} className="agent-fab-icon" />
          <span className="agent-fab-label">Ask MBR Agent</span>
        </button>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          id="portfolio-agent-window"
          className={`agent-window ${isExpanded ? 'agent-window-expanded' : ''}`}
        >
          {/* Header */}
          <div className="agent-header">
            <div className="agent-header-left">
              <div className="agent-header-avatar">
                <Bot size={18} />
                <span className="agent-status-dot" />
              </div>
              <div className="agent-header-info">
                <span className="agent-header-name">MBR Agent</span>
                <span className="agent-header-status">
                  <Zap size={10} /> Online · Powered by Portfolio AI
                </span>
              </div>
            </div>
            <div className="agent-header-actions">
              <button
                onClick={handleReset}
                className="agent-header-btn"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RefreshCw size={15} />
              </button>
              <button
                onClick={() => setIsExpanded(p => !p)}
                className="agent-header-btn"
                title={isExpanded ? 'Minimize' : 'Expand'}
                aria-label={isExpanded ? 'Minimize' : 'Expand'}
              >
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="agent-header-btn agent-header-btn-close"
                title="Close"
                aria-label="Close agent"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* GitHub Quick Link Banner */}
          <div className="agent-github-banner">
            <GithubIcon size={13} />
            <span>GitHub:</span>
            <a
              href="https://github.com/muhammad786913"
              target="_blank"
              rel="noopener noreferrer"
              className="agent-github-link"
            >
              @muhammad786913
            </a>
            <ExternalLink size={11} className="agent-github-ext" />
          </div>

          {/* Messages Area */}
          <div ref={chatContainerRef} className="agent-messages" id="agent-messages-area">
            {messages.map((msg) => (
              <Message key={msg.id} msg={msg} />
            ))}

            {isLoading && <TypingIndicator />}

            {/* Suggestion Pills from latest bot message */}
            {!isLoading && lastBotMessage?.suggestions?.length > 0 && (
              <SuggestionPills
                suggestions={lastBotMessage.suggestions}
                onSelect={(s) => handleSend(s)}
              />
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="agent-input-area">
            <div className="agent-input-wrapper">
              <MessageSquare size={15} className="agent-input-icon" />
              <input
                ref={inputRef}
                id="agent-message-input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about skills, projects, GitHub..."
                className="agent-input"
                disabled={isLoading}
                maxLength={300}
                autoComplete="off"
              />
              <button
                id="agent-send-btn"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="agent-send-btn"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 size={16} className="agent-send-loading" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </div>
            <p className="agent-footer-text">
              <Sparkles size={10} /> Portfolio AI · Muhammad bin Rashid © 2024
            </p>
          </div>
        </div>
      )}
    </>
  );
}
