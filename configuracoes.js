// configuracoes.js

document.addEventListener('DOMContentLoaded', () => {
    const changePasswordBtn = document.getElementById('change-password-btn');
    const privacySettingsBtn = document.getElementById('privacy-settings-btn');
    const emailNotifsToggle = document.getElementById('email-notifs');
    const pushNotifsToggle = document.getElementById('push-notifs');
    const manageNotifTypesBtn = document.getElementById('manage-notif-types-btn');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const deleteAccountBtn = document.getElementById('delete-account-btn');

    // --- SIMULAÇÃO DE CARREGAMENTO DE PREFERÊNCIAS DO USUÁRIO ---
    // Em um cenário real, esses dados viriam de uma API do backend.
    const userPreferences = {
        emailNotifications: true,
        pushNotifications: false,
        darkMode: false
    };

    // Aplica as preferências carregadas
    emailNotifsToggle.checked = userPreferences.emailNotifications;
    pushNotifsToggle.checked = userPreferences.pushNotifications;
    darkModeToggle.checked = userPreferences.darkMode;

    // Aplica o modo escuro no carregamento (simulação)
    if (userPreferences.darkMode) {
        document.body.classList.add('dark-mode');
    }

    // --- EVENT LISTENERS PARA AS OPÇÕES ---

    changePasswordBtn.addEventListener('click', () => {
        alert('Funcionalidade "Alterar Senha" em desenvolvimento. (Simulação)');
        // --- BACKEND: Redirecionaria para uma página de alteração de senha ou abriria um modal ---
    });

    privacySettingsBtn.addEventListener('click', () => {
        alert('Funcionalidade "Configurações de Privacidade" em desenvolvimento. (Simulação)');
        // --- BACKEND: Redirecionaria para uma página mais detalhada de privacidade ---
    });

    emailNotifsToggle.addEventListener('change', (e) => {
        userPreferences.emailNotifications = e.target.checked;
        alert(`Notificações por E-mail: ${userPreferences.emailNotifications ? 'Ativadas' : 'Desativadas'}. (Simulação)`);
        // --- BACKEND: Enviar requisição para atualizar preferência de e-mail ---
    });

    pushNotifsToggle.addEventListener('change', (e) => {
        userPreferences.pushNotifications = e.target.checked;
        alert(`Notificações Push: ${userPreferences.pushNotifications ? 'Ativadas' : 'Desativadas'}. (Simulação)`);
        // --- BACKEND: Enviar requisição para atualizar preferência de push ---
        // Aqui também se faria a lógica de pedir permissão para notificações push do navegador
    });

    manageNotifTypesBtn.addEventListener('click', () => {
        alert('Funcionalidade "Gerenciar Tipos de Notificação" em desenvolvimento. (Simulação)');
        // --- BACKEND: Redirecionaria para uma página com checkboxes para cada tipo de notificação ---
    });

    // configuracoes.js

document.addEventListener('DOMContentLoaded', () => {
    // ... (código existente) ...

    const darkModeToggle = document.getElementById('dark-mode-toggle');

    // --- LÓGICA DO MODO ESCURO ---
    // 1. Carrega a preferência salva ao iniciar a página de configurações
    //    Verifica se a preferência de modo escuro está no localStorage
    //    Se estiver, usa esse valor; caso contrário, assume 'false' (modo claro)
    const savedDarkModePreference = localStorage.getItem('infoeducaDarkMode') === 'true';
    darkModeToggle.checked = savedDarkModePreference; // Define o estado do toggle

    // Aplica o modo escuro no carregamento da página de configurações, se salvo
    if (savedDarkModePreference) {
        document.body.classList.add('dark-mode');
    }

    // Event listener para o toggle do modo escuro
    darkModeToggle.addEventListener('change', (e) => {
        const isDarkModeEnabled = e.target.checked;

        if (isDarkModeEnabled) {
            document.body.classList.add('dark-mode');
            // Salva a preferência no localStorage
            localStorage.setItem('infoeducaDarkMode', 'true');
            alert('Modo Escuro ativado em todas as páginas! (Simulação)');
        } else {
            document.body.classList.remove('dark-mode');
            // Salva a preferência no localStorage
            localStorage.setItem('infoeducaDarkMode', 'false');
            alert('Modo Escuro desativado em todas as páginas! (Simulação)');
        }
        // Em um cenário real com backend, você também enviaria essa preferência para o servidor.
    });

    // ... (restante do código existente) ...
});

    deleteAccountBtn.addEventListener('click', () => {
        const confirmDelete = confirm('AVISO: Excluir sua conta é uma ação irreversível. Tem certeza que deseja continuar?');
        if (confirmDelete) {
            alert('Conta excluída com sucesso! (Simulação - Na vida real, você seria deslogado)');
            // --- BACKEND: Enviar requisição para EXCLUIR a conta do usuário ---
            // window.location.href = 'pagina_de_boas_vindas_ou_registro.html';
        }
    });

    // Lidar com o botão de logout (já no social.js)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Você foi desconectado. (Simulação)');
            window.location.href = 'login.html';
        });
    }
});