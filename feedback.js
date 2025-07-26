// feedback.js (Mantenha este arquivo como está)

document.addEventListener('DOMContentLoaded', () => {
    const feedbackForm = document.getElementById('feedback-form');
    const feedbackNameInput = document.getElementById('feedback-name');
    const feedbackEmailInput = document.getElementById('feedback-email');
    const feedbackSubjectInput = document.getElementById('feedback-subject');
    const feedbackMessageInput = document.getElementById('feedback-message');

    feedbackForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const name = feedbackNameInput.value.trim(); // Opcional
        const email = feedbackEmailInput.value.trim();
        const subject = feedbackSubjectInput.value.trim();
        const message = feedbackMessageInput.value.trim();

        // --- Validações Frontend ---

        // Validação de e-mail simples
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um endereço de e-mail válido.');
            feedbackEmailInput.focus();
            return;
        }

        if (subject.length < 5) {
            alert('Por favor, insira um assunto com no mínimo 5 caracteres.');
            feedbackSubjectInput.focus();
            return;
        }

        if (message.length < 10) {
            alert('Sua mensagem deve ter no mínimo 10 caracteres.');
            feedbackMessageInput.focus();
            return;
        }

        // --- Simulação de Envio ---
        alert('Feedback enviado com sucesso! Agradecemos sua contribuição.');
        console.log('Feedback Recebido (Simulação):', {
            name: name,
            email: email,
            subject: subject,
            message: message
        });

        // Limpa o formulário após o envio simulado
        feedbackForm.reset();
    });
});