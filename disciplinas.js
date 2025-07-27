// disciplinas.js

document.addEventListener('DOMContentLoaded', () => {
    const disciplineCards = document.querySelectorAll('.content-card[data-discipline]');

    // Adiciona o ouvinte de clique para cada card
    disciplineCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Impede que o clique no card se propague para o document e feche imediatamente
            event.stopPropagation();

            // Fecha todos os outros cards abertos
            disciplineCards.forEach(otherCard => {
                if (otherCard !== card) { // Não fecha o card clicado
                    otherCard.classList.remove('active');
                }
            });

            // Alterna a classe 'active' no card clicado.
            // O CSS se encarregará das transições de visibilidade dos links.
            card.classList.toggle('active');
        });
    });

    // Adiciona um ouvinte de clique no documento inteiro
    document.addEventListener('click', (event) => {
        // Verifica se o clique não foi dentro de nenhum card de disciplina
        // e se não foi um elemento que faz parte de um card de disciplina
        let clickedInsideCard = false;
        disciplineCards.forEach(card => {
            if (card.contains(event.target)) {
                clickedInsideCard = true;
            }
        });

        // Se o clique foi fora de qualquer card, fecha todos os cards abertos
        if (!clickedInsideCard) {
            disciplineCards.forEach(card => {
                card.classList.remove('active');
            });
        }
    });
});