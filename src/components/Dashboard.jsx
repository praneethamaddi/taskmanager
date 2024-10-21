import React from 'react';
import './Dashboard.css'; // Import the CSS file for styling
import backgroundImage from '../assets/2.jpg'; // Import the background image

const Dashboard = () => {
  return (
    <div 
      className="dashboard" 
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Apply the background image
    >
      <div className="content-box">
        <h1>Welcome to Your Task Manager</h1>
        <p>
          This application allows you to efficiently manage your tasks, organize your calendar, and take notes seamlessly. Stay productive and on top of your commitments!
        </p>
      </div>

      <div className="overview-box">
        <h2>Project Overview</h2>
        <p>The Task Manager Application is designed to help users:</p>
        <ul>
          <li><strong>Manage Tasks:</strong> Create, edit, and organize your tasks effortlessly.</li>
          <li><strong>Utilize Calendar:</strong> Keep track of your events and deadlines.</li>
          <li><strong>Take Notes:</strong> Use the notepad to jot down important ideas and reminders.</li>
          <li><strong>Customize Your Experience:</strong> Personalize your settings for a tailored workflow.</li>
        </ul>
      </div>

      <div className="pages-box">
        <h2>Pages in the Application</h2>
        <ul>
          <li><strong>Task Manager:</strong> Overview of your tasks and navigation to different features.</li>
          <li><strong>Calendar:</strong> Manage and view your events in a user-friendly calendar interface.</li>
          <li><strong>Notepad:</strong> A rich text editor for notes using local storage.</li>
        </ul>
      </div>

      <div className="quotes-container">
        <div className="quote-card" style={{ backgroundColor: '#FFB6C1' }}>
          "The secret to getting ahead is getting started."
        </div>
        <div className="quote-card" style={{ backgroundColor: '#FFD700' }}>
          "Success is the sum of small efforts, repeated day in and day out."
        </div>
        <div className="quote-card" style={{ backgroundColor: '#90EE90' }}>
          "Don't watch the clock; do what it does. Keep going."
        </div>
        <div className="quote-card" style={{ backgroundColor: '#87CEEB' }}>
          "You don’t have to be great to start, but you have to start to be great."
        </div>
        <div className="quote-card" style={{ backgroundColor: '#FF7F50' }}>
          "The future depends on what you do today."
        </div>
      </div>

      {/* Add the footer at the bottom */}
      <div className="footer">
        <div className="footer-column">
          <h3>Get to Know Us</h3>
          <ul>
            <li><a href="#">Careers</a></li>
            <li><a href="#">About Task Manager</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Task Manager Devices</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Make Money with Us</h3>
          <ul>
            <li><a href="#">Manage on Task Manager</a></li>
            <li><a href="#">Manage on Task Manager Business</a></li>
            <li><a href="#">Manage Your Apps on Task Manager</a></li>
            <li><a href="#">Become an Affiliate</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Task Manager Tracks</h3>
          <ul>
            <li><a href="#">Task Manager Rewards Visa</a></li>
            <li><a href="#">Task Manager Store Card</a></li>
            <li><a href="#">Credit Card Marketplace</a></li>
            <li><a href="#">Reload Your Balance</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Let Us Help You</h3>
          <ul>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Task Manager Tracks</a></li>
            <li><a href="#">Task Manager Trip Costs</a></li>
            <li><a href="#">Task Manager Prime</a></li>
          </ul>
        </div>
        <div className="footer-bottom">
          <div>Task Manager &copy; 2024</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
