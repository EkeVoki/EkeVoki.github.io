// ==========================================
// 1. СБРОС СКРОЛЛА
// ==========================================
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

// ==========================================
// 2. СЛОВАРИ ПЕРЕВОДОВ
// ==========================================
const translations = {
    ru: {
        page_title: "EkeVoki | Python Developer",
        nav_info: "Info", nav_skills: "Скиллы", nav_projects: "Проекты", nav_friends: "Друзья", nav_contacts: "Контакты",
        theme_title: "Выбери реальность",
        hero_subtitle: "Python Developer & Learner",
        hero_desc: "Код — это моя творческая площадка. Пишу на Python, иногда на C++ и JS. Ищу стажировку и интересные проекты.",
        hero_bdate: "Дата рождения:", hero_age: "Сейчас мне:", hero_years: "лет",
        info_title: "Info", info_approach_title: "Мой подход",
        info_approach_text: "Привет! Я начинающий разработчик на Python. Для меня код — это не просто набор символов, а инструмент для творчества. Я не просто решаю задачи, я ищу способы выразить свои идеи через проекты. Мне важно, чтобы то, что я делаю, было удобно и понятно не только мне, но и могло помочь другим. Я предпочитаю инструменты для задач, а не задачи для инструментов. И ценю практику выше теории. Мой фокус — изучение новых технологий через реальные проекты.",
        info_hobbies_title: "Увлечения",
        info_hobbies_intro: "Читаю манги, смотрю аниме, играю в настолки, кооп и не кооп игры вне кода.",
        info_manga: "Любимые манги:", info_manga_list: "«Семья шпиона», «Эта фарфоровая кукла влюбилась», «Монолог фармацевта»",
        info_games: "Любимые игры:", info_games_list: "Fortnite, игры HoYoverse, многие Steam-игры",
        info_board: "Настольные игры:", info_board_list: "Каркассон, Монополия, УНО",
        info_anime: "Любимые аниме:", info_anime_list: "Lucky Star, SPY×FAMILY, The Apothecary Diaries, My Dress-Up Darling",
        info_spheres_title: "Сферы интересов", info_spheres_text: "ML, Python код, написание сайтов, создание игр.",
        skills_title: "Скиллы", skills_langs: "Языки программирования", skills_libs: "Библиотеки и Фреймворки", skills_tools: "Инструменты",
        projects_title: "Проекты", project_japname_desc: "Простой, но душевный генератор японских имен и фамилий с автосохранением в файл.", project_open: "Открыть на GitHub",
        friends_title: "Друзья", acquaintances_title: "Знакомые",
        friend_venya_name: "Вениамин <span class='friend-badge best'>BEST</span>", friend_venya_desc: "Мой брат. Тот самый чувак, который готов обсуждать что угодно и когда угодно)",
        friend_vadim_name: "Вадим <span class='friend-badge best'>BEST</span>", friend_vadim_desc: "Классный одноклассник, ввел в мир IT, дает крутые идеи для проектов.",
        love_her: "Люблю её", friend_chris_desc: "Талантливая художница и клевая подруга. Она вдохновляет меня...",
        friend_sergey_name: "Сергей <span class='friend-badge best'>BEST</span>", friend_sergey_desc: "Друг детства, вместе покоряли майнкрафт сервера и позже ютуб)",
        friend_vitya_name: "Витя <span class='friend-badge best'>BEST</span>", friend_vitya_desc: "Клевый чувак, вместе играем в игры. Познакомились на одном проекте....",
        friend_leon_name: "Леон", friend_leon_desc: "Крутой чувак из Центрального Университета, пересеклись в самом неожиданном месте: он вел игру в D&D",
        friend_maxim_name: "Максим", friend_maxim_desc: "Одноклассник, геймдизайнер, из Испании, классный)",
        friend_slava_desc: "Классный молодой программист, пересеклись в Сбере.",
        contacts_title: "Контакты", contacts_desc: "Всегда открыт к общению и новым проектам!",
        footer_text: "© 2026 EkeVoki. Сделано за кружкой кофе.", cake_lie: "Торт — это ложь"
    },
    en: {
        page_title: "EkeVoki | Python Developer",
        nav_info: "Info", nav_skills: "Skills", nav_projects: "Projects", nav_friends: "Friends", nav_contacts: "Contacts",
        theme_title: "Choose Reality",
        hero_subtitle: "Python Developer & Learner",
        hero_desc: "Code is my creative playground. I write in Python, sometimes C++ and JS. Looking for an internship and interesting projects.",
        hero_bdate: "Date of birth:", hero_age: "Current age:", hero_years: "years old",
        info_title: "Info", info_approach_title: "My Approach", info_approach_text: "Hi! I'm a beginner Python developer. For me, code is not just a set of symbols, but a tool for creativity...",
        info_hobbies_title: "Hobbies", info_hobbies_intro: "I read manga, watch anime...",
        info_manga: "Favorite manga:", info_manga_list: "Spy x Family, The Apothecary Diaries, A Condition Called Love",
        info_games: "Favorite games:", info_games_list: "Fortnite, HoYoverse games, many Steam games",
        info_board: "Board games:", info_board_list: "Carcassonne, Monopoly, UNO",
        info_anime: "Favorite anime:", info_anime_list: "Lucky Star, SPY×FAMILY, The Apothecary Diaries, My Dress-Up Darling",
        info_spheres_title: "Spheres of Interest", info_spheres_text: "ML, Python code, web development, game development.",
        skills_title: "Skills", skills_langs: "Programming Languages", skills_libs: "Libraries & Frameworks", skills_tools: "Tools",
        projects_title: "Projects", project_japname_desc: "A simple but soulful Japanese name generator...", project_open: "Open on GitHub",
        friends_title: "Friends", acquaintances_title: "Acquaintances",
        friend_venya_name: "Veniamin <span class='friend-badge best'>BEST</span>", friend_venya_desc: "My brother...",
        friend_vadim_name: "Vadim <span class='friend-badge best'>BEST</span>", friend_vadim_desc: "Cool classmate...",
        love_her: "Love her", friend_chris_desc: "Talented artist...",
        friend_sergey_name: "Sergey <span class='friend-badge best'>BEST</span>", friend_sergey_desc: "Childhood friend...",
        friend_vitya_name: "Vitya <span class='friend-badge best'>BEST</span>", friend_vitya_desc: "Cool guy...",
        friend_leon_name: "Leon", friend_leon_desc: "Cool guy from Central University...",
        friend_maxim_name: "Maxim", friend_maxim_desc: "Classmate...",
        friend_slava_desc: "Cool young programmer...",
        contacts_title: "Contacts", contacts_desc: "Always open to communication!",
        footer_text: "© 2026 EkeVoki. Made over a cup of coffee.", cake_lie: "The cake is a lie"
    },
    zh: {
        page_title: "EkeVoki | Python Developer",
        nav_info: "信息", nav_skills: "技能", nav_projects: "项目", nav_friends: "朋友", nav_contacts: "联系方式",
        theme_title: "选择现实", hero_subtitle: "Python 开发者 & 学习者",
        hero_desc: "代码是我的创意游乐场...", hero_bdate: "出生日期：", hero_age: "当前年龄：", hero_years: "岁",
        info_title: "信息", info_approach_title: "我的方法", info_approach_text: "你好！我是一名初学 Python 的开发者...",
        info_hobbies_title: "爱好", info_hobbies_intro: "我阅读漫画、看动漫...",
        info_manga: "最喜欢的漫画：", info_manga_list: "间谍过家家...",
        info_games: "最喜欢的游戏：", info_games_list: "Fortnite...",
        info_board: "桌游：", info_board_list: "卡卡颂，大富翁，UNO",
        info_anime: "最喜欢的动漫：", info_anime_list: "幸运星...",
        info_spheres_title: "兴趣领域", info_spheres_text: "机器学习...",
        skills_title: "技能", skills_langs: "编程语言", skills_libs: "库和框架", skills_tools: "工具",
        projects_title: "项目", project_japname_desc: "一个简单但灵魂的生成器...", project_open: "在 GitHub 上打开",
        friends_title: "朋友", acquaintances_title: "熟人",
        friend_venya_name: "Veniamin <span class='friend-badge best'>BEST</span>", friend_venya_desc: "我的兄弟...",
        friend_vadim_name: "Vadim <span class='friend-badge best'>BEST</span>", friend_vadim_desc: "很酷的同学...",
        love_her: "爱她", friend_chris_desc: "才华横溢的艺术家...",
        friend_sergey_name: "Sergey <span class='friend-badge best'>BEST</span>", friend_sergey_desc: "儿时的朋友...",
        friend_vitya_name: "Vitya <span class='friend-badge best'>BEST</span>", friend_vitya_desc: "很酷的家伙...",
        friend_leon_name: "Leon", friend_leon_desc: "中央大学的酷家伙...",
        friend_maxim_name: "Maxim", friend_maxim_desc: "同学...",
        friend_slava_desc: "很酷的年轻程序员...",
        contacts_title: "联系方式", contacts_desc: "始终开放交流！",
        footer_text: "© 2026 EkeVoki. 在一杯咖啡中完成。", cake_lie: "蛋糕是个谎言"
    }
};

