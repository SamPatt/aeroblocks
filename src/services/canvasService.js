async function createCanvas(name, code) {
    const token = localStorage.getItem('authToken');
    console.log('Token:', localStorage.getItem('authToken'));

    
    try {
      const response = await fetch('http://localhost:5000/api/canvas/create', {
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
  