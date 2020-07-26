import React from 'react';
import './App.css';
import UserComponent from './UserComponent';

function App() {
  
  //inputNodes => total number of input feilds
  //dividedDigits => length of input digits per input field
  return (
    <div className="App">
      <UserComponent inputNodes={4} dividedDigits={4}/> 
    </div>
  );
}

export default App;