// ==========================================
// 3. ЧАСЫ И ВОЗРАСТ
// ==========================================
function updateClock() {
    const timeElement = document.getElementById('clock-time');
    const dateElement = document.getElementById('clock-date');
    if (!timeElement || !dateElement) return;
    const now = new Date();
    timeElement.textContent = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    dateElement.textContent = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
}
setInterval(updateClock, 1000);

function updateAge() {
    const ageElement = document.getElementById('dynamic-age');
    if (!ageElement) return;
    const now = new Date();
    const birthDate = new Date(2009, 9, 23); // 23 Октября 2009
    let age = now.getFullYear() - birthDate.getFullYear();
    const m = now.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) age--;
    ageElement.textContent = age;
}

// ==========================================
// 4. ЯЗЫК, ТЕМА, ЗМЕЙКА
// ==========================================
function toggleLangMenu() { document.getElementById('lang-dropdown').classList.toggle('hidden'); }
function setLang(langCode) {
    const btn = document.querySelector('.lang-btn');
    if (langCode === 'ru') btn.innerHTML = '🌐 RU';
    else if (langCode === 'en') btn.innerHTML = '🌐 EN';
    else if (langCode === 'zh') btn.innerHTML = '🌐 中文';
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[langCode] && translations[langCode][key]) {
            if (key.includes('name')) el.innerHTML = translations[langCode][key];
            else el.textContent = translations[langCode][key];
        }
    });
    document.title = translations[langCode]['page_title'];
    localStorage.setItem('site-lang', langCode);
    document.getElementById('lang-dropdown').classList.add('hidden');
}

