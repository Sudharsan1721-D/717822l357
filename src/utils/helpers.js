// Generate random avatar image URLs
export const getRandomAvatar = (userId) => {
    const seed = userId || Math.floor(Math.random() * 1000);
    return `https://avatars.dicebear.com/api/human/${seed}.svg`;
  };
  
  // Generate random post images
  export const getRandomPostImage = (postId) => {
    const imageTypes = ['nature', 'city', 'technology', 'food', 'abstract'];
    const type = imageTypes[Math.floor(Math.random() * imageTypes.length)];
    const seed = postId || Math.floor(Math.random() * 1000);
    return `https://source.unsplash.com/300x200/?${type}&sig=${seed}`;
  };
  
  // Format date to relative time (e.g., "2 hours ago")
  export const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };
  
  // Calculate post metrics (for potential future use)
  export const calculatePostEngagement = (post, comments) => {
    const postComments = comments.filter(comment => comment.postId === post.id);
    return {
      commentCount: postComments.length,
      // Additional metrics could be calculated here
    };
  };