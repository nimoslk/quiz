const quizData = [
    { q: "HTML යනු කුමක්ද?", a: ["Hyper Text Markup Language", "High Tech Main Language", "Hyper Tool Multi Language", "Hidden Text Main Loop"], correct: 0 },
    { q: "CSS භාවිතා කරන්නේ කුමකටද?", a: ["ව්‍යුහය සැකසීමට", "හැඩගැන්වීමට (Styling)", "දත්ත ගබඩා කිරීමට", "Server එක හැසිරවීමට"], correct: 1 },
    { q: "JavaScript වල Variable එකක් පටන් ගන්නේ කුමන keyword එකෙන්ද?", a: ["var", "let", "const", "ඉහත සියල්ලම"], correct: 3 },
    { q: "Border color සැකසීමට භාවිතා කරන CSS property එක කුමක්ද?", a: ["color", "border-style", "border-color", "outline-color"], correct: 2 },
    { q: "පිටුවක background color එක රතු කිරීමට නිවැරදි CSS එක කුමක්ද?", a: ["color: red", "bg: red", "background-color: red", "back-color: red"], correct: 2 }
];

let currentIdx = 0;
let userAnswers = new Array(quizData.length).fill(null);
let timeLeft = 300;

const timerEl = document.getElementById("timer");
const timerInterval = setInterval(() => {
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;
    timerEl.innerText = `වේලාව: ${mins}:${secs < 10 ? '0'+secs : secs}`;
    if (timeLeft <= 0) { clearInterval(timerInterval); endQuiz(); }
    timeLeft--;
}, 1000);

function loadQuestion() {
    const qBox = quizData[currentIdx];
    document.getElementById("question-text").innerText = qBox.q;
    document.getElementById("progress").innerText = `Question ${currentIdx + 1} of ${quizData.length}`;
    
    const optionsEl = document.getElementById("options-container");
    optionsEl.innerHTML = "";
    qBox.a.forEach((opt, i) => {
        const btn = document.createElement("div");
        btn.innerText = opt;
        btn.className = `option-btn ${userAnswers[currentIdx] === i ? 'selected' : ''}`;
        btn.onclick = () => { userAnswers[currentIdx] = i; loadQuestion(); };
        optionsEl.appendChild(btn);
    });

    document.getElementById("submit-btn").classList.toggle("hide", currentIdx !== quizData.length - 1);
    updateNavDots();
}

function changeQuestion(step) {
    currentIdx += step;
    if (currentIdx < 0) currentIdx = 0;
    if (currentIdx >= quizData.length) currentIdx = quizData.length - 1;
    loadQuestion();
}

function updateNavDots() {
    const dotContainer = document.getElementById("nav-dots");
    dotContainer.innerHTML = "";
    quizData.forEach((_, i) => {
        const btn = document.createElement("button");
        btn.innerText = i + 1;
        if (userAnswers[i] !== null) btn.className = "dot-answered";
        btn.onclick = () => { currentIdx = i; loadQuestion(); };
        dotContainer.appendChild(btn);
    });
}

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quiz-box").classList.add("hide");
    document.getElementById("result-box").classList.remove("hide");

    let score = 0;
    userAnswers.forEach((ans, i) => { if (ans === quizData[i].correct) score++; });

    document.getElementById("score-text").innerHTML = `<h3>Score: ${(score/quizData.length)*100}% (${score}/${quizData.length})</h3>`;
}

loadQuestion();

function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("quiz-box").classList.add("hide");
    document.getElementById("result-box").classList.remove("hide");

    let score = 0;
    let reviewHTML = "<h3>ප්‍රතිඵල විශ්ලේෂණය:</h3>";

    userAnswers.forEach((ans, i) => {
        const correctIdx = quizData[i].correct;
        const isCorrect = (ans === correctIdx);
        
        if (isCorrect) {
            score++;
        }

    
        reviewHTML += `
            <div style="margin-bottom: 15px; padding: 10px; border-bottom: 1px solid #ddd; text-align: left;">
                <p><strong>${i + 1}. ${quizData[i].q}</strong></p>
                <p style="color: ${isCorrect ? 'green' : 'red'}; margin: 5px 0;">
                    ඔබේ පිළිතුර: ${ans !== null ? quizData[i].a[ans] : 'පිළිතුරක් ලබා දී නැත'} 
                    ${isCorrect ? '✔' : '❌'}
                </p>
                ${!isCorrect ? `<p style="color: green; font-weight: bold;">නිවැරදි පිළිතුර: ${quizData[i].a[correctIdx]}</p>` : ''}
            </div>
        `;
    });

    const percent = (score / quizData.length) * 100;
    document.getElementById("score-text").innerHTML = `<h2>ඔබේ ලකුණු සංඛ්‍යාව: ${percent}% (${score}/${quizData.length})</h2>`;
    document.getElementById("review-section").innerHTML = reviewHTML;
}