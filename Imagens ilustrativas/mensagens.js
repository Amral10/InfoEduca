// mensagens.js

document.addEventListener('DOMContentLoaded', () => {
    const conversationList = document.getElementById('conversation-list');
    const chatMessagesArea = document.getElementById('chat-messages-area');
    const messageInput = document.getElementById('message-input');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const currentChatName = document.getElementById('current-chat-name');
    const chatPartnerAvatar = document.querySelector('.chat-partner-avatar'); // Pega o avatar do cabeçalho do chat

    // Função para rolar para o final da área de mensagens
    const scrollToBottom = () => {
        chatMessagesArea.scrollTop = chatMessagesArea.scrollHeight;
    };

    // Dados de conversas e mensagens (simulação - em produção viriam do backend)
    const allConversations = [
        {
            id: 'chat1',
            name: 'Amaral',
            avatar: 'Imagens ilustrativas/perfil-image-1.jpeg',
            messages: [
                { sender: 'Amaral', avatar: 'Imagens ilustrativas/perfil-image-1.jpeg', content: 'Olá! Conseguiu resolver a questão de física que te enviei?', time: '14:28' },
                { sender: 'Eu', avatar: 'Imagens ilustrativas/perfil-image-3.jpeg', content: 'Oii! Ainda não olhei com calma, mas vou tentar agora à tarde. Era aquela de eletrodinâmica?', time: '14:30' },
                { sender: 'Amaral', avatar: 'Imagens ilustrativas/perfil-image-1.jpeg', content: 'Isso mesmo! Qualquer coisa, me avisa que posso tentar te ajudar.', time: '14:31' },
                { sender: 'Eu', avatar: 'Imagens ilustrativas/perfil-image-3.jpeg', content: 'Combinado! Assim que tiver novidades, te falo.', time: '14:32' },
                { sender: 'Amaral', avatar: 'Imagens ilustrativas/perfil-image-1.jpeg', content: 'Perfeito!', time: '14:35' },
            ]
        },
        {
            id: 'chat2',
            name: 'Lucas Moraes',
            avatar: 'Imagens ilustrativas/perfil-image-2.jpeg',
            messages: [
                { sender: 'Lucas Moraes', avatar: 'Imagens ilustrativas/perfil-image-2.jpeg', content: 'E aí, tudo certo para a prova de matemática de amanhã?', time: 'Ontem 20:00' },
                { sender: 'Eu', avatar: 'Imagens ilustrativas/perfil-image-3.jpeg', content: 'Sim, estou revisando os últimos tópicos. Você conseguiu entender a parte de funções quadráticas?', time: 'Ontem 20:15' },
                { sender: 'Lucas Moraes', avatar: 'Imagens ilustrativas/perfil-image-2.jpeg', content: 'Mais ou menos. Tive um pouco de dificuldade com os gráficos. Podemos revisar juntos amanhã antes da aula?', time: 'Ontem 20:20' },
                { sender: 'Eu', avatar: 'Imagens ilustrativas/perfil-image-3.jpeg', content: 'Com certeza! Chego uns 20min mais cedo.', time: 'Ontem 20:25' },
            ]
        },
        
    ];

    let currentChatId = 'chat1'; // Inicia com a primeira conversa ativa

    // Função para renderizar as mensagens de uma conversa
    const renderMessages = (chatId) => {
        chatMessagesArea.innerHTML = ''; // Limpa as mensagens anteriores
        const chat = allConversations.find(c => c.id === chatId);

        if (chat) {
            currentChatName.textContent = chat.name;
            chatPartnerAvatar.src = chat.avatar; // Atualiza o avatar no cabeçalho do chat

            chat.messages.forEach(msg => {
                const messageBubble = document.createElement('div');
                messageBubble.classList.add('message-bubble');
                // Adiciona 'sent' se for "Eu", 'received' caso contrário (simples para este exemplo)
                messageBubble.classList.add(msg.sender === 'Eu' ? 'sent' : 'received');

                // Aqui, 'ME' é o avatar do usuário logado, outros avatares são dos remetentes
                const avatarSrc = (msg.sender === 'Eu') ? 'Imagens ilustrativas/perfil-image-3.jpeg' : msg.avatar;

                messageBubble.innerHTML = `
                    ${msg.sender !== 'Eu' ? `<img src="${avatarSrc}" alt="Avatar" class="message-avatar">` : ''}
                    <div class="message-content">
                        ${msg.sender !== 'Eu' ? `<p class="message-sender-name">${msg.sender}</p>` : ''}
                        <p>${msg.content}</p>
                        <span class="message-timestamp">${msg.time}</span>
                    </div>
                    ${msg.sender === 'Eu' ? `<img src="${avatarSrc}" alt="Meu Avatar" class="message-avatar">` : ''}
                `;
                 // Adiciona nome do remetente apenas para mensagens recebidas (se não for "Eu")
                 if (msg.sender !== 'Eu' && chat.name.includes('Grupo')) { // Mostra nome em grupos ou para outros em chat 1-1
                    messageBubble.querySelector('.message-content').insertAdjacentHTML('afterbegin', `<p class="message-sender-name">${msg.sender}</p>`);
                    // Ajuste o estilo de message-sender-name no CSS se necessário
                }


                chatMessagesArea.appendChild(messageBubble);
            });
            scrollToBottom();
        }
    };

    // Função para renderizar a lista de conversas
    const renderConversationList = () => {
        conversationList.innerHTML = ''; // Limpa a lista
        allConversations.forEach(conv => {
            const conversationItem = document.createElement('li');
            conversationItem.classList.add('conversation-item');
            if (conv.id === currentChatId) {
                conversationItem.classList.add('active');
            }
            conversationItem.dataset.chatId = conv.id;

            const lastMsg = conv.messages[conv.messages.length - 1];
            conversationItem.innerHTML = `
                <img src="${conv.avatar}" alt="Avatar" class="conversation-avatar">
                <div class="conversation-info">
                    <span class="conversation-name">${conv.name}</span>
                    <span class="last-message">${lastMsg.sender === 'Eu' ? 'Você: ' : ''}${lastMsg.content}</span>
                </div>
                <span class="message-time">${lastMsg.time}</span>
            `;
            conversationList.appendChild(conversationItem);

            conversationItem.addEventListener('click', () => {
                // Remove 'active' da conversa anterior
                const prevActive = document.querySelector('.conversation-item.active');
                if (prevActive) {
                    prevActive.classList.remove('active');
                }
                // Adiciona 'active' à conversa clicada
                conversationItem.classList.add('active');
                currentChatId = conv.id;
                renderMessages(currentChatId); // Renderiza as mensagens da nova conversa
            });
        });
    };

    // Inicializa a lista de conversas e a primeira conversa
    renderConversationList();
    renderMessages(currentChatId);

    // Lidar com o envio de mensagens
    sendMessageBtn.addEventListener('click', () => {
        const messageText = messageInput.value.trim();
        if (messageText) {
            const currentChat = allConversations.find(c => c.id === currentChatId);
            if (currentChat) {
                const now = new Date();
                const time = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
                const newMessage = {
                    sender: 'Eu',
                    avatar: 'Imagens ilustrativas/perfil-image-3.jpeg', // Seu avatar
                    content: messageText,
                    time: time
                };
                currentChat.messages.push(newMessage); // Adiciona ao array de mensagens (temporário)

                // Renderiza a nova mensagem
                const messageBubble = document.createElement('div');
                messageBubble.classList.add('message-bubble', 'sent');
                messageBubble.innerHTML = `
                    <div class="message-content">
                        <p>${newMessage.content}</p>
                        <span class="message-timestamp">${newMessage.time}</span>
                    </div>
                    <img src="${newMessage.avatar}" alt="Meu Avatar" class="message-avatar">
                `;
                chatMessagesArea.appendChild(messageBubble);

                messageInput.value = ''; // Limpa o input
                scrollToBottom();

                // --- AQUI ENTRARIA A LÓGICA DO BACKEND/WEBSOCKETS ---
                // Você enviaria a mensagem para o servidor via WebSocket ou uma API REST.
                // O servidor então a salvaria no banco de dados e a retransmitiria
                // para o destinatário/grupo em tempo real.
                console.log('Mensagem enviada (simulação):', newMessage);
            }
        }
    });

    // Permitir enviar mensagem com Enter
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessageBtn.click(); // Simula o clique no botão de enviar
        }
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

    // Lógica para busca de conversas (apenas frontend, básica)
    const searchConversationInput = document.getElementById('search-conversation-input');
    searchConversationInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        conversationList.querySelectorAll('.conversation-item').forEach(item => {
            const name = item.querySelector('.conversation-name').textContent.toLowerCase();
            const lastMessage = item.querySelector('.last-message').textContent.toLowerCase();
            if (name.includes(searchTerm) || lastMessage.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
});