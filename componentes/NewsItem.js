
export function NewsItem(newsData) {
    const noticia = document.createElement('div');
    noticia.classList.add('div_noticia'); 
    noticia.id = `div_noticia_${newsData.id}`; 

    //agrega imagen, si la tiene
    if (newsData.imageUrl) {
        const img = document.createElement('img');
        img.src = newsData.imageUrl;
        img.alt = newsData.title; 
        img.classList.add('news-thumbnail');
        noticia.appendChild(img);
    }

    const h2 = document.createElement('h2');
    h2.textContent = newsData.title;

    const p = document.createElement('p');
    p.textContent = newsData.summary;

    const a = document.createElement('a');
    a.href = newsData.url;
    a.textContent = 'Leer artículo completo';
    a.target = '_blank'; 
    noticia.appendChild(h2);
    noticia.appendChild(p);
    noticia.appendChild(a);
    
    return noticia; 
}