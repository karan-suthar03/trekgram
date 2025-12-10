import { useState, useEffect } from 'react';
import { PlusSquare, User, Heart, MessageCircle, MapPin, Mountain } from 'lucide-react';
import './App.css';

// Placeholder Data
const CITIES = ['Mumbai', 'Pune', 'Nashik', 'Bangalore', 'Manali'];

const TREKS_BY_CITY = {
  'Mumbai': ['Karnala Fort', 'Prabalmachi', 'Mahuli'],
  'Pune': ['Sinhagad', 'Rajgad', 'Torna'],
  'Nashik': ['Kalsubai', 'Harihar Fort', 'Brahmagiri'],
  'Bangalore': ['Nandi Hills', 'Skandagiri', 'Savandurga'],
  'Manali': ['Hampta Pass', 'Beas Kund', 'Bhrigu Lake']
};

const POSTS = [
  {
    id: 1,
    user: 'trekker_joy',
    city: 'Pune',
    trek: 'Sinhagad',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1000&auto=format&fit=crop',
    caption: 'Beautiful sunrise at Sinhagad! 🌄 #trekking #pune',
    likes: 120,
    comments: 45
  },
  {
    id: 2,
    user: 'mountain_lover',
    city: 'Manali',
    trek: 'Hampta Pass',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop',
    caption: 'Snowy trails of Hampta Pass. Cold but worth it. ❄️',
    likes: 340,
    comments: 89
  },
  {
    id: 3,
    user: 'weekend_wanderer',
    city: 'Mumbai',
    trek: 'Karnala Fort',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1000&auto=format&fit=crop',
    caption: 'Quick weekend getaway to Karnala. The bird sanctuary is amazing.',
    likes: 85,
    comments: 12
  },
  {
    id: 4,
    user: 'nature_seeker',
    city: 'Bangalore',
    trek: 'Nandi Hills',
    image: 'https://images.unsplash.com/photo-1571407970349-bc16e6961601?q=80&w=1000&auto=format&fit=crop',
    caption: 'Cloudy morning at Nandi Hills. ☁️',
    likes: 210,
    comments: 30
  }
];

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [showCityPrompt, setShowCityPrompt] = useState(true);
  const [activeTab, setActiveTab] = useState('city'); // 'city' or 'trek'

  useEffect(() => {
    // Check if user has already selected a city (simulated with state for now)
    if (selectedCity) {
      setShowCityPrompt(false);
    }
  }, [selectedCity]);

  function handleCitySelect(city){
    setSelectedCity(city);
    setShowCityPrompt(false);
  };

  const filteredPosts = POSTS.filter(post => {
    if (!selectedCity) return true;
    // For this demo, both tabs filter by city, but 'trek' tab could be more specific in a real app
    // The requirement says "viewing city-specific posts and one for viewing trek-specific posts"
    // We'll just show all posts for the selected city for now as the data is limited
    return post.city === selectedCity;
  });

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <button className="icon-btn"><PlusSquare size={24} /></button>
        <h1 className="app-title">TrekGram</h1>
        <button className="icon-btn"><User size={24} /></button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* City Selection & Trek List */}
        <div className="controls-section">
          <div className="city-selector">
            <MapPin size={16} className="input-icon" />
            <select
              value={selectedCity}
              onChange={(e) => handleCitySelect(e.target.value)}
              className="city-dropdown"
            >
              <option value="" disabled>Select a City</option>
              {CITIES.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          {selectedCity && (
            <div className="available-treks">
              <h3>Available Treks in {selectedCity}</h3>
              <div className="treks-list">
                {TREKS_BY_CITY[selectedCity]?.map(trek => (
                  <span key={trek} className="trek-tag">{trek}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Feed */}
        <div className="feed">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="user-avatar"></div>
                  <span className="username">{post.user}</span>
                  <span className="post-location">• {post.trek}</span>
                </div>
                <div className="post-image-container">
                  <img src={post.image} alt={post.caption} className="post-image" />
                </div>
                <div className="post-actions">
                  <button className="action-btn"><Heart size={24} /></button>
                  <button className="action-btn"><MessageCircle size={24} /></button>
                </div>
                <div className="post-content">
                  <p className="likes-count">{post.likes} likes</p>
                  <p className="caption">
                    <span className="username">{post.user}</span> {post.caption}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p>No posts found for {selectedCity}. Select another city or check back later!</p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <button
          className={`nav-btn ${activeTab === 'city' ? 'active' : ''}`}
          onClick={() => setActiveTab('city')}
        >
          <MapPin size={20} />
          <span>City Posts</span>
        </button>
        <button
          className={`nav-btn ${activeTab === 'trek' ? 'active' : ''}`}
          onClick={() => setActiveTab('trek')}
        >
          <Mountain size={20} />
          <span>Trek Posts</span>
        </button>
      </nav>

      {
        console.log(selectedCity)
      }

      {/* First Time City Selection Modal */}
      {showCityPrompt && !selectedCity && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Welcome to TrekGram! 🏔️</h2>
            <p>Please select your city to get started.</p>
            <div className="modal-cities">
              {CITIES.map(city => (
                <button
                  key={city}
                  className="modal-city-btn"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
