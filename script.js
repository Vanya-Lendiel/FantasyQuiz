document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const currentQuestionElement = document.getElementById('current-question');
    const scoreElement = document.getElementById('score');
    const homeBtn = document.getElementById('home-btn');
    const aboutBtn = document.getElementById('about-btn');
    const contactBtn = document.getElementById('contact-btn');
    const mainContent = document.getElementById('main-content');
    const aboutScreen = document.getElementById('about-screen');
    const contactScreen = document.getElementById('contact-screen');
    const backToMainBtn = document.getElementById('back-to-main-btn');
    const backToMainBtn2 = document.getElementById('back-to-main-btn2');
    const warningModal = document.getElementById('warning-modal');
    const continueBtn = document.getElementById('continue-btn');
    const themeToggle = document.getElementById('theme-toggle');

    let currentQuestionIndex = 0;
    let score = 0;
    let testInProgress = false;

    const questions = [
        {
            question: "Яке повне ім'я Гаррі Поттера?",
            options: ["Гаррі Джейс Поттер", "Гаррі Сіріус Поттер", "Гаррі Северус Поттер", "Гаррі Поттер"],
            correctAnswer: 0
        },
        {
            question: "Який предмет викладав Северус Снейп?",
            options: ["Захист від темних мистецтв", "Зілляваріння", "Трансфігурація", "Догляд за магічними істотами"],
            correctAnswer: 1
        },
        {
            question: "Яке ім'я у палички Герміони Грейнджер?",
            options: ["Виноградина і серце дракона", "Вербова і волосся єдинорога", "Виноградова лоза і серце дракона", "Бузина і волосся фенікса"],
            correctAnswer: 2
        },
        {
            question: "Хто був першим директором Гоґвортсу?",
            options: ["Годрик Грифіндор", "Салазар Слизерин", "Ровена Рейвенклов", "Пенсія Гафелпафф"],
            correctAnswer: 3
        },
        {
            question: "Яке заклинання використовується для створення патронуса?",
            options: ["Експекто Патронум", "Авада Кедавра", "Експеліармус", "Люмос"],
            correctAnswer: 0
        },
        {
            question: "Який тваринний образ у Рона Візлі?",
            options: ["Пацюк", "Собака", "Жаба", "Кіт"],
            correctAnswer: 1
        },
        {
            question: "Що приховував розподільчий капелюх?",
            options: ["Меч Годрика Грифіндора", "Діадему Ровени Рейвенклов", "Чашу Пенсії Гафелпафф", "Перстень Марволо Ґонта"],
            correctAnswer: 0
        },
        {
            question: "Як звали батьків Драко Мелфоя?",
            options: ["Люціус і Нарциса", "Северус і Белатриса", "Родольфус і Рабастан", "Бартемій і Друзила"],
            correctAnswer: 0
        },
        {
            question: "Який предмет був горокраксом у Нагіні?",
            options: ["Медальйон Слизерина", "Чаша Гафелпаффа", "Діадема Рейвенклова", "Перстень Ґонта"],
            correctAnswer: 1
        },
        {
            question: "Хто написав Чарівні істоти і де їх шукати?",
            options: ["Гільдебранд Стрендж", "Ньют Скамандер", "Ксенофіліус Лавґуд", "Альбус Дамблдор"],
            correctAnswer: 1
        }
    ];

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', showNextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    continueBtn.addEventListener('click', () => warningModal.style.display = 'none');
    homeBtn.addEventListener('click', showMainContent);
    aboutBtn.addEventListener('click', showAbout);
    contactBtn.addEventListener('click', showContacts);
    backToMainBtn.addEventListener('click', showMainContent);
    backToMainBtn2.addEventListener('click', showMainContent);
    themeToggle.addEventListener('click', toggleTheme);

    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    function toggleTheme() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            themeToggle.textContent = '☀️';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            themeToggle.textContent = '🌙';
        }
    }

    function showMainContent() {
        if (testInProgress) {
            warningModal.style.display = 'flex';
            return;
        }
        aboutScreen.classList.add('hidden');
        contactScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
    }

    function showAbout() {
        if (testInProgress) {
            warningModal.style.display = 'flex';
            return;
        }
        mainContent.classList.add('hidden');
        contactScreen.classList.add('hidden');
        aboutScreen.classList.remove('hidden');
    }

    function showContacts() {
        if (testInProgress) {
            warningModal.style.display = 'flex';
            return;
        }
        mainContent.classList.add('hidden');
        aboutScreen.classList.add('hidden');
        contactScreen.classList.remove('hidden');
    }

    function startQuiz() {
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        testInProgress = true;
        showQuestion();
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => selectAnswer(index));
            optionsElement.appendChild(button);
        });

        document.getElementById('current-question').textContent = currentQuestionIndex + 1;
        nextBtn.classList.add('hidden');
    }

    function selectAnswer(selectedIndex) {
        const question = questions[currentQuestionIndex];
        const options = document.querySelectorAll('.option-btn');
        
        options.forEach(option => {
            option.disabled = true;
        });

        if (selectedIndex === question.correctAnswer) {
            options[selectedIndex].style.backgroundColor = '#a5d6a7';
            score++;
        } else {
            options[selectedIndex].style.backgroundColor = '#ef9a9a';
            options[question.correctAnswer].style.backgroundColor = '#a5d6a7';
        }

        nextBtn.classList.remove('hidden');
    }

    function showNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        testInProgress = false;
        scoreElement.textContent = `Ти набрав ${score} з ${questions.length} балів!`;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }
});
