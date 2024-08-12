const questions = [
    {
        question: "¿Cuáles son las 4 categorías que clasifica EPP de Arc Flash?",
        options: ["A) 4cal/cm2,  8cal/cm2,  25cal/cm2, 40cal/cm2", "B) 4cal/cm2,  18cal/cm2,  25cal/cm2,  40cal/cm2", "C) 4cal/cm2,  10cal/cm2,  25cal/cm2,  40cal/cm2", "D) 4cal/cm2,  18cal/cm2,  30cal/cm2,  40cal/cm2"],
        answer: 0
    },
    {
        question: "¿Cuáles son los Riesgos Eléctricos?",
        options: ["A) Cortadura Eléctrica y Arcamiento Eléctrico", "B) Choque Eléctrico y Arco Eléctrico", "C) Moldeadura Eléctrica y Insolación Eléctrica", "D) Trauma Eléctrica y Contusión Eléctrica"],
        answer: 1
    },
    {
        question: "¿Qué nivel de Voltaje se considera peligroso en General Motors?",
        options: ["Después de 110 V.C.A.", "Después de 50 V.C.A.", "Después de 220 V.C.A.", "Después de 30 V.C.A."],
        answer: 1
    },
    {
        question: "¿Para qué nivel de voltaje está recomendada la herramienta dieléctrica?",
        options: ["Para 220 Volts.", "Para 480 Volts.", "Para 1000 Volts.", "Para 500 Volts."],
        answer: 2
    },
    {
        question: "¿A qué distancia en 480 Volts puede generarse un arco eléctrico?",
        options: ["A 10 pulgadas", "A 1 pulgada", "A 7 pulgadas", "A 10 centímetros"],
        answer: 1
    },
    {
        question: "¿Cuál es un dispositivo de control de energías peligrosas?",
        options: ["Cortina de luz", "Botón de Paro de Emergencia", "Sensor de Presencia", "Todas las anteriores"],
        answer: 3
    }
];

let currentQuestion = null;

function onFlagClick(value) {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const buttonContainer = document.getElementById("flag-container");

    // Selecciona una pregunta aleatoria
    const randomIndex = Math.floor(Math.random() * questions.length);
    currentQuestion = questions[randomIndex];
    
    questionContainer.innerHTML = currentQuestion.question;
    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });

    buttonContainer.style.display = "none";
    questionContainer.style.display = "block";
    optionsContainer.style.display = "block";
}

function checkAnswer(selected) {
    const resultModal = document.getElementById("resultModal");
    const resultMessage = document.getElementById("resultMessage");
    const correctSound = document.getElementById("correctSound");
    const incorrectSound = document.getElementById("incorrectSound");

    if (selected === currentQuestion.answer) {
        resultMessage.textContent = "¡Correcto!";
        correctSound.play(); // Reproducir sonido correcto
        showConfetti(); // Mostrar confeti si la respuesta es correcta
    } else {
        resultMessage.textContent = "Incorrecto.";
        incorrectSound.play(); // Reproducir sonido incorrecto
        showSadFaces(); // Mostrar caritas tristes si la respuesta es incorrecta
    }
    resultModal.style.display = "block";
}

function closeModal() {
    const resultModal = document.getElementById("resultModal");
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("options");
    const buttonContainer = document.getElementById("flag-container");

    resultModal.style.display = "none";
    questionContainer.style.display = "none";
    optionsContainer.style.display = "none";
    buttonContainer.style.display = "flex";
    
    currentQuestion = null;
}

function showConfetti() {
    // Crear el elemento de confeti
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    document.body.appendChild(confetti);

    // Generar confeti
    for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.backgroundColor = getRandomColor();
        confettiPiece.style.left = `${Math.random() * 100}vw`;
        confettiPiece.style.top = `${Math.random() * 100}vh`;
        confettiPiece.style.animationDelay = `${Math.random() * 2}s`;
        confetti.appendChild(confettiPiece);
    }

    // Ocultar confeti después de un tiempo
    setTimeout(() => {
        document.body.removeChild(confetti);
    }, 5000);
}

function showSadFaces() {
    const container = document.getElementById('sad-faces-container');
    container.innerHTML = ''; // Limpiar contenedor antes de agregar nuevas caritas

    for (let i = 0; i < 20; i++) { // Ajusta la cantidad según sea necesario
        const sadFace = document.createElement('div');
        sadFace.className = 'sad-face';
        sadFace.style.left = `${Math.random() * 100}vw`;
        sadFace.style.animationDuration = `${Math.random() * 2 + 3}s`;
        container.appendChild(sadFace);

        // Eliminar el elemento después de que la animación termine
        sadFace.addEventListener('animationend', () => {
            container.removeChild(sadFace);
        });
    }
}

function getRandomColor() {
    const colors = ['#ff6347', '#ff4500', '#ff8c00', '#ffd700', '#32cd32', '#1e90ff'];
    return colors[Math.floor(Math.random() * colors.length)];
}
