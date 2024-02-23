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
def get_name():
  return input("What is your name? ")

def greet(name):
  return f"Hello, {name}!."

def main():
  name = get_name()
  greeting = greet(name)
  print(greeting)

if __name__ == "__main__":
  main()`;

  const twoSumsCode = `
def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []

# Example usage
print(two_sum([2, 7, 11, 15], 9))`;

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
