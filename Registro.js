// registro.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const fullNameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    registerForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const fullName = fullNameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // --- Validações Frontend ---

        if (fullName.length < 3) {
            alert('Por favor, insira um nome completo válido (mínimo 3 caracteres).');
            fullNameInput.focus();
            return;
        }

        // Validação de e-mail simples (pode ser mais robusta)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            emailInput.focus();
            return;
        }

        if (password.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres.');
            passwordInput.focus();
            return;
        }

        if (password !== confirmPassword) {
            alert('As senhas não coincidem. Por favor, verifique.');
            confirmPasswordInput.value = ''; // Limpa o campo de confirmação
            confirmPasswordInput.focus();
            return;
        }   
        console.log('Dados do Registro (Simulação):', {
            fullName: fullName,
            email: email,
            password: password // Em um ambiente real, NUNCA logue a senha!
        });

        // Redireciona para a página de login após o registro (simulado)
        window.location.href = 'login.html';
    });
});