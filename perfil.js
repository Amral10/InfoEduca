// perfil.js

document.addEventListener('DOMContentLoaded', () => {
    // Referência ao elemento de input de arquivo para o avatar
    const uploadAvatarInput = document.getElementById('upload-avatar');
    // Referência ao elemento da imagem do avatar
    const userProfileAvatar = document.getElementById('user-profile-avatar');

    // Event listener para quando o usuário seleciona um arquivo de imagem
    uploadAvatarInput.addEventListener('change', (event) => {
        const file = event.target.files[0]; // Pega o primeiro arquivo selecionado

        if (file) {
            // Cria um URL para o arquivo selecionado
            const reader = new FileReader();
            reader.onload = (e) => {
                // Define o src da imagem do avatar para o URL do arquivo
                userProfileAvatar.src = e.target.result;
            };
            reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
        }
    });

    // Lidar com o botão "Editar Perfil"
    const editProfileBtn = document.getElementById('edit-profile-btn');
    editProfileBtn.addEventListener('click', () => {
        // --- AQUI ENTRARIA A LÓGICA DO BACKEND PARA CARREGAR OS DADOS DO PERFIL PARA EDIÇÃO ---
        // Em uma aplicação real, isso abriria um modal/formulário de edição,
        // preenchido com os dados atuais do usuário, que seriam então enviados ao backend.
        alert('Funcionalidade de edição de perfil em desenvolvimento! (Simulação)');
        // Ou você pode redirecionar para uma página de edição:
        // window.location.href = 'editar-perfil.html';
    });

    // Lidar com o botão "Excluir Conta"
    const deleteAccountBtn = document.querySelector('.delete-account-btn');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            const confirmDelete = confirm('Tem certeza que deseja excluir sua conta? Esta ação é irreversível.');
            if (confirmDelete) {
                // --- AQUI ENTRARIA A LÓGICA DO BACKEND PARA EXCLUIR A CONTA DO USUÁRIO ---
                // Isso normalmente envolveria enviar uma requisição DELETE para o servidor.
                alert('Sua conta foi excluída com sucesso! (Simulação)');
                // Após a exclusão, redirecionar para a página inicial ou de login.
                // window.location.href = '/';
            }
        });
    }

    // Lidar com o botão de logout (já no social.js, mas mantido aqui para referência se for um arquivo separado)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // --- AQUI ENTRARIA A LÓGICA DO BACKEND PARA LOGOUT ---
            alert('Você foi desconectado. (Simulação)');
            window.location.href = 'index.html'; // Redireciona para a página principal (feed)
        });
    }


    // --- Lógica para popular dados do perfil (simulação) ---
    // Em um cenário real, você faria uma requisição AJAX/Fetch para o backend
    // para obter os dados do usuário logado e preencheria a página.
    function loadProfileData() {
        // Dados de exemplo (substituir por dados reais do backend)
        const userData = {
            name: "Polly",
            tagline: "Apaixonada por Ciências Humanas",
            avatarUrl: "Imagens ilustrativas/Perfil-image-3.jpeg",
            email: "Pollyana.saoli123@gmail.com",
            dob: "11/06/2008",
            city: "Teixeira de Freitas - BA",
            institution: "Centro Territorial de Educação Profissional do Extremo Sul",
            interests: "Matematica, História, Química, Literatura, Redação",
            postsCount: 4,
            groupsCount: 10,
            connectionsCount: 150
        };

        document.getElementById('user-profile-avatar').src = userData.avatarUrl;
        document.getElementById('user-profile-name').textContent = userData.name;
        document.getElementById('user-profile-tagline').textContent = userData.tagline;
        document.getElementById('user-email').textContent = userData.email;
        document.getElementById('user-dob').textContent = userData.dob;
        document.getElementById('user-city').textContent = userData.city;
        document.getElementById('user-institution').textContent = userData.institution;
        document.getElementById('user-interests').textContent = userData.interests;
        document.getElementById('stat-posts').textContent = userData.postsCount;
        document.getElementById('stat-groups').textContent = userData.groupsCount;
        document.getElementById('stat-connections').textContent = userData.connectionsCount;
    }

    loadProfileData(); // Carrega os dados do perfil ao carregar a página

    // --- Lógica para popular "Minhas Publicações" (simulação) ---
    // Em um cenário real, você faria outra requisição AJAX/Fetch para o backend
    // para obter apenas as postagens do usuário logado.
    function loadMyPosts() {
        const myPostsContainer = document.getElementById('my-posts-container');
        // Limpar posts existentes para evitar duplicação em uma SPA
        // myPostsContainer.innerHTML = '';

        // Exemplo de como você adicionaria postagens dinamicamente
        // Esta função seria semelhante à 'addPostToFeed' que foi mostrada no social.js
        // e receberia dados do backend.
        // Já existem dois exemplos estáticos no HTML para ilustração.
        // Aqui você faria um loop sobre os dados das postagens do usuário:
        /*
        const myPostData = [
            { id: 1, author: "Nome do Aluno", avatar: "https://via.placeholder.com/50/006CB5/FFFFFF?text=AVATAR", time: "1 dia atrás", content: "Nova dica de estudo para Biologia!", files: [] },
            { id: 2, author: "Nome do Aluno", avatar: "https://via.placeholder.com/50/006CB5/FFFFFF?text=AVATAR", time: "3 dias atrás", content: "Compartilhei um resumo de história", files: [{name: 'Historia_Brasil.pdf', url: 'path/to/pdf', type: 'pdf'}] }
        ];

        myPostData.forEach(post => {
            // Recriar a estrutura do post-card e adicionar ao myPostsContainer
            // Adapte a função addPostToFeed do social.js para aceitar um botão de exclusão
            // ou crie uma nova função aqui.
        });
        */

        // Adicionar listeners para o botão de exclusão de postagem
        myPostsContainer.querySelectorAll('.action-delete').forEach(button => {
            button.addEventListener('click', (e) => {
                const confirmDeletePost = confirm('Tem certeza que deseja excluir esta publicação?');
                if (confirmDeletePost) {
                    // --- AQUI ENTRARIA A LÓGICA DO BACKEND PARA EXCLUIR A POSTAGEM ---
                    // e.target.closest('.post-card').remove(); // Remover do DOM após sucesso do backend
                    alert('Publicação excluída! (Simulação)');
                }
            });
        });
    }

    loadMyPosts(); // Carrega as postagens do usuário
});