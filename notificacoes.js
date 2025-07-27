// notificacoes.js

document.addEventListener('DOMContentLoaded', () => {
    const notificationList = document.getElementById('notification-list');
    const markAllReadBtn = document.getElementById('mark-all-read-btn');
    const noNotificationsMessage = document.getElementById('no-notifications-message');

    // --- SIMULAÇÃO DE DADOS DE NOTIFICAÇÕES ---
    // Em um cenário real, esses dados viriam de uma API do backend.
    let notificationsData = [
        {
            id: 'notif001',
            type: 'like',
            user: { name: 'Lucas Arruda', username: 'Luskinhas', avatar: 'Imagens ilustrativas/perfil-image-2.jpeg' },
            content: 'curtiu sua <a href="#">publicação</a>',
            time: '10 minutos atrás',
            read: false
        },
        {
            id: 'notif002',
            type: 'comment',
            user: { name: 'Davi Brito', username: 'Davi_Brito', avatar: 'Imagens ilustrativas/perfil-image-6.jpeg' },
            content: 'comentou na sua <a href="#">publicação</a>',
            time: '30 minutos atrás',
            read: false
        },
        {
            id: 'notif003',
            type: 'group_invite',
            user: { name: 'Amaral', username: 'Amral10', avatar: 'Imagens ilustrativas/perfil-image-1.jpeg' },
            content: 'te convidou para o grupo <a href="grupos.html">"Matemática Avançada"</a>',
            time: '1 hora atrás',
            read: false
        },
        {
            id: 'notif004',
            type: 'message',
            user: { name: 'grazy', username: 'Grazy', avatar: 'Imagens ilustrativas/perfil-image-5.jpeg' },
            content: 'enviou uma <a href="mensagens.html">nova mensagem</a> para você',
            time: '2 horas atrás',
            read: true // Exemplo de notificação já lida
        },
        {
            id: 'notif005',
            type: 'mention',
            user: { name: 'Amaral', username: 'Amral10', avatar: 'Imagens ilustrativas/perfil-image-1.jpeg' },
            content: 'mencionou você em uma <a href="#">publicação</a>',
            time: '1 dia atrás',
            read: true
        },
    ];

    // --- FUNÇÃO PARA RENDERIZAR AS NOTIFICAÇÕES ---
    const renderNotifications = () => {
        notificationList.innerHTML = ''; // Limpa o container

        if (notificationsData.length === 0) {
            noNotificationsMessage.style.display = 'block';
            markAllReadBtn.style.display = 'none'; // Esconde o botão se não houver notificações
            return;
        } else {
            noNotificationsMessage.style.display = 'none';
            markAllReadBtn.style.display = 'inline-block'; // Mostra o botão
        }

        // Ordena para exibir não lidas primeiro
        notificationsData.sort((a, b) => (a.read === b.read) ? 0 : a.read ? 1 : -1);

        notificationsData.forEach(notif => {
            const notificationItem = document.createElement('li');
            notificationItem.classList.add('notification-item');
            if (!notif.read) {
                notificationItem.classList.add('unread');
            }
            notificationItem.dataset.notificationId = notif.id;

            notificationItem.innerHTML = `
                <img src="${notif.user.avatar}" alt="Avatar ${notif.user.name}" class="notification-avatar">
                <div class="notification-content">
                    <p><strong>${notif.user.name}</strong> ${notif.content}. <span class="notification-time">${notif.time}</span></p>
                </div>
                <button class="mark-read-btn" title="Marcar como lida">
                    <i class="${notif.read ? 'fas fa-circle' : 'fas fa-circle-dot'}"></i>
                </button>
            `;
            notificationList.appendChild(notificationItem);
        });

        addNotificationButtonListeners();
    };

    // --- FUNÇÃO PARA ADICIONAR LISTENERS AOS BOTÕES DE NOTIFICAÇÃO ---
    const addNotificationButtonListeners = () => {
        notificationList.querySelectorAll('.mark-read-btn').forEach(button => {
            button.onclick = null; // Evita duplicação de listeners
            button.addEventListener('click', (e) => {
                const notificationId = e.currentTarget.closest('.notification-item').dataset.notificationId;
                const notification = notificationsData.find(n => n.id === notificationId);

                if (notification && !notification.read) {
                    notification.read = true; // Marca como lida (simulado)
                    renderNotifications(); // Re-renderiza a lista
                }
            });
        });
    };

    // --- EVENT LISTENER PARA MARCAR TODAS COMO LIDAS ---
    markAllReadBtn.addEventListener('click', () => {
        const unreadNotificationsExist = notificationsData.some(notif => !notif.read);
        if (unreadNotificationsExist) {
            const confirmAllRead = confirm('Tem certeza que deseja marcar todas as notificações como lidas?');
            if (confirmAllRead) {
                notificationsData.forEach(notif => notif.read = true); // Marca todas como lidas
                renderNotifications(); // Re-renderiza
            }
        } else {

        }
    });

    // Lidar com o botão de logout (já no social.js)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'login.html';
        });
    }

    // Carrega as notificações ao carregar a página
    renderNotifications();
});