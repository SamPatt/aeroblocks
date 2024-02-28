async function createCanvas(name, code) {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch("http://localhost:5000/api/canvas/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, code }),
    });
    if (!response.ok) {
      throw new Error("Failed to create canvas");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating canvas:", error);
    throw error;
  }
}

async function loadCanvases() {
  const token = localStorage.getItem("authToken");

  try {
    const response = await fetch("http://localhost:5000/api/canvas/load", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to load canvases");
    }
    const canvases = await response.json();
    return canvases;
  } catch (error) {
    console.error("Error loading canvases:", error);
    throw error;
  }
}

async function saveCanvas(name, data) {
  const token = localStorage.getItem("authToken");

  try {
      const response = await fetch("http://localhost:5000/api/canvas/save", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, data }),
      });

      if (!response.ok) {
          throw new Error("Failed to save canvas");
      }

      const savedCanvas = await response.json();
      return savedCanvas;
  } catch (error) {
      console.error("Error saving canvas:", error);
      throw error;
  }
}

export const canvasService = {
  createCanvas,
  loadCanvases,
  saveCanvas,
};
