async function createCanvas(name, code) {
    try {
      const response = await fetch('http://localhost:5000/canvases', { // Adjust URL as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, code }),
      });
      if (!response.ok) {
        throw new Error('Failed to create canvas');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating canvas:', error);
      throw error;
    }
  }
  
  export const canvasService = {
    createCanvas,
  };
  