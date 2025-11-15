import { fetchTopHeadlines, searchNews } from './api.js';
import { TitleBar } from './componentes/TitleBar.js';
import { NewsItem } from './componentes/NewsItem.js';
import { Footer } from './componentes/Footer.js';

// ** FUNCIÓN PARA ACTUALIZAR CONTENIDO DE NOTICIAS (UPDATE) **
function updateNewsContainer(articles, newsContainerElement) {
    newsContainerElement.innerHTML = ''; 
    if (articles.length === 0) {
        newsContainerElement.innerHTML = '<p>No se encontraron resultados para la búsqueda.</p>';
        return;
    }

    articles.forEach((news, index) => {
        const newsItemComponent = NewsItem({
            id: index + 1,
            title: news.title,
            summary: news.description || 'Sin descripción disponible.',
            url: news.url,
            imageUrl: news.urlToImage
        });
        newsContainerElement.appendChild(newsItemComponent);
    });
}

// ** FUNCIÓN PARA CARGAR Y MOSTRAR EL FEED PRINCIPAL (FETCH & RENDER) **
async function loadAndDisplayInitialNews(newsContainerElement) {
    newsContainerElement.innerHTML = '<p>Cargando noticias principales...</p>'; 
    const initialNews = await fetchTopHeadlines(); 
    
    if (initialNews && initialNews.length > 0) {
        updateNewsContainer(initialNews, newsContainerElement);
    } else {
        newsContainerElement.innerHTML = '<p class="error-message"> No se pudieron cargar las noticias. </p>';
    }
}


// ** FUNCIÓN PRINCIPAL QUE ENSAMBLA LA APLICACIÓN **
async function renderApp() {
    const body = document.body;
    body.innerHTML = ''; 

    // 1. div_cont_principal
    const mainContainer = document.createElement('div');
    mainContainer.id = 'div_cont_principal';

    // 2.  div_noticias (contenedor)
    const newsContainer = document.createElement('div');
    newsContainer.id = 'div_noticias';

    // 3. Handlers de Eventos
    const handleSearch = async (query) => {
        newsContainer.innerHTML = '<p>Cargando resultados de búsqueda...</p>'; 
        const searchResults = await searchNews(query);
        updateNewsContainer(searchResults, newsContainer);
    };

    const handleReload = () => {
        // Llama a la función global de carga inicial
        loadAndDisplayInitialNews(newsContainer);
    };

    // 4. Invocar e insertar la barra de título
    const titleBarComponent = TitleBar('Noticias del Mundo', 'Buscar...', handleSearch, handleReload);
    mainContainer.appendChild(titleBarComponent);
    
    // 5. Añadir el contenedor de noticias al main container
    mainContainer.appendChild(newsContainer); 
    
    // 6. ¡Iniciar la carga de noticias iniciales! (Llamada al async/await)
    await loadAndDisplayInitialNews(newsContainer); 
    
    // 7. Insertar Footer
    const footerComponent = Footer('© 2025 Noticias del Mundo | Fuente de datos: NewsAPI');
    mainContainer.appendChild(footerComponent);

    // 8. Añadir el contenedor principal al body
    body.appendChild(mainContainer);
}

// Iniciar la aplicación
document.addEventListener('DOMContentLoaded', renderApp);