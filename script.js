
const perguntas = [
    {
        pergunta: "O que pode significar quando um gato ronrona?",
        respostas: [
            "A. Pode estar confortável e feliz",
            "B. Tem sempre fome",
            "C. Quer sempre sair de casa"
        ],
        correta: 0
    },
    {
        pergunta: "O que deve estar sempre disponível para um gato?",
        respostas: [
            "A. Chocolate",
            "B. Água fresca",
            "C. Café"
        ],
        correta: 1
    },
    {
        pergunta: "Para que servem os bigodes dos gatos?",
        respostas: [
            "A. Para sentir o espaço à sua volta",
            "B. Para ouvir música",
            "C. Para respirar debaixo de água"
        ],
        correta: 0
    },
    {
        pergunta: "Como devemos aproximar-nos de um gato desconhecido?",
        respostas: [
            "A. A correr na direção dele",
            "B. A agarrá-lo imediatamente",
            "C. Com calma e respeitando o espaço dele"
        ],
        correta: 2
    },
    {
        pergunta: "O que devemos fazer para cuidar da saúde de um gato?",
        respostas: [
            "A. Dar-lhe medicamentos humanos sem orientação",
            "B. Acompanhar a sua saúde com um veterinário",
            "C. Nunca o levar ao veterinário"
        ],
        correta: 1
    }
];

let numeroPergunta = 0;
let pontuacao = 0;
let respondeu = false;

const elementoPergunta = document.getElementById("pergunta");
const elementoRespostas = document.getElementById("respostas");
const elementoResultado = document.getElementById("resultado");
const elementoSeguinte = document.getElementById("seguinte");
const elementoProgresso = document.getElementById("progresso");
const elementoPontuacao = document.getElementById("pontuacao");

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[numeroPergunta];

    elementoPergunta.textContent = atual.pergunta;
    elementoRespostas.innerHTML = "";
    elementoResultado.textContent = "";

    elementoProgresso.textContent =
        `Pergunta ${numeroPergunta + 1} de ${perguntas.length}`;

    elementoPontuacao.textContent = `⭐ ${pontuacao} pontos`;
    elementoSeguinte.hidden = true;

    atual.respostas.forEach((resposta, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.textContent = resposta;
        botao.addEventListener("click", () => responder(indice));

        elementoRespostas.appendChild(botao);
    });
}

function responder(indice) {
    if (respondeu) return;

    respondeu = true;

    const atual = perguntas[numeroPergunta];
    const botoes = elementoRespostas.querySelectorAll("button");

    botoes.forEach(botao => {
        botao.disabled = true;
    });

    if (indice === atual.correta) {
        pontuacao++;

        elementoResultado.textContent =
            "🎉 Muito bem! Acertaste!";
    } else {
        elementoResultado.textContent =
            "🐾 Não foi desta vez! " +
            atual.respostas[atual.correta];
    }

    elementoPontuacao.textContent = `⭐ ${pontuacao} pontos`;

    elementoSeguinte.textContent =
        numeroPergunta === perguntas.length - 1
            ? "Ver resultado 🏆"
            : "Próxima pergunta →";

    elementoSeguinte.hidden = false;
}

function proximaPergunta() {
    if (!respondeu) return;

    if (numeroPergunta < perguntas.length - 1) {
        numeroPergunta++;
        mostrarPergunta();
    } else {
        mostrarResultadoFinal();
    }
}

function mostrarResultadoFinal() {
    elementoPergunta.textContent = "Terminaste o desafio! 🐱";
    elementoRespostas.innerHTML = "";
    elementoProgresso.textContent = "Quiz terminado";

    let mensagem = "";

    if (pontuacao === perguntas.length) {
        mensagem = "És um verdadeiro especialista em gatos!";
    } else if (pontuacao >= 3) {
        mensagem = "Muito bem! Sabes bastante sobre gatos!";
    } else {
        mensagem = "Continua a aprender. Cada dia é uma descoberta!";
    }

    elementoResultado.textContent =
        `Acertaste em ${pontuacao} de ${perguntas.length} perguntas. ${mensagem}`;

    elementoSeguinte.textContent = "Jogar novamente 🔄";
    elementoSeguinte.hidden = false;
    elementoSeguinte.onclick = reiniciarQuiz;
}

function reiniciarQuiz() {
    numeroPergunta = 0;
    pontuacao = 0;

    elementoSeguinte.onclick = proximaPergunta;

    mostrarPergunta();
}

elementoSeguinte.addEventListener("click", proximaPergunta);

mostrarPergunta();
