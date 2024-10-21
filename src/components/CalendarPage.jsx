import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './CalendarPage.css'; // Import custom CSS for the Calendar page
import backgroundImage from '../assets/4.webp'; // Import the image

const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [eventDescription, setEventDescription] = useState('');
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem('events');
        return savedEvents ? JSON.parse(savedEvents) : [];
    });
    const [showAllEvents, setShowAllEvents] = useState(false);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const handleAddEvent = (e) => {
        e.preventDefault();
        const newEvent = {
            date: selectedDate.toDateString(),
            description: eventDescription,
            id: Date.now(), // Unique ID for each event
            color: `hsl(${Math.random() * 360}, 70%, 70%)` // Random color for each event
        };
        setEvents([...events, newEvent]);
        setEventDescription('');
    };

    const handleDeleteEvent = (eventToDelete) => {
        setEvents(events.filter(event => event.id !== eventToDelete.id));
    };

    const handleEditEvent = (eventToEdit, newDescription) => {
        const updatedEvents = events.map(event =>
            event.id === eventToEdit.id ? { ...event, description: newDescription } : event
        );
        setEvents(updatedEvents);
    };

    const markedDates = events.map(event => new Date(event.date));

    const handleShowAllEvents = () => {
        setShowAllEvents(!showAllEvents); // Toggle showing all events
    };

    return (
        <div className="calendar-page" style={{
            backgroundImage: `url(${backgroundImage})`, // Use the imported image
            backgroundSize: 'cover', // Ensure the image covers the entire area
            backgroundPosition: 'center', // Center the background image
            minHeight: '100vh', // Set minimum height
            display: 'flex', // Flexbox for centering
            flexDirection: 'column', // Stack elements vertically
            alignItems: 'center', // Center align content
            padding: '20px', // Add some padding
            color: '#333' // Text color
        }}>
            <h1 className="calendar-header">Event Calendar</h1>
            <div className="calendar-container">
                <Calendar
                    onClickDay={handleDateClick}
                    value={selectedDate}
                    tileClassName={({ date }) => 
                        markedDates.some(markedDate => 
                            markedDate.toDateString() === date.toDateString()) ? 'event-marked' : ''
                        }
                />
            </div>

            <form className="event-form" onSubmit={handleAddEvent}>
                <h2>Add Event for {selectedDate.toDateString()}</h2>
                <textarea
                    placeholder="Event description..."
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    required
                />
                <button type="submit">Add Event</button>
            </form>

            <button onClick={handleShowAllEvents}>
                {showAllEvents ? 'Hide All Events' : 'Show All Events'}
            </button>

            <div className={`event-list ${showAllEvents ? 'show' : ''}`}>
                <h2>Events</h2>
                {showAllEvents ? (
                    <div className="event-gallery">
                        {events.map(event => (
                            <div key={event.id} className="event-card" style={{ backgroundColor: event.color }}>
                                <p><strong>{event.date}:</strong> {event.description}</p>
                                <button onClick={() => handleDeleteEvent(event)}>Delete</button>
                                <button
                                    onClick={() => {
                                        const newDescription = prompt('Edit your event:', event.description);
                                        if (newDescription) handleEditEvent(event, newDescription);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    events
                        .filter(event => event.date === selectedDate.toDateString())
                        .map((event) => (
                            <div key={event.id} className="event-card" style={{ backgroundColor: event.color }}>
                                <p><strong>{event.date}:</strong> {event.description}</p>
                                <button onClick={() => handleDeleteEvent(event)}>Delete</button>
                                <button
                                    onClick={() => {
                                        const newDescription = prompt('Edit your event:', event.description);
                                        if (newDescription) handleEditEvent(event, newDescription);
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        ))
                )}
            </div>
        </div>
    );
};

export default CalendarPage;
