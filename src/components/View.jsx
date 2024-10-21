import React from 'react';
import Card from './Card';

const View = ({ entries }) => {
    return (
        <div>
            <h2>Your Entries</h2>
            {entries.length === 0 ? (
                <p>No entries yet.</p>
            ) : (
                entries.map((entry, index) => <Card key={index} entry={entry} />)
            )}
        </div>
    );
};

export default View;
