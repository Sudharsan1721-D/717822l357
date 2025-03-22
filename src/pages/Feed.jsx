import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import apiService from '../services/apiService';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userMap, setUserMap] = useState({});
  const [commentCountMap, setCommentCountMap] = useState({});

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const [posts, comments, users] = await Promise.all([
          apiService.getPosts(),
          apiService.getComments(),
          apiService.getUsers()
        ]);
        
        // Create user map for quick lookup
        const usersById = {};
        users.forEach(user => {
          usersById[user.id] = user;
        });
        setUserMap(usersById);
        
        const postCommentCounts = {};
        comments.forEach(comment => {
          postCommentCounts[comment.postId] = (postCommentCounts[comment.postId] || 0) + 1;
        });
        setCommentCountMap(postCommentCounts);
    
        const sortedPosts = [...posts].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        setPosts(sortedPosts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching feed:', err);
        setError('Failed to load feed data');
        setLoading(false);
      }
    };
    
    fetchFeed();
    const intervalId = setInterval(() => {
      apiService.invalidateCache('posts');
      apiService.invalidateCache('comments');
      fetchFeed();
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading && posts.length === 0) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container>
      <Card className="page-header mb-4">
        <Card.Body>
          <h2>Real-time Feed</h2>
          <p className="text-muted">Latest posts from all users (refreshes automatically)</p>
        </Card.Body>
      </Card>
      
      {loading && <div className="text-center mb-3">Refreshing feed...</div>}
      
      <Row className="feed-container">
        {posts.map(post => (
          <Col lg={6} className="mb-4" key={post.id}>
            <PostCard 
              post={post} 
              user={userMap[post.userId]}
              commentCount={commentCountMap[post.id] || 0}
              isTrending={false}
            />
          </Col>
        ))}
        
        {posts.length === 0 && !loading && (
          <Col>
            <Card className="text-center p-5">
              <Card.Body>
                <h4>No posts found</h4>
                <p>Check back later for new content</p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Feed;