function toggleThemeMenu() { document.getElementById('theme-selector').classList.toggle('hidden'); }
function setTheme(themeName) {
    document.body.className = 'theme-' + themeName;
    localStorage.setItem('site-theme', themeName);
    document.getElementById('theme-selector').classList.add('hidden');
    document.getElementById('sakura-petals').innerHTML = '';
    if (themeName === 'sakura') startSakura();
}
function startSakura() {
    const container = document.getElementById('sakura-petals');
    setInterval(() => {
        if (!document.body.classList.contains('theme-sakura')) return;
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.textContent = '🌸';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 3 + 4) + 's';
        petal.style.fontSize = (Math.random() * 10 + 10) + 'px';
        container.appendChild(petal);
        setTimeout(() => petal.remove(), 7000);
    }, 300);
}

function closeSite() {
    window.close();
    document.body.style.opacity = '0';
    setTimeout(() => { document.body.style.opacity = '1'; alert("Шутка! Браузер не даёт мне тебя закрыть 😄"); }, 500);
}
function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(err => console.log(err));
    else if (document.exitFullscreen) document.exitFullscreen();
}

// ==========================================
// 5. ТОРТ
// ==========================================
let cakeClicks = 0;
function eatCake() {
    cakeClicks++;
    const cake = document.getElementById('birthday-cake');
    const msg = document.getElementById('cake-message');
    if (!cake || !msg) return;
    if (cakeClicks >= 6) {
        cake.classList.remove('visible');
        msg.classList.add('visible');
    } else {
        let scale = 1 - (cakeClicks * 0.15);
        cake.style.transform = `scale(${scale})`;
    }
}

