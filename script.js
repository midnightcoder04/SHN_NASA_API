document.getElementById('imageForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const longitude = document.getElementById('longitude').value;
  const latitude = document.getElementById('latitude').value;
  const date = document.getElementById('date').value;

  const url = `/api/fetchLandsat?lon=${longitude}&lat=${latitude}&date=${date}`;
  const messageElement = document.getElementById('message');
  const imageElement = document.getElementById('image');

  messageElement.textContent = 'Fetching image, please wait...';
  imageElement.style.display = 'none';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Image not available for the given date and location.');
    }

    const imageBlob = await response.blob();
    const imageUrl = URL.createObjectURL(imageBlob);

    imageElement.src = imageUrl;
    imageElement.style.display = 'block';
    messageElement.textContent = `Landsat Image for ${latitude}, ${longitude} on ${date}`;
  } catch (error) {
    messageElement.textContent = `Error: ${error.message}`;
  }
});
