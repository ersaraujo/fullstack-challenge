import React, { useState } from 'react';

const ParticipantForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        participation: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ first_name: '', last_name: '', participation: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="participation"
                placeholder="Participation (%)"
                value={formData.participation}
                onChange={handleChange}
                min="0"
                max="100"
                required
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default ParticipantForm;