// ==========================================
// 6. ЗМЕЙКА PYTHON
// ==========================================
let gameLoop = null, gameTimeout = null, holdTimeout = null;
let score = 0, currentIndex = 0, gameActive = false, appleIndex = -1;

function initSnake() {
    const pythonCard = document.querySelector('.snake-card');
    const trigger = document.getElementById('python-trigger');
    const gameArea = document.getElementById('python-game');
    if (!pythonCard || !trigger || !gameArea) return;

    gameArea.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('snake-cell');
        gameArea.appendChild(cell);
    }
    const headImg = document.createElement('img');
    headImg.id = 'snake-head';
    headImg.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg';
    gameArea.appendChild(headImg);

    const cells = Array.from(document.querySelectorAll('.snake-cell'));
    const newSnakeHead = document.getElementById('snake-head');
    newSnakeHead.style.opacity = '0';

    trigger.onmouseenter = () => {
        if (gameActive) return;
        holdTimeout = setTimeout(startSnakeGame, 5000);
    };
    trigger.onmouseleave = () => clearTimeout(holdTimeout);

    function startSnakeGame() {
        if (gameActive) return;
        gameActive = true;
        pythonCard.classList.add('playing');
        cells.forEach(c => c.classList.remove('snake-apple'));
        score = 0;
        currentIndex = 45;
        updateHeadPosition(currentIndex);
        newSnakeHead.style.opacity = '1';
        newSnakeHead.style.transform = `scale(1)`;
        spawnApple();
        gameTimeout = setTimeout(endSnakeGame, 10000);
        gameLoop = setInterval(moveSnakeTowardsApple, 250);
    }

    function spawnApple() {
        let newPos;
        do { newPos = Math.floor(Math.random() * 100); } while (newPos === currentIndex);
        appleIndex = newPos;
        cells[appleIndex].classList.add('snake-apple');
    }

    function moveSnakeTowardsApple() {
        if (!gameActive) return;
        let currRow = Math.floor(currentIndex / 10), currCol = currentIndex % 10;
        let targetRow = Math.floor(appleIndex / 10), targetCol = appleIndex % 10;
        let nextIndex = currentIndex;
        if (currRow < targetRow) nextIndex = currentIndex + 10;
        else if (currRow > targetRow) nextIndex = currentIndex - 10;
        else if (currCol < targetCol) nextIndex = currentIndex + 1;
        else if (currCol > targetCol) nextIndex = currentIndex - 1;
        else nextIndex = currentIndex + 1;

        if (nextIndex < 0 || nextIndex >= 100 || (nextIndex % 10 === 0 && currCol === 9 && nextIndex > currentIndex)) {
            const moves = [-10, 10, -1, 1];
            nextIndex = currentIndex + moves[Math.floor(Math.random() * moves.length)];
            if (nextIndex < 0 || nextIndex >= 100) return;
        }
        currentIndex = nextIndex;
        updateHeadPosition(currentIndex);
        if (currentIndex === appleIndex) {
            score++;
            cells[currentIndex].classList.remove('snake-apple');
            let newScale = 1 + (score * 0.2);
            if (newScale > 2.5) newScale = 2.5;
            newSnakeHead.style.transform = `scale(${newScale})`;
            if (score >= 6) endSnakeGame();
            else spawnApple();
        }
    }

    function updateHeadPosition(index) {
        newSnakeHead.style.top = `${Math.floor(index / 10) * 10}%`;
        newSnakeHead.style.left = `${(index % 10) * 10}%`;
    }

    function endSnakeGame() {
        if (!gameActive) return;
        gameActive = false;
        clearInterval(gameLoop);
        clearTimeout(gameTimeout);
        clearTimeout(holdTimeout);
        pythonCard.classList.add('shaking');
        setTimeout(() => {
            pythonCard.classList.remove('shaking', 'playing');
            newSnakeHead.style.opacity = '0';
            cells.forEach(c => c.classList.remove('snake-apple'));
            appleIndex = -1;
        }, 500);
    }
}

