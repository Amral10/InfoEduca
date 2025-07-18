const toggle = document.getElementById('dark-mode-toggle');
const root = document.documentElement;

// Função para aplicar o tema
function setTheme(theme) {
    if (theme === 'dark') {
        root.style.setProperty('--background-light', '#121212');
        root.style.setProperty('--card-background', '#1e1e1e');
        root.style.setProperty('--text-dark', '#f1f1f1');
        root.style.setProperty('--text-medium', '#b0b0b0');
        root.style.setProperty('--text-light', '#888');
        root.style.setProperty('--border-color', '#333');
        root.style.setProperty('--shadow-light', 'rgba(255, 255, 255, 0.05)');
        toggle.checked = true;
    } else {
        root.style.setProperty('--background-light', '#F8F9FA');
        root.style.setProperty('--card-background', '#FFFFFF');
        root.style.setProperty('--text-dark', '#212529');
        root.style.setProperty('--text-medium', '#6C757D');
        root.style.setProperty('--text-light', '#ADB5BD');
        root.style.setProperty('--border-color', '#DEE2E6');
        root.style.setProperty('--shadow-light', 'rgba(0, 0, 0, 0.08)');
        toggle.checked = false;
    }

    localStorage.setItem('theme', theme);
}

// Carrega tema salvo (se houver)
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Atualiza tema quando o toggle é clicado
toggle.addEventListener('change', () => {
    const newTheme = toggle.checked ? 'dark' : 'light';
    setTheme(newTheme);
});
