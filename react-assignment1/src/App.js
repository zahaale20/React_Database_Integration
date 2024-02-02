// Importing necessary React hooks and components
import React, {useState, useEffect} from 'react';

// Importing child components Table and Form
import Table from './Table';
import Form from './Form';

// Importing axios for making HTTP requests
import axios from 'axios';

function App() {
  // State 'characters' to store the user data, initialized as an empty array
  const [characters, setCharacters] = useState([]);

  // Remove character by index
  function removeOneCharacter(index) {
    // Getting the user to delete
    const userToDelete = characters[index];
  
    // Only proceed if the user exists and has an _id
    if (userToDelete && userToDelete._id) {
      // Making a DELETE request to the server
      axios.delete(`http://localhost:8000/users/${userToDelete._id}`)
        .then(response => {
          // If the deletion was successful (status 204), update the characters state
          if (response.status === 204) {
            const updated = characters.filter((character, i) => i !== index);
            setCharacters(updated);
          }
        })
        .catch(error => {
          // Log any error during deletion
          console.error("There was an error deleting the user!", error);
        });
    }
  }

  // Function to add a new person to the list
  function updateList(person) {
    makePostCall(person).then(result => {
      // If the POST request was successful (status 201), update the characters state
      if (result && result.status === 201) {
        setCharacters([...characters, result.data]);
      }
    });
  }


// Asynchronous function to fetch all users
async function fetchAll(){
  try {
    // Making a GET request to retrieve users
    const response = await axios.get('http://localhost:8000/users');
    return response.data.users_list;     
  }
  catch (error){
    // Logging any error during fetching
    console.log(error); 
    return false;         
  }
}

// useEffect hook to fetch users when the component mounts
useEffect(() => {
  fetchAll().then( result => {
    // If fetching was successful, update the characters state
    if (result)
      setCharacters(result);
  });
}, [] ); // Empty dependency array to run only once after mounting

// Asynchronous function to make a POST request
async function makePostCall(person){
  try {
    // Making a POST request to add a new user
    const response = await axios.post('http://localhost:8000/users', person);
    return response;
  }
  catch (error) {
    // Logging any error during posting
    console.log(error);
    return false;
  }
}

// Render the Table and Form components
return (
  <div className="container">
    <Table characterData={characters} removeCharacter={removeOneCharacter} />
    <Form handleSubmit={updateList} />
  </div>
);
}



// Exporting the App component for use in other files
export default App;