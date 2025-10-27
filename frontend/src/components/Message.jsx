import React from 'react';
import { AlertMessage } from './ui/alert-message';

const Message = ({ message, type = 'success', onClose }) => {
  return <AlertMessage message={message} type={type} onClose={onClose} />;
};

export default Message;
