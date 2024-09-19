const quiz = [
    {
        question: "What is the full form of HTML?",
        options: [
            "HyperText Markup Language",
            "Hyper Text Memory Language",
            "Both",
            "None"
        ],
        answer: "HyperText Markup Language"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Creative Style System",
            "Computer Style Sheets",
            "None of the above"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What does JS stand for?",
        options: [
            "JavaScript",
            "Java Style",
            "Jumbo Script",
            "None of the above"
        ],
        answer: "JavaScript"
    },
    {
        question: "Which HTML element is used to define an internal style sheet?",
        options: [
            "<style>",
            "<css>",
            "<script>",
            "<link>"
        ],
        answer: "<style>"
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: [
            "React",
            "Laravel",
            "Django",
            "None of the above"
        ],
        answer: "React"
    }
];

const quesnumber = document.getElementById("ques-no");
const quesel = document.getElementById("question-text");
const optionel = document.querySelectorAll(".option");
const timerel = document.getElementById("timer");
const nextbtn = document.getElementById("next");
const resultel = document.getElementById("result");
const scorel = document.getElementById("score");
let cq = 0; 
let sc = 0; 
let tl = 10;
let timer;
let answerselected = false;

function load() {
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
    
    const currentQuiz = quiz[cq];
    quesnumber.textContent = `Question ${cq + 1} of ${quiz.length}`;
    quesel.textContent = currentQuiz.question;
    
    optionel.forEach((option, index) => {
        option.textContent = currentQuiz.options[index];
        option.classList.remove("correct", "incorrect");
        option.onclick = () => selectOption(option);
    });

    tl = 10;
    timerel.textContent = tl;
    nextbtn.classList.add("hidden"); 
}

function updateTimer() {
    if (tl > 0) {
        tl--;
        timerel.textContent = tl;
    } else {
        clearInterval(timer);
        handleTimeout();
    }
}

function handleTimeout() {
    optionel.forEach(opt => {
        if (opt.textContent === quiz[cq].answer) {
            opt.classList.add("correct");
        }
    });
    nextbtn.classList.remove("hidden"); 
}
message=document.querySelector("#message");
function selectOption(option) {
    if (!answerselected) {
        answerselected = true;
        const selectedAnswer = option.textContent;
        const correctAnswer = quiz[cq].answer;
        
        if (selectedAnswer === correctAnswer) {
            option.classList.add("correct");
            message.textContent="Correct!";
            sc++; 
        } else {
            option.classList.add("incorrect");
            message.textContent="InCorrect!";
            optionel.forEach(opt => {
                if (opt.textContent === correctAnswer) {
                    opt.classList.add("correct");
                    
                    
                }
            });
        }
        
        clearInterval(timer);
        nextbtn.classList.remove("hidden"); 
    }
}

nextbtn.onclick = () => {
    answerselected = false;
    nextbtn.classList.add("hidden"); 
    if (cq < quiz.length - 1) {
        cq++; 
        load();
    } else {
        showResult();
    }
};

function showResult() {
    clearInterval(timer); 
    resultel.classList.remove("hidden");
    scorel.textContent = `Your score is ${sc} out of ${quiz.length}`;
}


load();
