import React from 'react';

function Message({ text, user }) {
  return (
    <div style={{ marginBottom: '10px' }}>
      <p><strong>{user}:</strong> {text}</p>
    </div>
  );
}

export default Message;
