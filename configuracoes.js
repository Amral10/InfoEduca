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