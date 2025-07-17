// theme.js

document.addEventListener('DOMContentLoaded', () => {
    // Verifica se a preferência de modo escuro está salva no localStorage
    const isDarkModeEnabled = localStorage.getItem('infoeducaDarkMode') === 'true';

    // Se o modo escuro estiver ativado, adiciona a classe 'dark-mode' ao <body>
    if (isDarkModeEnabled) {
        document.body.classList.add('dark-mode');
    }
});