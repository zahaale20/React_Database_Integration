import React from 'react';

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>ID</th> {/* New ID column */}
          <th>Name</th>
          <th>Job</th>
        </tr>
      </thead>
    );
  }

  function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row._id}</td> {/* Updated to display the _id */}
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>
            <button onClick={() => props.removeCharacter(index)}>Delete</button>
          </td>
        </tr>
      );
    });
  
    return <tbody>{rows}</tbody>;
  }

function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
      </table>
    );
  }

export default Table;