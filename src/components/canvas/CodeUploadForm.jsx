import React, { useState } from 'react';
import { canvasService } from '../../services/canvasService';
import { useCanvas } from '../../context/CanvasContext'; 
import { useNavigate } from 'react-router-dom';

const CodeUploadForm = () => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const { loadCanvas } = useCanvas();
  const navigate = useNavigate();




  
  const helloWorldCode = `
def hello():
    print('Hello, World!')
`;

  const twoSumsCode = `
def two_sums(nums, target):
  prev_map = {}  # to store visited numbers and their indices
  
  for i, num in enumerate(nums):
      diff = target - num
      if diff in prev_map:
          return [prev_map[diff], i]
      prev_map[num] = i
  return []`;

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await canvasService.createCanvas(name, code);
      console.log('Canvas created successfully:', data);
      loadCanvas(data.canvas);
      setCode('');
      setName('');
      navigate('/canvas');
    } catch (error) {
      console.error('Failed to create canvas:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Canvas</h2> 
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Canvas Name"
          required
        />
      </label>
      <br />
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here"
        rows="15"
        cols="50"
        required
      />
      <br />
      <button type="submit">Create</button>
      <button type="button" onClick={() => { setCode(helloWorldCode); setName('Hello World'); }}>Hello World</button>
      <button type="button" onClick={() => { setCode(twoSumsCode); setName('Two Sums'); }}>Two Sums</button>
    </form>
  );
};

export default CodeUploadForm;
