import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { getRandomAvatar, getRandomPostImage, formatRelativeTime } from '../utils/helpers';
import '../styles/PostCard.css';

const PostCard = ({ post, user, commentCount, isTrending }) => {
  return (
    <Card className="post-card mb-4">
      {isTrending && (
        <div className="trending-badge">
          <Badge bg="danger">Trending 🔥</Badge>
        </div>
      )}
      <Card.Img 
        variant="top" 
        src={getRandomPostImage(post.id)} 
        className="post-image" 
      />
      <Card.Body>
        <div className="post-header">
          <img 
            src={getRandomAvatar(user?.id)} 
            alt={`${user?.name || 'User'}'s avatar`} 
            className="post-user-avatar" 
          />
          <div>
            <h5 className="post-user-name">{user?.name || 'Anonymous'}</h5>
            <p className="post-time">{formatRelativeTime(post.createdAt)}</p>
          </div>
        </div>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
        <div className="post-footer">
          <Badge bg="info" className="comment-count">
            <i className="bi bi-chat-dots"></i> {commentCount} comments
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostCard;