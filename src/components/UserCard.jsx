import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { getRandomAvatar } from '../utils/helpers';
import '../styles/UserCard.css';

const UserCard = ({ user, postCount, rank }) => {
  return (
    <Card className="user-card mb-3">
      <Card.Body className="d-flex align-items-center">
        <div className="rank-badge">{rank}</div>
        <div className="user-avatar">
          <img src={getRandomAvatar(user.id)} alt={`${user.name}'s avatar`} />
        </div>
        <div className="user-info">
          <Card.Title>{user.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
          <Card.Text>
            <Badge bg="primary" className="post-count-badge">
              {postCount} Posts
            </Badge>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserCard;