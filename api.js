// **Configuración de la API**
const API_KEY = '74f52c58d53b4897901b022ff1004530'; 
const BASE_URL = `https://newsapi.org/v2/`;

/**
 * Función genérica para hacer la llamada fetch a la API.
 * @param {string} endpoint - La parte de la URL después de /v2/ (e.g., 'top-headlines', 'everything').
 * @param {string} params - Parámetros de la consulta (e.g., 'country=us&q=technology').
 * @returns {Promise<Array>} Un array de artículos de noticias.
 */

async function fetchApi(endpoint, params) {
    const URL = `${BASE_URL}${endpoint}?${params}&apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(URL);
        
        if (!response.ok) {
            // Lanza un error si la respuesta HTTP no es 200 (ej. error 401 por clave inválida)
            throw new Error(`Error al acceder a la API: Código ${response.status}`);
        }
        
        const data = await response.json();
        
        // Devuelve el array de artículos
        return data.articles || []; 
        
    } catch (error) {
        console.error("Error en la llamada a la API:", error.message);
        // Devuelve un array vacío en caso de error
        return []; 
    }
}

// ----------------------------------------------------
// 1. Lógica para obtener noticias principales
// ----------------------------------------------------
export async function fetchTopHeadlines() {
    const params = 'country=us'; 
    return fetchApi('top-headlines', params);
}


// ----------------------------------------------------
// 2. Lógica para buscar noticias
// ----------------------------------------------------
export async function searchNews(query) {
    // Busca en 'everything' (todo el catálogo) por la consulta, ordenado por relevancia
    const params = `q=${query}&sortBy=relevance`; 
    return fetchApi('everything', params);
}