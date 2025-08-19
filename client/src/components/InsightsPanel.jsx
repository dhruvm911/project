import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import styles from './styles.module.css';
import axios from 'axios';
import { UserContext } from '../context/userContext';

// Mock API endpoints for demonstration
const fetchOverview = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        posts: 42,
        users: 17,
        comments: 128,
        categories: [
          { name: 'Business', count: 12 },
          { name: 'Education', count: 8 },
          { name: 'Art', count: 7 },
          { name: 'Uncategorized', count: 15 },
        ],
      });
    }, 800);
  });
};

const fetchRecentPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { _id: '1', title: 'How to Grow Your Business', author: 'Jane Doe', category: 'Business', date: '2024-06-01', comments: 5, thumbnail: 'blog1.jpg' },
        { _id: '2', title: 'The Art of Painting', author: 'John Smith', category: 'Art', date: '2024-05-28', comments: 2, thumbnail: 'blog2.jpg' },
        { _id: '3', title: 'Education in 2024', author: 'Alice Lee', category: 'Education', date: '2024-05-25', comments: 8, thumbnail: 'blog3.jpg' },
      ]);
    }, 900);
  });
};

const fetchTopAuthors = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { _id: 'u1', name: 'Jane Doe', posts: 12, avatar: 'avatar1.jpg' },
        { _id: 'u2', name: 'John Smith', posts: 9, avatar: 'avatar2.jpg' },
        { _id: 'u3', name: 'Alice Lee', posts: 7, avatar: 'avatar3.jpg' },
      ]);
    }, 700);
  });
};

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const OverviewCard = ({ label, value }) => (
  <div className={styles.card}>
    <h4>{label}</h4>
    <p className={styles.value}>{value}</p>
  </div>
);

const RecentPostRow = ({ post }) => (
  <tr>
    <td><img src={require(`../assets/${post.thumbnail}`)} alt={post.title} style={{ width: 40, borderRadius: '0.3rem' }} /></td>
    <td>{post.title}</td>
    <td>{post.author}</td>
    <td>{post.category}</td>
    <td>{post.date}</td>
    <td>{post.comments}</td>
  </tr>
);

const AuthorCard = ({ author }) => (
  <div className={styles.author}>
    <div className={styles.author_avatar}>
      <img src={require(`../assets/${author.avatar}`)} alt={author.name} style={{ width: 50, borderRadius: '50%' }} />
    </div>
    <div className={styles.author_info}>
      <h4>{author.name}</h4>
      <p>{author.posts} posts</p>
    </div>
  </div>
);

const InsightsPanel = () => {
  const [overview, setOverview] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const { currentUser } = useContext(UserContext);
  const prevOverview = usePrevious(overview);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchOverview(), fetchRecentPosts(), fetchTopAuthors()])
      .then(([overviewData, postsData, authorsData]) => {
        setOverview(overviewData);
        setRecentPosts(postsData);
        setTopAuthors(authorsData);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load insights.');
        setLoading(false);
      });
  }, []);

  const filteredPosts = categoryFilter === 'All'
    ? recentPosts
    : recentPosts.filter(post => post.category === categoryFilter);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
  };

  return (
    <section className={styles.dashboard}>
      <div className={styles.container}>
        <h2>Insights Overview</h2>
        {loading && <div className={styles.loader}>Loading insights...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {overview && (
          <div className={styles.overviewGrid} style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
            <OverviewCard label="Total Posts" value={overview.posts} />
            <OverviewCard label="Total Users" value={overview.users} />
            <OverviewCard label="Total Comments" value={overview.comments} />
          </div>
        )}
        {overview && (
          <div style={{ marginBottom: 32 }}>
            <label htmlFor="categoryFilter">Filter by Category: </label>
            <select id="categoryFilter" value={categoryFilter} onChange={handleCategoryChange}>
              <option value="All">All</option>
              {overview.categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name} ({cat.count})</option>
              ))}
            </select>
          </div>
        )}
        <div style={{ marginBottom: 32 }}>
          <h3>Recent Posts</h3>
          <table className={styles.postsTable} style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Date</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map(post => (
                <tr key={post._id} onClick={() => handlePostClick(post)} style={{ cursor: 'pointer' }}>
                  <RecentPostRow post={post} />
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPosts.length === 0 && <p>No posts found for this category.</p>}
        </div>
        <div style={{ marginBottom: 32 }}>
          <h3>Top Authors</h3>
          <div className={styles.authors_container} style={{ display: 'flex', gap: 24 }}>
            {topAuthors.map(author => (
              <AuthorCard key={author._id} author={author} />
            ))}
          </div>
        </div>
        <footer className={styles.footer}>
          <span>
            Showing {filteredPosts.length} of {recentPosts.length} recent posts
          </span>
          {prevOverview && (
            <span className={styles.prevInfo}>
              Previous post count: {prevOverview.posts}
            </span>
          )}
        </footer>
      </div>
      {showModal && selectedPost && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h3>{selectedPost.title}</h3>
            <img src={require(`../assets/${selectedPost.thumbnail}`)} alt={selectedPost.title} style={{ width: '100%', borderRadius: 8, marginBottom: 16 }} />
            <p><strong>Author:</strong> {selectedPost.author}</p>
            <p><strong>Category:</strong> {selectedPost.category}</p>
            <p><strong>Date:</strong> {selectedPost.date}</p>
            <p><strong>Comments:</strong> {selectedPost.comments}</p>
            <button className={styles.btn} onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default InsightsPanel;