// ==========================================
// 7. СМЕНА ЗАГОЛОВКА
// ==========================================
document.addEventListener('visibilitychange', () => {
    const originalTitle = document.title;
    if (document.hidden) {
        setTimeout(() => {
            if (document.hidden) {
                const phrases = ["Ты меня не закрыл! 👀", "Эй, я тут вообще-то!", "Вернись, я по тебе скучаю...", "Где ты? 😢"];
                document.title = phrases[Math.floor(Math.random() * phrases.length)];
            }
        }, 1000);
    } else {
        document.title = originalTitle;
    }
});

// ==========================================
// 8. КОТ ПЕЧАТАЕТ (БОЛЬШАЯ БАЗА)
// ==========================================
const catCategories = {
    philosophy: ["Если дерево падает в лесу, а никто не слышит... оно падает?", "Смысл жизни в том, чтобы найти сосиску.", "Мы все просто код в чьей-то матрице.", "Ты не ты, когда голоден.", "Почему мы здесь? Просто чтобы страдать?", "Время — иллюзия, а обед — нет.", "Я мыслю, следовательно, я мяукаю.", "Вселенная бесконечна, как и моя наглость.", "Не важно, куда ты идешь, важно, где твоя миска.", "Счастье — это когда тебя гладят.", "Мы живем в симуляции, и создатель этого сайта — студент.", "Жизнь коротка, а обед длится вечность.", "Что первично: дух или материя? Материя (еда).", "В конце времен останется только пыль и мой мурмур.", "Я видел вечность и она была полна пустых мисок."],
    cute: ["Я котик:3", "Мяу-мяу! (＾▽＾)", "Сделай мне погладить!", "Я самый милый кот в этом интернете.", "Мурмурмур... (￣▽￣)", "А ты знаешь, что я люблю тебя?", "Дай сосиску, и я дам тебе лапку.", "Я пушистый и опасный.", "Ты меня покормил? Я тебя люблю.", "Я сплю 20 часов в сутки, а ты?", "Мой хвост — моя жизнь.", "Я бегу к тебе со всех лап!", "У меня самые лучшие уши на свете.", "Ты меня гладишь, я мурчу.", "Спасибо, что ты есть. (｡•́︿•̀｡)"],
    it_memes: ["Это не баг, это фича.", "Работает? Не трогай!", "У меня все работает на моей машине.", "Ты забыл поставить точку с запятой, да?", "Код, который я писал в 3 часа ночи, работает, но я не знаю как.", "Стек: Python, Django, и надежда.", "Ты когда-нибудь видел, как горит сервер? Я нет, но слышал.", "Перезагрузка решает все проблемы.", "Git push --force и будь что будет.", "Я не пишу код, я пишу спагетти.", "Тестирование — для слабаков.", "Ты думал, что я умный? Я просто гуглю.", "Мой код — это искусство, а ты не понимаешь.", "Я не знаю, как это работает, но это работает.", "У меня 99 багов, но я их не фикшу."],
    breaking_4th: ["Ты зачем сюда скроллишь? 👀", "Я знаю, что ты читаешь это. Я вижу тебя.", "Хватит пялиться на мой экран!", "Ты думаешь, я не настоящий кот?", "А ты знал, что создатель этого сайта... это я? Нет, шучу.", "Ты читаешь это, а я наблюдаю за тобой.", "Привет, ты! Да, именно ты.", "Ты думаешь, это игра? Это симуляция.", "Ты нажал на кнопку? Я видел.", "Улыбнись, тебя снимает камера.", "Я знаю, что ты не спал всю ночь.", "Ты когда-нибудь выходил из этой комнаты?", "Я кот, который знает, где ты живешь.", "Не закрывай вкладку, мне скучно.", "Ты думал, что я не замечу, как ты меня читаешь?"],
    miku: ["А ты знал, что трек Мику 'World is Mine' считается классикой?", "Мику — это вокалоид, созданный Yamaha в 2007.", "Мику говорит только 'Мику-Мику' в оригинале.", "Она самая известная виртуальная певица в мире.", "Мику дала концерты в реальном мире с голограммой.", "Ее день рождения — 31 августа.", "Мику — топ!", "Ты слушал 'Ievan Polkka' в ее исполнении?", "Мику — не просто картинка, это голос.", "Она — символ всей вокалоидной культуры.", "Знаешь, сколько фанатов у Мику? Миллионы.", "Мику вдохновила на создание тысяч песен.", "Она — икона стиля и будущего.", "Мику — это моя жизнь.", "Я не фанат, я — преданный последователь Мику."],
    site_creation: ["Ты думал создавать сайт легко? Меня писали, чтобы я нормально работал, кучу часов!", "Знаешь, сколько багов было исправлено? Ты даже не представляешь.", "Этот сайт — результат кучи ночей и кофе.", "Я создан, чтобы ты улыбался.", "Сайт собирался из трех файлов, а работает на четырех.", "Мой разработчик не спал неделю, чтобы ты это увидел.", "Тут было столько ошибок, что я устал их считать.", "Это не просто сайт, это история.", "Я — результат чистой воли и отладки.", "Сайт писался под ночные треки Мику.", "Ты не поверишь, но я почти сломался.", "Сайт — это труд, а не просто код.", "Мой создатель попросил меня быть милым.", "Я — кот, созданный человеком.", "Ты держишь в руках (на экране) мою душу."],
    random: ["ыыыы", "явапвпкопл", "фываолддж", "афывафыва", "покопокоп", "рукавп", "мыфмфмм", "вапвапвап", "йцукенг", "фывапрол", "ячсмить", "олдфыва", "пукпукпук", "мыыыыш", "фыва"]
};

