const questions = [
    {
        question: "Who is the Prime Minister of India?",
        answers: [
            { text: "Indira Gandhi", correct: false },
            { text: "APJ Kalam", correct: false },
            { text: "Sonia Gandhi", correct: false },
            { text: "Narendra Modi", correct: true }
        ]
    },
    {
        question: "Which is the largest planet in our Solar System?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Saturn", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Mars", correct: false }
        ]
    },
    {
        question: "Who is known as the Father of the Nation in India?",
        answers: [
            { text: "Bhagat Singh", correct: false },
            { text: "Subhash Chandra Bose", correct: false },
            { text: "Mahatma Gandhi", correct: true },
            { text: "Jawaharlal Nehru", correct: false }
        ]
    },
    {
        question: "Which is the capital of Australia?",
        answers: [
            { text: "Sydney", correct: false },
            { text: "Melbourne", correct: false },
            { text: "Canberra", correct: true },
            { text: "Brisbane", correct: false }
        ]
    },
    {
        question: "Which is the smallest prime number?",
        answers: [
            { text: "0", correct: false },
            { text: "1", correct: false },
            { text: "2", correct: true },
            { text: "3", correct: false }
        ]
    },
    {
        question: "What is the national animal of India?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Tiger", correct: true },
            { text: "Lion", correct: false },
            { text: "Peacock", correct: false }
        ]
    },
    {
        question: "Which is the fastest land animal?",
        answers: [
            { text: "Cheetah", correct: true },
            { text: "Tiger", correct: false },
            { text: "Leopard", correct: false },
            { text: "Horse", correct: false }
        ]
    },
    {
        question: "Which gas do humans need to breathe to survive?",
        answers: [
            { text: "Carbon Dioxide", correct: false },
            { text: "Oxygen", correct: true },
            { text: "Nitrogen", correct: false },
            { text: "Hydrogen", correct: false }
        ]
    },
    {
        question: "Which is the largest ocean in the world?",
        answers: [
            { text: "Indian Ocean", correct: false },
            { text: "Atlantic Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Which organ pumps blood in the human body?",
        answers: [
            { text: "Lungs", correct: false },
            { text: "Liver", correct: false },
            { text: "Brain", correct: false },
            { text: "Heart", correct: true }
        ]
    }
];



const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');

let currentQueIndex = 0;
let score = 0;

function startQuiz(){
    currentQueIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQueIndex];
    let currentQueNo = currentQueIndex + 1;
    questionElement.innerHTML = currentQueNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }else{
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleQuestion(){
    currentQueIndex++;
    if(currentQueIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQueIndex < questions.length){
        handleQuestion();
    }else {
        startQuiz();
    }
})

startQuiz();