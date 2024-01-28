// youtubeApi.js
import axios from 'axios';

const getYouTubeResults = async (artist, title) => {
    try {
        // Aquí debes reemplazar 'TU_API_KEY_DE_YOUTUBE' con tu propia clave de API de YouTube
        const apiKey = 'AIzaSyDRK8oNMfP5bs9iIwDsaqEyuSXW4_dyK6Y';
        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${artist} ${title}&key=${apiKey}`
        );

        // Devolver los resultados relevantes de la API de YouTube
        return response.data.items;
    } catch (error) {
        console.error('Error fetching YouTube results:', error);
        return [];
    }
};

export default getYouTubeResults;
