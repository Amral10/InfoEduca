// grupos.js

document.addEventListener('DOMContentLoaded', () => {
    const groupList = document.getElementById('group-list');
    const groupDetailAvatar = document.getElementById('group-detail-avatar');
    const groupDetailName = document.getElementById('group-detail-name');
    const groupDetailDescription = document.getElementById('group-detail-description');
    const groupDetailMembersSpan = document.getElementById('group-detail-members');
    const groupPostsContainer = document.getElementById('group-posts-container');
    const groupMembersList = document.getElementById('group-members-list');
    const joinLeaveGroupBtn = document.getElementById('join-leave-group-btn');
    const openGroupChatBtn = document.getElementById('open-group-chat-btn');
    const createGroupBtn = document.getElementById('create-group-btn');
    const searchGroupInput = document.getElementById('search-group-input');

    // Dados de exemplo de grupos (em produção viriam do backend)
    const allGroups = [
        {
            id: 'grupo1',
            name: 'Projeto de História - Roma Antiga',
            avatar: 'Imagens ilustrativas/Roma-Antiga.jpeg',
            description: 'Grupo para colaboração no projeto de História sobre Roma Antiga. Compartilhe suas descobertas e ajude a construir o melhor trabalho!',
            membersCount: 3,
            isMember: true,
            members: [
                { name: 'Amaral', avatar: 'Imagens ilustrativas/perfil-image-1.jpeg' },
                { name: 'Grazy', avatar: 'Imagens ilustrativas/perfil-image-5.jpeg' },
                { name: 'Polly', avatar: 'Imagens ilustrativas/perfil-image-3.jpeg'},
            ],
            posts: [
                {
                    author: 'Grazy',
                    avatar: 'Imagens ilustrativas/perfil-image-5.jpeg',
                    time: '2 dias atrás',
                    content: 'Encontrei um documentário excelente sobre a Queda do Império Romano. Vou compartilhar o link para o pessoal assistir. #História #RomaAntiga',
                    files: [
                        { name: 'Queda Imperio Romano - Nostalgia', url: 'https://youtu.be/ENjqQKOegQY?si=urCx6F36bA-gnRVn', type: 'youtube' }
                    ]
                },
                {
                    author: 'Amaral',
                    avatar: 'Imagens ilustrativas/perfil-image-1.jpeg',
                    time: '1 dia atrás', // Você pode ajustar o tempo se quiser que apareça como mais recente
                    content: 'Consegui com meu professor de História um pdf de exercícios para fixação do conteúdo da ascensão Império Romano.',
                    files: [
                        { name: 'Lista Exercício Imperio Romano', url: 'Imagens ilustrativas/questoes-imperio-romano.pdf', type:'pdf'}
                    ]
                }
            ]
        },
        {
            id: 'grupo2',
            name: 'Clube de Leitura',
            avatar: 'Imagens ilustrativas/Literatura.jpeg',
            description: 'Para quem ama ler! Discutimos clássicos, lançamentos e trocamos indicações de livros. Encontros semanais online.',
            membersCount: 3,
            isMember: true,
            members: [
                { name: 'Lucas Arruda', avatar: 'Imagens ilustrativas/perfil-image-2.jpeg' },
                { name: 'Joana', avatar: 'Imagens ilustrativas/perfil-image-4.jpeg' },
                { name: 'Polly', avatar: 'Imagens Ilustrativas/perfil-image-3.jpeg' },
            ],
            posts: [
                { author: 'Joana', 
                    avatar: 'Imagens ilustrativas/perfil-image-4.jpeg', 
                    time: 'Ontem', 
                    content: 'Comecei a ler "Dom Casmurro" e estou adorando! Alguém já leu? Quais as impressões?', 
                    files: [] },
                
            ]
        },
        {
            id: 'grupo3',
            name: 'Matemática Avançada',
            avatar: 'Imagens ilustrativas/Matematica.jpeg',
            description: 'Grupo para alunos que buscam aprofundamento em tópicos de Matemática, com foco em cálculo e álgebra linear.',
            membersCount: 2,
            isMember: false,
            members: [
                { name: 'Davi Brito', avatar: 'Imagens ilustrativas/perfil-image-6.jpeg'},
                { name: 'Lucas Moraes', avatar: 'Imagens ilustrativas/perfil-image-2.jpeg'},
            ],
            posts: [
                {
                    author: 'Lucas Arruda',
                    avatar: 'Imagens ilustrativas/perfil-image-2.jpeg', // O avatar do Fernando
                    time: '2 horas atrás', // Ajuste o tempo conforme desejar
                    content: `
                        Salve, galera da Matemática! 👋<br>
                        <br>
                        Hoje vamos de um clássico que sempre nos salva em triângulos retângulos: o <b>Teorema de Pitágoras</b>!<br>
                        <br>
                        Lembrando: em um triângulo retângulo, a soma dos quadrados dos catetos é igual ao quadrado da hipotenusa(a² = b² + c²).<br>
                        <br>
                        <b>Problema para Praticar:</b><br>
                        Um bombeiro precisa resgatar um gato que está no topo de um prédio. Ele posiciona sua escada a 8 metros da base do prédio. Se o gato está a 15 metros de altura, qual o comprimento mínimo da escada que o bombeiro precisa para alcançá-lo?<br>
                        <br>
                        Manda ver nos comentários com suas respostas e percepções! 🚀 #TeoremaDePitagoras #Matematica #Geometria
                    `,
                    files: []
                }
                
            ]
        }
    ];

    let currentGroupId = 'grupo1'; // Inicia com o primeiro grupo ativo

    // Função para renderizar os detalhes de um grupo
    const renderGroupDetails = (groupId) => {
        const group = allGroups.find(g => g.id === groupId);

        if (group) {
            groupDetailAvatar.src = group.avatar;
            groupDetailName.textContent = group.name;
            groupDetailDescription.textContent = group.description;
            groupDetailMembersSpan.innerHTML = `<i class="fas fa-users"></i> ${group.membersCount} Membros`;

            // Atualiza o botão de participar/sair
            joinLeaveGroupBtn.textContent = group.isMember ? 'Sair do Grupo' : 'Participar';
            joinLeaveGroupBtn.classList.remove('btn-primary', 'btn-secondary');
            joinLeaveGroupBtn.classList.add(group.isMember ? 'btn-secondary' : 'btn-primary');
            joinLeaveGroupBtn.innerHTML = group.isMember ? '<i class="fas fa-sign-out-alt"></i> Sair do Grupo' : '<i class="fas fa-sign-in-alt"></i> Participar do Grupo';

            groupPostsContainer.innerHTML = ''; // Limpa posts anteriores
            if (group.posts.length > 0) {
                group.posts.forEach(post => {
                    const postCard = document.createElement('div');
                    postCard.classList.add('post-card');
                    postCard.innerHTML = `
                        <div class="post-header">
                            <img src="${post.avatar}" alt="Avatar Usuário" class="post-avatar">
                            <div class="post-info">
                                <h4>${post.author}</h4>
                                <span>${post.time}</span>
                            </div>
                        </div>
                        <div class="post-body">
                            <p>${post.content}</p>
                            ${post.files && post.files.length > 0 ? `
                                <div class="post-files">
                                    ${post.files.map(file => {
                                        if (file.type === 'youtube') {
                                            return `
                                                <a href="${file.url}" target="_blank" class="file-link youtube-link">
                                                    <i class="fab fa-youtube"></i> ${file.name}
                                                </a>
                                            `;
                                        } else {
                                            // Para outros tipos de arquivo (PDF, Word, Imagem, etc.)
                                            return `
                                                <a href="${file.url}" download class="file-link">
                                                    <i class="fas fa-file-${file.type}"></i> ${file.name}
                                                </a>
                                            `;
                                        }
                                    }).join('')}
                                </div>
                            ` : ''}
                        </div>
                        <div class="post-actions">
                            <button><i class="fas fa-thumbs-up"></i> Curtir</button>
                            <button><i class="fas fa-comment"></i> Comentar</button>
                            <button><i class="fas fa-share"></i> Compartilhar</button>
                        </div>
                    `;
                    groupPostsContainer.appendChild(postCard);
                });
            } else {
                groupPostsContainer.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: 20px;">Nenhuma publicação neste grupo ainda.</p>';
            }

            // Renderizar membros do grupo
            groupMembersList.innerHTML = ''; // Limpa membros anteriores
            if (group.members.length > 0) {
                group.members.forEach(member => {
                    const memberItem = document.createElement('li');
                    memberItem.innerHTML = `<img src="${member.avatar}" alt="Avatar"> ${member.name}`;
                    groupMembersList.appendChild(memberItem);
                });
            } else {
                groupMembersList.innerHTML = '<li style="text-align: center; color: var(--text-light);">Nenhum membro listado.</li>';
            }
        }
    };

    // Função para renderizar a lista de grupos
    const renderGroupList = () => {
        groupList.innerHTML = ''; // Limpa a lista
        allGroups.forEach(group => {
            const groupItem = document.createElement('li');
            groupItem.classList.add('group-item');
            if (group.id === currentGroupId) {
                groupItem.classList.add('active');
            }
            groupItem.dataset.groupId = group.id;

            groupItem.innerHTML = `
                <img src="${group.avatar}" alt="Avatar Grupo" class="group-avatar">
                <div class="group-info">
                    <span class="group-name">${group.name}</span>
                    <span class="group-members">${group.membersCount} Membros</span>
                </div>
            `;
            groupList.appendChild(groupItem);

            groupItem.addEventListener('click', () => {
                const prevActive = document.querySelector('.group-item.active');
                if (prevActive) {
                    prevActive.classList.remove('active');
                }
                groupItem.classList.add('active');
                currentGroupId = group.id;
                renderGroupDetails(currentGroupId);
            });
        });
    };

    // Inicializa a lista de grupos e os detalhes do primeiro grupo
    renderGroupList();
    renderGroupDetails(currentGroupId);

    // Lidar com o botão de Participar/Sair do Grupo
    joinLeaveGroupBtn.addEventListener('click', () => {
        const currentGroup = allGroups.find(g => g.id === currentGroupId);
        if (currentGroup) {
            if (currentGroup.isMember) {
                const confirmLeave = confirm(`Tem certeza que deseja sair do grupo "${currentGroup.name}"?`);
                if (confirmLeave) {
                    currentGroup.isMember = false;
                    currentGroup.membersCount--; // Simula a diminuição de membros
                    alert(`Você saiu do grupo "${currentGroup.name}". (Simulação)`);
                    // --- BACKEND: Enviar requisição para sair do grupo ---
                }
            } else {
                currentGroup.isMember = true;
                currentGroup.membersCount++; // Simula o aumento de membros
                alert(`Você participou do grupo "${currentGroup.name}"! (Simulação)`);
                // --- BACKEND: Enviar requisição para participar do grupo ---
            }
            renderGroupDetails(currentGroupId); // Atualiza os detalhes e o botão
            renderGroupList(); // Atualiza a lista para refletir a mudança
        }
    });

    // Lidar com o botão de Abrir Chat do Grupo
    openGroupChatBtn.addEventListener('click', () => {
        const currentGroup = allGroups.find(g => g.id === currentGroupId);
        if (currentGroup) {
            alert(`Abrindo chat para o grupo "${currentGroup.name}"... (Simulação)`);
            // --- Redirecionaria para a aba de mensagens, com o chat do grupo aberto ---
            // window.location.href = `mensagens.html?chatId=${currentGroup.id}`;
        }
    });

    // Lidar com o botão de Criar Novo Grupo
    createGroupBtn.addEventListener('click', () => {
        alert('Funcionalidade "Criar Novo Grupo" em desenvolvimento! (Simulação)');
        // --- Abriria um modal ou redirecionaria para um formulário de criação de grupo ---
    });

    // Lógica para busca de grupos (apenas frontend, básica)
    searchGroupInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        groupList.querySelectorAll('.group-item').forEach(item => {
            const name = item.querySelector('.group-name').textContent.toLowerCase();
            if (name.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Lidar com o botão de logout (já no social.js)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'Login.html'; // Redireciona para a página principal (feed)
        });
    }
});