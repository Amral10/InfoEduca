// feed.js (ou index.js, se preferir)

document.addEventListener('DOMContentLoaded', () => {
    // --- Funcionalidade de Curtir ---
    const likeButtons = document.querySelectorAll('.like-btn');

    // Simulação de estado das curtidas (em um projeto real, viria de um backend)
    // Usaremos localStorage para simular persistência no frontend
    let postLikes = JSON.parse(localStorage.getItem('postLikes')) || {}; // { 'post_id': { count: 10, likedByUser: true }, ... }

    // Função para atualizar o estado visual do botão e a contagem
    const updateLikeButton = (button, postId) => {
        const icon = button.querySelector('i');
        const countSpan = button.querySelector('.like-count');
        const postData = postLikes[postId] || { count: 0, likedByUser: false };

        countSpan.textContent = postData.count;

        if (postData.likedByUser) {
            icon.classList.remove('far'); // Ícone vazio
            icon.classList.add('fas');    // Ícone preenchido
            button.classList.add('active'); // Adiciona classe para estilização de botão ativo
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            button.classList.remove('active');
        }
    };

    // Inicializa todos os botões de curtir ao carregar a página
    likeButtons.forEach(button => {
        const postId = button.dataset.postId;
        updateLikeButton(button, postId); // Atualiza o estado inicial
    });

    // Adiciona o event listener para cada botão de curtir
    likeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const postId = e.currentTarget.dataset.postId;

            // Se o post ainda não existe em postLikes, inicializa
            if (!postLikes[postId]) {
                postLikes[postId] = { count: 0, likedByUser: false };
            }

            // Alterna o estado de curtida
            if (postLikes[postId].likedByUser) {
                postLikes[postId].count--;      // Decrementa a contagem
                postLikes[postId].likedByUser = false; // Define como não curtido

                // --- BACKEND: Enviar requisição para REMOVER a curtida no servidor ---
            } else {
                postLikes[postId].count++;      // Incrementa a contagem
                postLikes[postId].likedByUser = true;  // Define como curtido

                // --- BACKEND: Enviar requisição para ADICIONAR a curtida no servidor ---
            }

            // Salva o estado atual no localStorage (para persistir no navegador)
            localStorage.setItem('postLikes', JSON.stringify(postLikes));

            // Atualiza o botão visualmente
            updateLikeButton(e.currentTarget, postId);
        });
    });

    // --- Outras funcionalidades do feed (comentar, compartilhar, etc. podem vir aqui) ---
    // ...
});

