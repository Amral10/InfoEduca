// login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Credenciais de teste simuladas (em um ambiente real, isso seria verificado no backend)
    const TEST_USERNAME = 'pollyana.saoli123@gmail.com';
    const TEST_PASSWORD = '123';

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === TEST_USERNAME && password === TEST_PASSWORD) {
            // Simulação de login bem-sucedido
            alert('Login bem-sucedido! Redirecionando para o feed...');
            // Em um sistema real, você definiria um token de sessão ou cookie aqui
            window.location.href = 'index.html'; // Redireciona para a página principal
        } else {
            // Simulação de login falho
            alert('Nome de usuário ou senha incorretos. Por favor, tente novamente.');
            passwordInput.value = ''; // Limpa o campo da senha
            usernameInput.focus(); // Coloca o foco de volta no campo de usuário
        }
    });

    // Você também pode adicionar um manipulador para os links "Esqueceu sua senha?" e "Criar nova conta"
    // para exibir mensagens ou redirecionar para páginas específicas.
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const signupLink = document.querySelector('.signup-link');

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Funcionalidade de recuperação de senha em desenvolvimento.');
            // window.location.href = 'forgot-password.html'; // Redirecionar para página de recuperação
        });
    }

    if (signupLink) {
        signupLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Funcionalidade de criação de conta em desenvolvimento.');
            // window.location.href = 'signup.html'; // Redirecionar para página de cadastro
        });
    }
});