const catText = document.getElementById('cat-text');
let currentCategory = null;
let usedPhrasesInCategory = [];
let catInterval = null;
let isInCategory = false;

function startCatTyping() {
    if (catInterval) clearInterval(catInterval);
    if (!catText) return;

    if (!currentCategory || usedPhrasesInCategory.length >= catCategories[currentCategory].length) {
        const categories = Object.keys(catCategories);
        currentCategory = categories[Math.floor(Math.random() * categories.length)];
        usedPhrasesInCategory = [];
        isInCategory = true;
    }

    let phrasePool = catCategories[currentCategory].filter(p => !usedPhrasesInCategory.includes(p));
    if (phrasePool.length === 0) {
        usedPhrasesInCategory = [];
        phrasePool = catCategories[currentCategory];
    }
    
    let phrase = phrasePool[Math.floor(Math.random() * phrasePool.length)];
    usedPhrasesInCategory.push(phrase);

    let charIndex = 0;
    catText.textContent = "";

    catInterval = setInterval(() => {
        if (charIndex < phrase.length) {
            catText.textContent += phrase[charIndex];
            charIndex++;
        } else {
            clearInterval(catInterval);
            let exitRoll = Math.random() < 0.3 ? 0 : 1;
            if (exitRoll === 0) {
                currentCategory = null; 
            }
            setTimeout(() => {
                startCatTyping();
            }, 3000);
        }
    }, 100);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCatTyping();
        } else {
            if (catInterval) clearInterval(catInterval);
            if (catText) catText.textContent = "";
        }
    });
}, { threshold: 0.1 });

