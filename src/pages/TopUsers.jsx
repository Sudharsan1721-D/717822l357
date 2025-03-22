import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import UserCard from '../components/UserCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import apiService from '../services/apiService';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        setLoading(true);
        const [users, posts] = await Promise.all([
          apiService.getUsers(),
          apiService.getPosts()
        ]);
        
        const userPostCounts = {};
        posts.forEach(post => {
          userPostCounts[post.userId] = (userPostCounts[post.userId] || 0) + 1;
        });
        
        // Combine user data with post counts
        const usersWithPostCounts = users.map(user => ({
          user,
          postCount: userPostCounts[user.id] || 0
        }));
        
        const sortedUsers = usersWithPostCounts
          .sort((a, b) => b.postCount - a.postCount)
          .slice(0, 5);
        
        setTopUsers(sortedUsers);
        setLoading(false);
      } catch (err) {
        console.fetch('Error fetching top users:', err);
        setError('Failed to load top users data');
        setLoading(false);
      }
    };
    
    fetchTopUsers();
    const intervalId = setInterval(() => {
      apiService.invalidateCache('users');
      apiService.invalidateCache('posts');
      fetchTopUsers();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container>
      <Card className="page-header mb-4">
        <Card.Body>
          <h2>Top Users</h2>
          <p className="text-muted">Users with the highest number of posts</p>
        </Card.Body>
      </Card>
      
      <Row>
        <Col md={8} className="mx-auto">
          {topUsers.map((item, index) => (
            <UserCard 
              key={item.user.id} 
              user={item.user} 
              postCount={item.postCount} 
              rank={index + 1} 
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default TopUsers;