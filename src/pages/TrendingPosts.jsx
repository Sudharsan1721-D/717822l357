import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import apiService from '../services/apiService';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        setLoading(true);
        
        // Fetch posts, comments, and users data
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
        
        // Calculate comment counts for each post
        const postCommentCounts = {};
        comments.forEach(comment => {
          postCommentCounts[comment.postId] = (postCommentCounts[comment.postId] || 0) + 1;
        });
        
        // Find the maximum comment count
        let maxCommentCount = 0;
        Object.values(postCommentCounts).forEach(count => {
          if (count > maxCommentCount) {
            maxCommentCount = count;
          }
        });
        
        // Find all posts with the maximum comment count
        const postsWithCommentCounts = posts.map(post => ({
          post,
          commentCount: postCommentCounts[post.id] || 0
        }));
        
        const trending = postsWithCommentCounts
          .filter(item => item.commentCount === maxCommentCount)
          .sort((a, b) => new Date(b.post.createdAt) - new Date(a.post.createdAt));
        
        setTrendingPosts(trending);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trending posts:', err);
        setError('Failed to load trending posts data');
        setLoading(false);
      }
    };
    
    fetchTrendingPosts();
    
    // Set up polling every 15 seconds
    const intervalId = setInterval(() => {
      apiService.invalidateCache('posts');
      apiService.invalidateCache('comments');
      fetchTrendingPosts();
    }, 15000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container>
      <Card className="page-header mb-4">
        <Card.Body>
          <h2>Trending Posts</h2>
          <p className="text-muted">Posts with the highest number of comments</p>
        </Card.Body>
      </Card>
      
      <Row>
        {trendingPosts.length > 0 ? (
          trendingPosts.map(item => (
            <Col lg={6} className="mb-4" key={item.post.id}>
              <PostCard 
                post={item.post} 
                user={userMap[item.post.userId]}
                commentCount={item.commentCount}
                isTrending={true}
              />
            </Col>
          ))
        ) : (
          <Col>
            <Card className="text-center p-5">
              <Card.Body>
                <h4>No trending posts found</h4>
                <p>Check back later for trending content</p>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default TrendingPosts;