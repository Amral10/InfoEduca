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
            name: 'Grupo de Estudos ENEM Biologia',
            avatar: 'https://via.placeholder.com/100/006CB5/FFFFFF?text=G1',
            description: 'Grupo focado em Biologia para o ENEM, com discussões, materiais e exercícios. Junte-se a nós para mandar bem na prova!',
            membersCount: 15,
            isMember: true, // Indica se o usuário atual é membro
            members: [
                { name: 'Maria Eduarda', avatar: 'https://via.placeholder.com/40/006CB5/FFFFFF?text=U1' },
                { name: 'João Pedro', avatar: 'https://via.placeholder.com/40/ED3237/FFFFFF?text=U2' },
                { name: 'Ana Carolina', avatar: 'https://via.placeholder.com/40/006CB5/FFFFFF?text=U3' },
                { name: 'Lucas Pereira', avatar: 'https://via.placeholder.com/40/ED3237/FFFFFF?text=U4' },
                { name: 'Sofia Mendes', avatar: 'https://via.placeholder.com/40/006CB5/FFFFFF?text=U5' },
                { name: 'Rafael Costa', avatar: 'https://via.placeholder.com/40/ED3237/FFFFFF?text=U6' },
                { name: 'Isabela Lima', avatar: 'https://via.placeholder.com/40/006CB5/FFFFFF?text=U7' },
            ],
            posts: [
                { author: 'Maria Eduarda', avatar: 'https://via.placeholder.com/50/006CB5/FFFFFF?text=A1', time: '5 horas atrás', content: 'Alguém tem material sobre Genética Mendeliana? Estou com dificuldade em alguns exercícios. #Biologia #Genética', files: [] },
                { author: 'João Pedro', avatar: 'https://via.placeholder.com/50/ED3237/FFFFFF?text=A2', time: '1 dia atrás', content: 'Acabei de postar um resumo completo sobre Ecologia no Drive do grupo. Dêem uma olhada! Link: <a href="#" target="_blank">Material_Ecologia_Completo.pdf</a>', files: [{ name: 'Material_Ecologia_Completo.pdf', url: '#', type: 'pdf' }] },
            ]
        },
        {
            id: 'grupo2',
            name: 'Projeto de História - Roma Antiga',
            avatar: 'https://via.placeholder.com/100/ED3237/FFFFFF?text=G2',
            description: 'Grupo para colaboração no projeto de História sobre Roma Antiga. Compartilhe suas descobertas e ajude a construir o melhor trabalho!',
            membersCount: 5,
            isMember: false,
            members: [
                { name: 'Laura Santos', avatar: 'https://via.placeholder.com/40/006CB5/FFFFFF?text=U8' },
                { name: 'Thiago Almeida', avatar: 'https://via.placeholder.com/40/ED3237/FFFFFF?text=U9' },
            ],
            posts: [
                { author: 'Laura Santos', avatar: 'https://via.placeholder.com/50/006CB5/FFFFFF?text=U8', time: '2 dias atrás', content: 'Encontrei um documentário excelente sobre a Queda do Império Romano. Vou compartilhar o link para o pessoal assistir. #História #RomaAntiga', files: [] },
            ]
        },
        {
            id: 'grupo3',
            name: 'Clube de Leitura de Literatura',
            avatar: 'https://via.placeholder.com/100/006CB5/FFFFFF?text=G3',
            description: 'Para quem ama ler! Discutimos clássicos, lançamentos e trocamos indicações de livros. Encontros semanais online.',
            membersCount: 22,
            isMember: true,
            members: [
                { name: 'Isabela Lima', avatar: 'https://via.placeholder.com/40/006CB5/FFFFFF?text=U7' },
                { name: 'Rafael Costa', avatar: 'https://via.placeholder.com/40/ED3237/FFFFFF?text=U6' },
                { name: 'Gabriela Dias', avatar: 'https://via.placeholder.com/40/006CB5/FFFFFF?text=U10' },
            ],
            posts: [
                { author: 'Isabela Lima', avatar: 'https://via.placeholder.com/50/006CB5/FFFFFF?text=U7', time: 'Ontem', content: 'Comecei a ler "Dom Casmurro" e estou adorando! Alguém já leu? Quais as impressões?', files: [] },
            ]
        },
        {
            id: 'grupo4',
            name: 'Matemática Avançada',
            avatar: 'https://via.placeholder.com/100/ED3237/FFFFFF?text=G4',
            description: 'Grupo para alunos que buscam aprofundamento em tópicos de Matemática, com foco em cálculo e álgebra linear.',
            membersCount: 8,
            isMember: false,
            members: [
                { name: 'Fernando Alves', avatar: 'https://via.placeholder.com/40/006CB5/FFFFFF?text=U11' },
            ],
            posts: []
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
            joinLeaveGroupBtn.innerHTML = group.isMember ? '<i class="fas fa-sign-out-alt"></i> Sair do Grupo' : '<i class="fas fa-sign-in-alt"></i> Participar';
            
            // Renderizar posts do grupo
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
                                <a href="${post.files[0].url}" download><i class="fas fa-file-${post.files[0].type}"></i> ${post.files[0].name}</a>
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
            alert('Você foi desconectado. (Simulação)');
            window.location.href = 'index.html'; // Redireciona para a página principal (feed)
        });
    }
});