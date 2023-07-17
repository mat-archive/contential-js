import { Message, getClient } from '@contential/chat';
import { useCallback, useState } from 'react';

const client = getClient();

export default function Home() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const test = useCallback(() => {
    client.chat({
      chatSessionId: '',
      messageUserId: '',
      text,
      onUpdate: ({ messages }) => {
        setMessages(messages);
      },
    });

    setText('');
  }, [text]);

  return (
    <main className="w-screen p-20">
      <form
        className="w-full m-auto max-w-2xl"
        onSubmit={(event) => {
          event.preventDefault();
          test();
        }}
      >
        <input
          className="input input-bordered w-full"
          type="text"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          autoFocus
        />
      </form>

      <div className="w-full m-auto max-w-2xl mt-20">
        <div className="grid gap-4">
          {messages.map((message) => (
            <div key={message.id}>{message.text}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
