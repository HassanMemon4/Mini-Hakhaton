const questions = [
            {
                question: "What does HTML stand for?",
                options: [
                    "Hyper Text Markup Language",
                    "High Text Machine Language",
                    "Hyper Tool Multi Language",
                    "None of these"
                ],
                correct: 0
            },
            {
                question: "JavaScript is a ______ language.",
                options: ["Markup", "Styling", "Programming", "Database"],
                correct: 2
            },
            {
                question: "Which symbol is used for comments in JavaScript?",
                options: ["//", "/* */", "Both // and /* */", "#"],
                correct: 2
            },
            {
                question: "What is the correct way to declare a variable in JavaScript?",
                options: [
                    "variable x = 5",
                    "let x = 5",
                    "v x = 5",
                    "declare x = 5"
                ],
                correct: 1
            },
            {
                question: "Which method is used to add an element at the end of an array?",
                options: ["push()", "pop()", "shift()", "unshift()"],
                correct: 0
            },
            {
                question: "What does CSS stand for?",
                options: [
                    "Cascading Style Sheets",
                    "Computer Style Sheets",
                    "Creative Style Sheets",
                    "Colorful Style Sheets"
                ],
                correct: 0
            },
            {
                question: "Which of the following is NOT a JavaScript data type?",
                options: ["String", "Boolean", "Float", "Undefined"],
                correct: 2
            },
            {
                question: "What is the output of: typeof null",
                options: ["null", "undefined", "object", "number"],
                correct: 2
            }
        ];

        let currentIndex = 0;
        let totalScore = 0;
        let userAnswer = null;
        let timeLeft = 15;
        let countdown;
        let isAnswered = false;

        function startCountdown() {
            timeLeft = 15;
            document.getElementById('timeValue').textContent = timeLeft;
            document.getElementById('timerDisplay').classList.remove('warning');
            
            countdown = setInterval(() => {
                timeLeft--;
                document.getElementById('timeValue').textContent = timeLeft;
                
                if (timeLeft <= 5) {
                    document.getElementById('timerDisplay').classList.add('warning');
                }
                
                if (timeLeft <= 0) {
                    stopCountdown();
                    if (!isAnswered) {
                        showCorrectAnswer();
                    }
                }
            }, 1000);
        }

        function stopCountdown() {
            clearInterval(countdown);
        }

        function showCorrectAnswer() {
            isAnswered = true;
            const answerButtons = document.querySelectorAll('.answer-item');
            const rightAnswer = questions[currentIndex].correct;
            
            answerButtons.forEach((btn, idx) => {
                btn.disabled = true;
                if (idx === rightAnswer) {
                    btn.classList.add('correct');
                }
            });
            
            document.getElementById('nextButton').disabled = false;
        }

        function showQuestion() {
            isAnswered = false;
            const currentQ = questions[currentIndex];
            document.getElementById('questionDisplay').textContent = currentQ.question;
            
            const listContainer = document.getElementById('answerList');
            listContainer.innerHTML = '';
            
            currentQ.options.forEach((opt, idx) => {
                const btn = document.createElement('button');
                btn.className = 'answer-item';
                btn.textContent = opt;
                btn.onclick = () => checkAnswer(idx);
                listContainer.appendChild(btn);
            });
            
            userAnswer = null;
            document.getElementById('nextButton').disabled = true;
            startCountdown();
        }

        function checkAnswer(idx) {
            if (isAnswered) return;
            
            stopCountdown();
            isAnswered = true;
            userAnswer = idx;
            
            const answerButtons = document.querySelectorAll('.answer-item');
            const rightAnswer = questions[currentIndex].correct;
            
            answerButtons.forEach((btn, i) => {
                btn.disabled = true;
                
                if (i === rightAnswer) {
                    btn.classList.add('correct');
                }
                
                if (i === userAnswer && userAnswer !== rightAnswer) {
                    btn.classList.add('wrong');
                }
            });
            
            if (userAnswer === rightAnswer) {
                totalScore++;
            }
            
            document.getElementById('nextButton').disabled = false;
        }

        function moveToNext() {
            currentIndex++;
            
            if (currentIndex < questions.length) {
                showQuestion();
            } else {
                displayResult();
            }
        }

        function displayResult() {
            stopCountdown();
            document.getElementById('quizSection').classList.add('hide');
            document.getElementById('resultSection').classList.remove('hide');
            
            const percent = Math.round((totalScore / questions.length) * 100);
            document.getElementById('finalScore').textContent = `${totalScore} / ${questions.length}`;
            
            let feedback = '';
            if (percent >= 80) {
                feedback = 'Outstanding! You really know your JavaScript!';
            } else if (percent >= 60) {
                feedback = 'Great work! Keep it up!';
            } else if (percent >= 40) {
                feedback = 'Good effort! Practice more to improve!';
            } else {
                feedback = 'Don\'t worry! Keep learning and try again! ';
            }
            
            document.getElementById('feedbackText').textContent = feedback;
        }

        function startAgain() {
            currentIndex = 0;
            totalScore = 0;
            timeLeft = 15;
            isAnswered = false;
            document.getElementById('quizSection').classList.remove('hide');
            document.getElementById('resultSection').classList.add('hide');
            showQuestion();
        }

        showQuestion();