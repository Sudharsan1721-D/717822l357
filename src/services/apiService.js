import axios from 'axios';

const apiService = {
  baseUrl: 'http://localhost:3000/api',
  
  cache: {
    users: null,
    posts: null,
    comments: null,
    lastFetchTime: {
      users: null,
      posts: null,
      comments: null
    }
  },
  

  cacheExpirationTime: {
    users: 60000,
    posts: 5000,   
    comments: 10000 
  },
  
  isCacheValid(type) {
    const lastFetch = this.cache.lastFetchTime[type];
    return lastFetch && (Date.now() - lastFetch) < this.cacheExpirationTime[type];
  },
  

  async getUsers() {
    if (this.isCacheValid('users') && this.cache.users) {
      return this.cache.users;
    }
    
    try {
      const response = await axios.get(`${this.baseUrl}/users`);
      this.cache.users = response.data;
      this.cache.lastFetchTime.users = Date.now();
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
  

  async getPosts() {
    if (this.isCacheValid('posts') && this.cache.posts) {
      return this.cache.posts;
    }
    
    try {
      const response = await axios.get(`${this.baseUrl}/posts`);
      this.cache.posts = response.data;
      this.cache.lastFetchTime.posts = Date.now();
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  
   async getComments() {
    if (this.isCacheValid('comments') && this.cache.comments) {
      return this.cache.comments;
    }
    
    try {
      const response = await axios.get(`${this.baseUrl}/comments`);
      this.cache.comments = response.data;
      this.cache.lastFetchTime.comments = Date.now();
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },
  invalidateCache(type) {
    this.cache.lastFetchTime[type] = null;
  }
};

export default apiService;