// salvos.js

document.addEventListener('DOMContentLoaded', () => {
    const savedPostsContainer = document.getElementById('saved-posts-container');
    const savedFilter = document.getElementById('saved-filter');
    const noSavedItemsMessage = document.getElementById('no-saved-items-message');

    // --- SIMULAÇÃO DE DADOS DE POSTS SALVOS ---
    // Em um cenário real, esses dados viriam de uma API do backend,
    // que consultaria o banco de dados do usuário logado.
    let savedItemsData = [
        {
            id: 'post001',
            type: 'post', // Tipo de item: 'post' ou 'material'
            author: 'João Dutra',
            author_username: 'joao_d',
            author_avatar: 'https://via.placeholder.com/50/ED3237/FFFFFF?text=JD',
            time: '2 dias atrás',
            content: 'Dica de ouro para quem está com dificuldade em funções exponenciais! Assisti a uma aula incrível hoje que desmistificou o assunto. #Matemática #DicasDeEstudo',
            files: [],
            isSaved: true
        },
        {
            id: 'post002',
            type: 'material',
            author: 'Maria Eduarda',
            author_username: 'maria_edu',
            author_avatar: 'https://via.placeholder.com/50/006CB5/FFFFFF?text=ME',
            time: '4 dias atrás',
            content: 'Pessoal, compilei um PDF com resumos de todo o conteúdo de Revolução Industrial. Espero que ajude nos estudos! 💪',
            files: [{ name: 'Resumo_Revolucao_Industrial.pdf', url: 'exemplo_revolucao.pdf', type: 'pdf' }],
            isSaved: true
        },
        {
            id: 'post003',
            type: 'post',
            author: 'Carlos Silva',
            author_username: 'carlos_s',
            author_avatar: 'https://via.placeholder.com/50/006CB5/FFFFFF?text=CS',
            time: '1 semana atrás',
            content: 'Dúvida: Qual a melhor forma de se preparar para a parte de Linguagens do ENEM? Alguma dica de leitura ou simulados?',
            files: [],
            isSaved: true
        },
        {
            id: 'post004',
            type: 'material',
            author: 'Ana Paula',
            author_username: 'ana_p',
            author_avatar: 'https://via.placeholder.com/50/ED3237/FFFFFF?text=AP',
            time: '3 dias atrás',
            content: 'Compartilhando meu roteiro de estudos de Química para o 3º ano. Adaptei de um professor top! 😉',
            files: [{ name: 'Roteiro_Quimica_3Ano.docx', url: '#', type: 'doc' }],
            isSaved: true
        },
        {
            id: 'post005',
            type: 'post',
            author: 'Pedro Rocha',
            author_username: 'pedro_r',
            author_avatar: 'https://via.placeholder.com/50/006CB5/FFFFFF?text=PR',
            time: '5 horas atrás',
            content: 'Galera, alguém pode me explicar a diferença entre célula procariota e eucariota de forma simples?',
            files: [],
            isSaved: true
        }
    ];

    // --- FUNÇÃO PARA RENDERIZAR OS ITENS SALVOS ---
    const renderSavedItems = (filterType) => {
        savedPostsContainer.innerHTML = ''; // Limpa o container antes de renderizar

        const filteredItems = savedItemsData.filter(item => {
            if (filterType === 'all') return true;
            return item.type === filterType;
        });

        if (filteredItems.length === 0) {
            noSavedItemsMessage.style.display = 'block';
            return;
        } else {
            noSavedItemsMessage.style.display = 'none';
        }

        filteredItems.forEach(item => {
            const postCard = document.createElement('div');
            postCard.classList.add('post-card');
            postCard.dataset.postId = item.id; // Adiciona ID para facilitar remoção
            postCard.dataset.postType = item.type; // Adiciona tipo para filtragem

            // Determina o ícone do arquivo baseado no tipo (se houver)
            const fileIconClass = item.files && item.files.length > 0 ?
                (item.files[0].type === 'pdf' ? 'fas fa-file-pdf' :
                 item.files[0].type === 'doc' ? 'fas fa-file-word' :
                 item.files[0].type === 'ppt' ? 'fas fa-file-powerpoint' :
                 'fas fa-file-alt') : ''; // Ícone genérico se tipo desconhecido

            const fileHtml = item.files && item.files.length > 0 ?
                `<a href="${item.files[0].url}" download><i class="${fileIconClass}"></i> ${item.files[0].name}</a>` : '';

            postCard.innerHTML = `
                <div class="post-header">
                    <img src="${item.author_avatar}" alt="Avatar ${item.author}" class="post-avatar">
                    <div class="post-info">
                        <h4>${item.author}</h4>
                        <span>@${item.author_username} • ${item.time}</span>
                    </div>
                    <div class="post-actions-header">
                        <button class="save-btn ${item.isSaved ? 'active' : ''}" data-post-id="${item.id}" title="${item.isSaved ? 'Remover dos salvos' : 'Salvar'}">
                            <i class="fas fa-bookmark"></i> ${item.isSaved ? 'Salvo' : 'Salvar'}
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
            savedPostsContainer.appendChild(postCard);
        });

        // Adiciona event listeners aos botões de salvar/dessalvar após renderizar
        addSaveButtonListeners();
    };

    // --- FUNÇÃO PARA ADICIONAR LISTENERS AOS BOTÕES DE SALVAR/DESSALVAR ---
    const addSaveButtonListeners = () => {
        savedPostsContainer.querySelectorAll('.save-btn').forEach(button => {
            // Remove listeners antigos para evitar duplicação em re-renderizações
            button.onclick = null;
            button.addEventListener('click', (e) => {
                const postId = e.currentTarget.dataset.postId;
                const itemIndex = savedItemsData.findIndex(item => item.id === postId);

                if (itemIndex !== -1) {
                    const itemToToggle = savedItemsData[itemIndex];

                    if (itemToToggle.isSaved) {
                        // Lógica para DESSALVAR
                        const confirmUnsave = confirm(`Tem certeza que deseja remover este item dos seus salvos?`);
                        if (confirmUnsave) {
                            savedItemsData.splice(itemIndex, 1); // Remove do array simulado
                            renderSavedItems(savedFilter.value); // Re-renderiza a lista
                            alert('Item removido dos seus salvos. (Simulação)');
                            // --- AQUI ENVIARIA A REQUISIÇÃO PARA O BACKEND PARA REMOVER O ITEM SALVO ---
                            // fetch(`/api/unsave-item/${postId}`, { method: 'DELETE' })
                            //    .then(response => response.json())
                            //    .then(data => { if (data.success) { ... } });
                        }
                    }
                    // Na página de "Salvos", o botão é sempre para REMOVER.
                    // A lógica de "Salvar" só existiria no feed principal.
                }
            });
        });
    };

    // --- EVENT LISTENERS GERAIS ---

    // Event Listener para o filtro de itens salvos
    savedFilter.addEventListener('change', (e) => {
        renderSavedItems(e.target.value);
    });

    // Lidar com o botão de logout (já no social.js, mas mantido aqui para completude)
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