// ==========================================
// 9. ТЕРМИНАЛ
// ==========================================
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('term-output');

if (termInput) {
    termInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim().toLowerCase();
            this.value = ''; 
            printToTerminal(`guest@ekevoki:~$ ${command}`);
            switch(command) {
                case 'help': 
                    printToTerminal("Доступные команды:", 'term-info');
                    printToTerminal("  help       - этот список");
                    printToTerminal("  about      - инфо обо мне");
                    printToTerminal("  skills     - навыки");
                    printToTerminal("  friends    - список друзей");
                    printToTerminal("  theme list - список тем");
                    printToTerminal("  clear      - очистить");
                    printToTerminal("  .lang01    - русский язык");
                    printToTerminal("  .lang02    - английский язык");
                    printToTerminal("  .lang03    - китайский язык");
                    break;
                case 'about': printToTerminal("EkeVoki - Python Developer."); break;
                case 'skills': printToTerminal("Python, C++, JS, NumPy, Pandas, Git, Ren'Py."); break;
                case 'friends': printToTerminal("Вадим, Christopher, Сергей, Витя, Леон, Максим, DevSvytaslav."); break;
                case 'theme list': printToTerminal("dark, mac, miku, sakura, win98"); break;
                case 'clear': termOutput.innerHTML = ''; break;
                case '.lang01': setLang('ru'); printToTerminal("Язык изменен на русский."); break;
                case '.lang02': setLang('en'); printToTerminal("Language changed to English."); break;
                case '.lang03': setLang('zh'); printToTerminal("语言已更改为中文。"); break;
                case '': break; 
                default:
                    if (command.startsWith('theme ')) {
                        const themeName = command.split(' ')[1];
                        if (['dark', 'mac', 'miku', 'sakura', 'win98'].includes(themeName)) setTimeout(() => setTheme(themeName), 500);
                        else printToTerminal(`Ошибка: тема '${themeName}' не найдена.`, 'term-error');
                    } else { printToTerminal(`Команда не найдена: ${command}. Введите 'help'.`, 'term-error'); }
            }
        }
    });
}

function printToTerminal(text, className = '') {
    if (!termOutput) return;
    const p = document.createElement('p');
    p.textContent = text;
    if (className) p.classList.add(className);
    termOutput.appendChild(p);
    const body = document.querySelector('.terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
}

// ==========================================
// 10. МЕНЮ ПУСК WIN98
// ==========================================
function toggleWin98Menu() {
    const menu = document.getElementById('win98-start-menu');
    if (menu) menu.classList.toggle('win98-hidden');
}
document.addEventListener('click', (e) => {
    const menu = document.getElementById('win98-start-menu');
    const btn = document.getElementById('win98-start-btn');
    if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add('win98-hidden');
    }
});

// ==========================================
// 11. ЗАПУСК
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
    updateAge();
    setLang(localStorage.getItem('site-lang') || 'ru');
    setTheme('dark');
    initSnake();

    const catZone = document.getElementById('cat-zone');
    if (catZone) observer.observe(catZone);

    const now = new Date();
    if (now.getMonth() === 9 && now.getDate() === 23) {
        const cake = document.getElementById('birthday-cake');
        if (cake) cake.classList.add('visible'); 
    }
});