// social.js

document.addEventListener('DOMContentLoaded', () => {
    // Lidar com a seleção de arquivos para a postagem
    const fileUpload = document.getElementById('file-upload');
    const fileNameSpan = document.getElementById('file-name');
    const filePreviewArea = document.getElementById('file-preview');
    let uploadedFiles = []; // Array para armazenar os arquivos a serem carregados

    fileUpload.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            uploadedFiles = Array.from(files); // Converte FileList para Array
            displayFileNames();
        } else {
            uploadedFiles = [];
            fileNameSpan.textContent = 'Nenhum arquivo selecionado';
            filePreviewArea.innerHTML = '';
        }
    });

    function displayFileNames() {
        fileNameSpan.textContent = `${uploadedFiles.length} arquivo(s) selecionado(s)`;
        filePreviewArea.innerHTML = ''; // Limpa a área de pré-visualização

        uploadedFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.classList.add('file-preview-item');

            let iconClass = 'fas fa-file'; // Ícone padrão
            if (file.type.includes('image')) {
                iconClass = 'fas fa-image';
            } else if (file.type.includes('pdf')) {
                iconClass = 'fas fa-file-pdf';
            } else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
                iconClass = 'fas fa-file-word';
            } else if (file.type.includes('presentation') || file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) {
                iconClass = 'fas fa-file-powerpoint';
            }

            fileItem.innerHTML = `
                <i class="${iconClass}"></i>
                <span>${file.name}</span>
                <span class="remove-file" data-index="${index}">&times;</span>
            `;
            filePreviewArea.appendChild(fileItem);
        });

        // Adiciona evento para remover arquivos
        filePreviewArea.querySelectorAll('.remove-file').forEach(button => {
            button.addEventListener('click', (e) => {
                const indexToRemove = parseInt(e.target.dataset.index);
                uploadedFiles.splice(indexToRemove, 1); // Remove o arquivo do array
                fileUpload.value = ''; // Limpa o input file para permitir selecionar o mesmo arquivo novamente
                displayFileNames(); // Atualiza a exibição
            });
        });
    }


    // Lidar com o botão de Publicar Postagem
    const publishPostBtn = document.getElementById('publish-post-btn');
    const postTextarea = document.getElementById('post-text');

    publishPostBtn.addEventListener('click', () => {
        const postContent = postTextarea.value.trim();
        if (postContent === '' && uploadedFiles.length === 0) {
            alert('Por favor, escreva algo ou anexe um arquivo antes de publicar!');
            return;
        }

        // --- AQUI ENTRARIA A LÓGICA DO BACKEND ---
        // Você enviaria 'postContent' e 'uploadedFiles' para o seu servidor.
        // O servidor lidaria com o salvamento no banco de dados e upload dos arquivos.

        console.log('Conteúdo da postagem:', postContent);
        console.log('Arquivos para upload:', uploadedFiles);

        alert('Sua postagem foi publicada! (Simulação)');
        postTextarea.value = ''; // Limpa o textarea
        uploadedFiles = []; // Limpa os arquivos selecionados
        fileNameSpan.textContent = 'Nenhum arquivo selecionado';
        filePreviewArea.innerHTML = '';
        fileUpload.value = ''; // Limpa o input file para permitir selecionar o mesmo arquivo novamente

        // Em uma aplicação real, você recarregaria o feed ou adicionaria a nova postagem dinamicamente.
    });


    // Função de exemplo para adicionar postagens dinamicamente (precisaria de dados do backend)
    function addPostToFeed(author, avatar, time, content, files = []) {
        const feedContainer = document.getElementById('feed-container');
        const newPostCard = document.createElement('div');
        newPostCard.classList.add('post-card');

        let fileHtml = '';
        files.forEach(file => {
            let iconClass = 'fas fa-file';
            if (file.type.includes('image')) iconClass = 'fas fa-image';
            else if (file.type.includes('pdf')) iconClass = 'fas fa-file-pdf';
            else if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) iconClass = 'fas fa-file-word';
            else if (file.type.includes('presentation') || file.name.endsWith('.ppt') || file.name.endsWith('.pptx')) iconClass = 'fas fa-file-powerpoint';

            fileHtml += `<a href="${file.url}" download><i class="${iconClass}"></i> ${file.name}</a><br>`;
        });


        newPostCard.innerHTML = `
            <div class="post-header">
                <img src="${avatar}" alt="Avatar Usuário" class="post-avatar">
                <div class="post-info">
                    <h4>${author}</h4>
                    <span>${time}</span>
                </div>
            </div>
            <div class="post-body">
                <p>${content}</p>
                ${fileHtml}
            </div>
            <div class="post-actions">
                <button><i class="fas fa-thumbs-up"></i> Curtir</button>
                <button><i class="fas fa-comment"></i> Comentar</button>
                <button><i class="fas fa-share"></i> Compartilhar</button>
            </div>
            <div class="comments-section">
                <input type="text" placeholder="Adicionar comentário..." class="comment-input">
            </div>
        `;
        // Adicionar no topo do feed
        feedContainer.prepend(newPostCard);
    }

    // Exemplo de como você chamaria addPostToFeed com dados reais após o backend salvar:
    // addPostToFeed('Novo Aluno', 'https://via.placeholder.com/50', 'Agora mesmo', 'Acabei de entrar na rede! Olá a todos!', [{name: 'Guia.pdf', url: 'caminho/para/guia.pdf', type: 'pdf'}]);

});