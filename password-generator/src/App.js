import React, { useState } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(12);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    const specialChars = '!#$%^&*()_+[]{}|;:,.<>?';
    const numericChars = '0123456789';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';

    const allChars = specialChars + numericChars + upperCaseChars + lowerCaseChars;

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard');
    }).catch(err => {
      alert('Failed to copy password: ', err);
    });
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>
          Password Length:
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="1"
          />
        </label>
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      {password && (
        <div>
          <p>{password}</p>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
      )}
    </div>
  );
}

export default App;
