/**
 * @param {string} text - El texto de copyright o información que deseas mostrar.
 * @returns {HTMLElement} El elemento div#div_footer.
 */
export function Footer(text) {
    const footer = document.createElement('div');
    footer.id = 'div_footer';
    footer.classList.add('footer-style'); 
    
    const p = document.createElement('p');
    p.textContent = text;
    
    footer.appendChild(p);
    return footer; 
}