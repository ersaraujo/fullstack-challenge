import React from 'react';

const ParticipantsTable = ({ participants }) => {
    return (
      <table>
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Participation</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((p, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{p.first_name}</td>
              <td>{p.last_name}</td>
              <td>{p.participation}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default ParticipantsTable;