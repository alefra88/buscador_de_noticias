
export function TitleBar(titleText, searchPlaceholder, onSearch, onReload) { 

    const contTitulo = document.createElement('div');
    contTitulo.id = 'div_cont_titulo';
    contTitulo.classList.add('header-container');

    const titulo = document.createElement('h1');
    titulo.id = 'div_titulo';
    titulo.textContent = titleText;

    const buscarInput = document.createElement('input');
    buscarInput.id = 'div_buscar';
    buscarInput.type = 'text';
    buscarInput.placeholder = searchPlaceholder;
    
    // Función que ejecuta  búsqueda
    const executeSearch = () => {
        const query = buscarInput.value.trim();
        if (query) {
            onSearch(query);
        }
    };
    
    //evento Enter 
    buscarInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            executeSearch(); 
        }
    });

    // botón de Búsqueda
    const searchButton = document.createElement('button');
    searchButton.id = 'btn_buscar';
    searchButton.textContent = 'Buscar 🔎';
    searchButton.classList.add('search-button');
    searchButton.addEventListener('click', executeSearch); 

    //botón de Recarga 
    const reloadButton = document.createElement('button');
    reloadButton.id = 'div_reload';
    reloadButton.textContent = 'Recargar 🔄';
    reloadButton.classList.add('reload-button');
    reloadButton.addEventListener('click', onReload); 


    const searchControls = document.createElement('div');
    searchControls.classList.add('search-controls');

    searchControls.appendChild(buscarInput);
    searchControls.appendChild(searchButton);
    searchControls.appendChild(reloadButton);

    // barra de título
    contTitulo.appendChild(titulo);
    contTitulo.appendChild(searchControls);


    return contTitulo;
}