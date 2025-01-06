export default async function handler(req, res) {
    const { lon, lat, date } = req.query;
    const apiKey = process.env.NASA_API_KEY; // Access environment variable
  
    if (!lon || !lat || !date) {
      return res.status(400).json({ error: 'Longitude, latitude, and date are required.' });
    }
  
    const url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&dim=0.05&api_key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to fetch image from NASA API.' });
      }
  
      const imageBuffer = await response.arrayBuffer();
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(Buffer.from(imageBuffer));
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  