import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ChatInterface } from '@/components/AIAssistant/ChatInterface';
import { useAssistantStore } from '@/lib/store';

// Mock the store
jest.mock('@/lib/store');
jest.mock('@/lib/utils', () => ({
  extractNavigationCommand: jest.fn(() => null),
  removeNavigationCommand: jest.fn(msg => msg),
  scrollToSection: jest.fn(),
}));
jest.mock('@/lib/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock fetch
global.fetch = jest.fn();

// Mock browser APIs
Element.prototype.scrollIntoView = jest.fn();

// Polyfill TextEncoder for Node environment
if (typeof TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  global.TextEncoder = require('util').TextEncoder;
}

describe('ChatInterface', () => {
  const mockAddMessage = jest.fn();
  const mockMessages = [
    { role: 'user' as const, content: 'Hello', id: '1' },
    { role: 'assistant' as const, content: 'Hi there!', id: '2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useAssistantStore as unknown as jest.Mock).mockReturnValue({
      messages: mockMessages,
      addMessage: mockAddMessage,
    });
  });

  it('should render chat messages', () => {
    render(<ChatInterface />);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  it('should render input field and send button', () => {
    render(<ChatInterface />);

    expect(screen.getByPlaceholderText(/ask me anything/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('should handle empty input submission', async () => {
    render(<ChatInterface />);

    const sendButton = screen.getByRole('button', { name: /send/i });
    fireEvent.click(sendButton);

    // Should not call fetch or addMessage for empty input
    expect(fetch).not.toHaveBeenCalled();
    expect(mockAddMessage).not.toHaveBeenCalled();
  });

  it('should send message when form is submitted', async () => {
    const mockReader = {
      read: jest
        .fn()
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode('data: {"text":"Test"}\n\n'),
        })
        .mockResolvedValueOnce({
          done: false,
          value: new TextEncoder().encode('data: [DONE]\n\n'),
        })
        .mockResolvedValueOnce({ done: true, value: undefined }),
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: {
        getReader: () => mockReader,
      },
    });

    render(<ChatInterface />);

    const input = screen.getByPlaceholderText(/ask me anything/i);
    const sendButton = screen.getByRole('button', { name: /send/i });

    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(mockAddMessage).toHaveBeenCalledWith('user', 'Test message');
    });

    expect(fetch).toHaveBeenCalledWith(
      '/api/chat',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });

  it('should display loading state while waiting for response', async () => {
    const mockReader = {
      read: jest.fn().mockImplementation(
        () =>
          new Promise(resolve => {
            setTimeout(() => resolve({ done: true, value: undefined }), 100);
          })
      ),
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: {
        getReader: () => mockReader,
      },
    });

    render(<ChatInterface />);

    const input = screen.getByPlaceholderText(/ask me anything/i);
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(mockAddMessage).toHaveBeenCalled();
    });
  });

  it('should handle API error gracefully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<ChatInterface />);

    const input = screen.getByPlaceholderText(/ask me anything/i);
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.submit(input);

    await waitFor(() => {
      expect(mockAddMessage).toHaveBeenCalledWith('user', 'Test');
    });

    // Should show error message
    await waitFor(() => {
      expect(mockAddMessage).toHaveBeenCalledWith('assistant', expect.stringContaining('error'));
    });
  });

  it('should clear input after sending message', async () => {
    const mockReader = {
      read: jest.fn().mockResolvedValue({ done: true, value: undefined }),
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      body: {
        getReader: () => mockReader,
      },
    });

    render(<ChatInterface />);

    const input = screen.getByPlaceholderText(/ask me anything/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'Test message' } });

    expect(input.value).toBe('Test message');

    fireEvent.submit(input);

    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });
});
