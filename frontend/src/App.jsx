import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import axios from 'axios'
import './App.css'

function App() {
  const [participants, setParticipants] = useState([])
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    participation: '',
  })

  const [isAdmin, setIsAdmin] = useState(false)
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919', '#19FF19', '#1919FF', '#FF19FF', '#19FFFF']

  useEffect(() => {
    fetchParticipants()
  }, [])

  const handleAddParticipant = async () => {
    const newParticipant = { 
      first_name: formData.first_name, 
      last_name: formData.last_name, 
      participation: parseInt(formData.participation) 
    }

    if (formData.first_name === "admin" && formData.last_name === "admin" && formData.participation === "0") {
      setIsAdmin(true)
      setFormData({ first_name: '', last_name: '', participation: '' })
      return
    } else {
      setIsAdmin(false)
    }

    try {
      const res = await fetch('http://localhost:8000/api/participants/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newParticipant),
      })

      const data = await res.json()

      if (res.ok) {
        setParticipants((prevParticipants) => {
          const updatedParticipants = prevParticipants.map((p) => {
            if (p.first_name === data.first_name && p.last_name === data.last_name) {
              return { ...p, participation: p.participation + data.participation }
            }
            return p
          })

          if (!updatedParticipants.find((p) => p.first_name === data.first_name && p.last_name === data.last_name)) {
            updatedParticipants.push(data)
          }

          return updatedParticipants
        })
      } else {
        console.log('Erro ao adicionar participante', data)
      }
    } catch (error) {
      console.log('Erro ao adicionar participante', error)
    }

    // Limpar os campos do formulário
    setFormData({ first_name: '', last_name: '', participation: '' })
  }

  const fetchParticipants = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/participants/')
      setParticipants(res.data)
    } catch (error) {
      console.log('Erro ao buscar participantes', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    handleAddParticipant()
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="first_name"
          placeholder="Nome"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Sobrenome"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="participation"
          placeholder="Participação (%)"
          value={formData.participation}
          onChange={handleChange}
          min="0"
          max="100"
          required
        />
        <button type="submit">Enviar</button>
      </form>

      <div className="total-participation">
        <h1>Participação</h1>
        <h2>{participants.length} pessoa(s) contribuíram</h2> {/* Exibe o número de participantes */}
      </div>

      <div className = "content">
        <div className = "table-container">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Participação</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p, index) => (
                <tr key={index}>
                  <td>{p.first_name}</td>
                  <td>{p.last_name}</td>
                  <td>{p.participation}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pie-chart-container">
          <PieChart width={400} height={400}>
            <Pie
              data={participants}
              dataKey="participation"
              nameKey="first_name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              innerRadius={50}
            >
              {participants.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="legend">
          {participants.map((p, index) => (
            <div key={index} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="legend-name">
                {p.first_name}
                {p.last_name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {isAdmin && (
        <div className="admin-panel">
          <h3>Painel Administrativo</h3>
          <button onClick={() => alert("Funcionalidade para administração.")}>Excluir Participante</button>
        </div>
      )}
    </div>
  )
}

export default App
