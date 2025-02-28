import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Legend from './components/Legend';
import PieChartComponent from './components/PieChart';
import ParticipantsTable from './components/ParticipantsTable';
import ParticipantForm from './components/ParticipantForm';

// Página inicial com o botão "Criar Evento"
function HomePage({ onCreateEvent }) {
  return (
    <div className="home">
      <button onClick={onCreateEvent}>Criar Evento</button>
    </div>
  );
}

function EventPage({ eventId }) {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if(eventId){
      fetchParticipants();
    }
  }, [eventId]);

  const fetchParticipants = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/events/${eventId}/participants/`);
      setParticipants(response.data);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  const handleAddParticipant = async (formData) => {
    try {
      await axios.post(`http://localhost:8000/api/events/${eventId}/participants/`, formData);
      fetchParticipants();
    } catch (error) {
      console.error('Error adding participant:', error);
    }
  };

  return (
    <div className="container">
      <ParticipantForm onSubmit={handleAddParticipant} />
      <div className="title">
        <h1>Participant Poll</h1>
        <h2>{participants.length} pessoa(s) contribuíram</h2>
      </div>
      <div className="content">
        <ParticipantsTable participants={participants} />
        <PieChartComponent participants={participants} />
        <Legend participants={participants} />
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();

  const handleCreateEvent = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/events/');
      const eventId = response.data.id;
      navigate(`/${eventId}`);
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage onCreateEvent={handleCreateEvent} />} />
      <Route path="/:eventId" element={<EventPage />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}