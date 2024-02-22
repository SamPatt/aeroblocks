import React, { useState } from 'react';

const CodeUploadForm = ({ onCodeSubmit }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting code:', code);
    onCodeSubmit(code);

    setCode('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Code</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here"
        rows="10"
        cols="50"
      />
      <br />
      <button type="submit">Upload</button>
    </form>
  );
};

export default CodeUploadForm;
