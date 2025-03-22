import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage = ({ message }) => {
  return (
    <Alert variant="danger">
      <Alert.Heading>Error!</Alert.Heading>
      <p>
        {message || 'Something went wrong. Please try again later.'}
      </p>
    </Alert>
  );
};

export default ErrorMessage;