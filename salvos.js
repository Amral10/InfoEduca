document.addEventListener('DOMContentLoaded', () => {
    const savedPostsContainer = document.getElementById('saved-posts-container');
    const savedFilter = document.getElementById('saved-filter');
    const noSavedItemsMessage = document.getElementById('no-saved-items-message');

    // --- SIMULAÇÃO DE DADOS DE POSTS SALVOS ---
    // Em um cenário real, esses dados viriam de uma API do backend.
    // Usaremos localStorage para persistência simulada no front-end.
    let savedItemsData = JSON.parse(localStorage.getItem('savedItemsData')) || [
        {
            id: 'post001',
            type: 'material', // Tipo de item: 'post' ou 'material'
            author: 'Amaral',
            author_username: 'Amral10',
            author_avatar: 'Imagens ilustrativas/perfil-image-1.jpeg',
            time: '2 dias atrás',
            content: 'Dica de ouro pra qm ta com dificuldade em história do Brasil. Tem um video perfeito para estudar. #Historia #DicasDeEstudo',
            files: [{ name:'500 anos em 1 hora / História do Brasil - Canal Nostalgia', url:'https://www.youtube.com/watch?v=R6w2jM3a7G0', type:'youtube'}], // Exemplo de URL real do YouTube
            isSaved: true
        },
        {
            id: 'post002',
            type: 'material',
            author: 'Davi Brito',
            author_username: 'Davi_brito',
            author_avatar: 'Imagens ilustrativas/perfil-image-6.jpeg',
            time: '4 dias atrás',
            content: 'Pessoal, compilei um PDF com resumos de todo o conteúdo de Revolução Industrial. Espero que ajude nos estudos! 💪',
            files: [{ name: 'Resumo_Revolucao_Industrial.pdf', url: 'Imagens ilustrativas/revolucao-industrial.pdf', type: 'pdf' }],
            isSaved: true
        },
        {
            id: 'post003',
            type: 'post',
            author: 'Lucas Moraes',
            author_username: 'Luskinhas',
            author_avatar: 'Imagens ilustrativas/perfil-image-2.jpeg',
            time: '1 semana atrás',
            content: 'Dúvida: Qual a melhor forma de se preparar para a parte de Linguagens do ENEM? Alguma dica de leitura ou simulados?',
            files: [],
            isSaved: true
        },
    ];

    // Salva os dados no localStorage sempre que houver uma alteração
    const saveItemsToLocalStorage = () => {
        localStorage.setItem('savedItemsData', JSON.stringify(savedItemsData));
    };

    // --- FUNÇÃO PARA RENDERIZAR UM ÚNICO ITEM ---
    const createPostCard = (item) => {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
        postCard.dataset.postId = item.id;
        postCard.dataset.postType = item.type;

        let fileHtml = '';
        if (item.files && item.files.length > 0) {
            const file = item.files[0];
            let fileIconClass = 'fas fa-file-alt'; // Ícone genérico

            switch (file.type) {
                case 'pdf':
                    fileIconClass = 'fas fa-file-pdf';
                    break;
                case 'doc':
                    fileIconClass = 'fas fa-file-word';
                    break;
                case 'ppt':
                    fileIconClass = 'fas fa-file-powerpoint';
                    break;
                case 'youtube':
                    fileIconClass = 'fab fa-youtube'; // Ícone específico para YouTube
                    break;
                // Adicione mais tipos conforme necessário
            }
            fileHtml = `<a href="${file.url}" target="_blank" rel="noopener noreferrer"><i class="${fileIconClass}"></i> ${file.name}</a>`;
        }

        postCard.innerHTML = `
            <div class="post-header">
                <img src="${item.author_avatar}" alt="Avatar ${item.author}" class="post-avatar">
                <div class="post-info">
                    <h4>${item.author}</h4>
                    <span>@${item.author_username} • ${item.time}</span>
                </div>
                <div class="post-actions-header">
                    <button class="save-btn active" data-post-id="${item.id}" title="Remover dos salvos">
                        <i class="fas fa-bookmark"></i> Salvo
                    </button>
                    <a href="perfil.html" class="view-profile-btn" title="Ver perfil do autor"><i class="fas fa-user-circle"></i> Ver Perfil</a>
                </div>
            </div>
            <div class="post-body">
                <p>${item.content}</p>
                ${fileHtml}
            </div>
            <div class="post-actions">
                <button title="Curtir"><i class="fas fa-thumbs-up"></i> Curtir</button>
                <button title="Comentar"><i class="fas fa-comment"></i> Comentar</button>
                <button title="Compartilhar"><i class="fas fa-share"></i> Compartilhar</button>
            </div>
        `;
        return postCard;
    };

    // --- FUNÇÃO PARA RENDERIZAR TODOS OS ITENS SALVOS ---
    const renderSavedItems = (filterType) => {
        savedPostsContainer.innerHTML = ''; // Limpa o container

        const filteredItems = savedItemsData.filter(item => {
            if (filterType === 'all') return true;
            return item.type === filterType;
        });

        if (filteredItems.length === 0) {
            noSavedItemsMessage.style.display = 'block';
        } else {
            noSavedItemsMessage.style.display = 'none';
            filteredItems.forEach(item => {
                savedPostsContainer.appendChild(createPostCard(item));
            });
        }
    };

    // --- FUNÇÃO PARA LIDAR COM A AÇÃO DE SALVAR/DESSALVAR ---
    // Usaremos delegação de eventos no container pai
    savedPostsContainer.addEventListener('click', (event) => {
        const target = event.target.closest('.save-btn'); // Encontra o botão .save-btn ou null
        if (target) {
            const postId = target.dataset.postId;
            const itemIndex = savedItemsData.findIndex(item => item.id === postId);

            if (itemIndex !== -1) {
                const confirmUnsave = confirm(`Tem certeza que deseja remover este item dos seus salvos?`);
                if (confirmUnsave) {
                    savedItemsData.splice(itemIndex, 1); // Remove do array
                    saveItemsToLocalStorage(); // Atualiza localStorage
                    renderSavedItems(savedFilter.value); // Re-renderiza a lista
                    alert('Item removido dos seus salvos. (Simulação)');
                    // --- AQUI ENVIARIA A REQUISIÇÃO PARA O BACKEND PARA REMOVER O ITEM SALVO ---
                    // fetch(`/api/unsave-item/${postId}`, { method: 'DELETE' })
                    //    .then(response => response.json())
                    //    .then(data => { if (data.success) { ... } });
                }
            }
        }
    });

    // --- EVENT LISTENERS GERAIS ---

    // Event Listener para o filtro de itens salvos
    savedFilter.addEventListener('change', (e) => {
        renderSavedItems(e.target.value);
    });

    // Lidar com o botão de logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Você foi desconectado. (Simulação)');
            window.location.href = 'index.html';
        });
    }

    // --- CARREGA OS ITENS SALVOS AO CARREGAR A PÁGINA PELA PRIMEIRA VEZ ---
    renderSavedItems('all');
});