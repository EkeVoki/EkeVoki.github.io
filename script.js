'use strict';

// ==========================================
// 1. СБРОС СКРОЛЛА И ФЛАГИ ИЗ URL
// ==========================================
// Примеры: ?lang=en  ?theme=win95  ?lang=zh&theme=sakura  ?anim=off  ?cat=off  ?clock=off  ?snake=off  ?petals=off  ?cake
if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
if (!location.hash) window.scrollTo(0, 0);

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

const LANGS = ['ru', 'en', 'zh'];
const THEMES = ['dark', 'mac', 'miku', 'sakura', 'win98', 'terminal'];
const THEME_ALIASES = { win95: 'win98', windows95: 'win98', windows98: 'win98', win: 'win98', start: 'dark', default: 'dark', term: 'terminal', cli: 'terminal' };
const LANG_ALIASES = { rus: 'ru', russian: 'ru', eng: 'en', english: 'en', cn: 'zh', chinese: 'zh' };
const THEME_COLORS = { dark: '#050a12', mac: '#f5f5f7', miku: '#0f0f0f', sakura: '#fff0f5', win98: '#008080', terminal: '#0a0e14' };

const params = new URLSearchParams(location.search);
// Флаг: отсутствует -> значение по умолчанию; ?x / ?x=1 / ?x=on -> true; ?x=0 / off / false / no -> false
function flag(name, def = true) {
    if (!params.has(name)) return def;
    const v = (params.get(name) || '').trim().toLowerCase();
    return !['0', 'off', 'false', 'no', 'none'].includes(v);
}
const FLAGS = {
    anim: flag('anim'), cat: flag('cat'), clock: flag('clock'), snake: flag('snake'), petals: flag('petals'),
    cake: flag('cake', false)
};

const store = {
    get(key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (e) { /* приватный режим */ } }
};

function normLang(value) {
    if (!value) return null;
    let v = String(value).trim().toLowerCase();
    v = LANG_ALIASES[v] || v.slice(0, 2);
    return LANGS.includes(v) ? v : null;
}
function normTheme(value) {
    if (!value) return null;
    const v = String(value).trim().toLowerCase();
    const t = THEME_ALIASES[v] || v;
    return THEMES.includes(t) ? t : null;
}
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animOn = () => FLAGS.anim && !reducedMotion();

// ==========================================
// 2. СЛОВАРИ ПЕРЕВОДОВ
// ==========================================
const translations = {
    ru: {
        page_title: "EkeVoki | Python Developer",
        meta_desc: "EkeVoki — Python-разработчик и ученик. Портфолио, проекты и друзья.",
        skip_link: "К содержимому",
        t_close: "Закрыть", t_reload: "Перезагрузить", t_fullscreen: "Полный экран", t_lang: "Язык", t_theme: "Сменить тему", t_menu: "Меню",
        nav_info: "Info", nav_skills: "Скиллы", nav_projects: "Проекты", nav_friends: "Друзья", nav_contacts: "Контакты",
        theme_title: "Выбери реальность",
        hero_subtitle: "Python Developer & Learner",
        hero_desc: "Код — это моя творческая площадка. Пишу на Python, иногда на C++ и JS. Ищу стажировку и интересные проекты.",
        hero_bdate: "Дата рождения:", hero_age: "Сейчас мне:",
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
        end_spine: "Конец", end_title: "О ты долистал до конца?",
        end_p1: "Да, тут нет проекта. Пока. Но будет. Что это будет? Может быть что-то полезное, может прикол сделанный за час - кто знает.",
        end_p2: "Главное - что ты тут. Ну ладно, листай сайт дальше)",
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
        footer_text: "© 2026 EkeVoki. Сделано за кружкой кофе.", cake_lie: "Торт — это ложь",
        win_start: "Пуск", win_themes: "Темы", win_lang: "Язык", win_shutdown: "Завершение работы...",
        win_shutdown_msg: "Теперь питание компьютера можно отключить.", win_shutdown_hint: "(нажмите, чтобы вернуться)",
        toast_close: "Шутка! Браузер не даёт мне тебя закрыть",
        tab_phrases: ["Ты меня не закрыл!", "Эй, я тут вообще-то!", "Вернись, я по тебе скучаю...", "Где ты?"],
        term_help: ["Доступные команды:", "  help         - этот список", "  about        - инфо обо мне", "  skills       - навыки", "  friends      - список друзей", "  theme list   - список тем", "  theme <имя>  - сменить тему", "  lang <ru|en|zh> - сменить язык", "  date         - текущая дата", "  clear        - очистить", "  exit         - выйти из терминала"],
        term_lang_set: "Язык изменён на русский.", term_theme_bad: "Ошибка: тема '{0}' не найдена.", term_cmd_bad: "Команда не найдена: {0}. Введите 'help'.", term_lang_bad: "Ошибка: язык '{0}' не найден (ru, en, zh)."
    },
    en: {
        page_title: "EkeVoki | Python Developer",
        meta_desc: "EkeVoki — Python developer and learner. Portfolio, projects and friends.",
        skip_link: "Skip to content",
        t_close: "Close", t_reload: "Reload", t_fullscreen: "Fullscreen", t_lang: "Language", t_theme: "Change theme", t_menu: "Menu",
        nav_info: "Info", nav_skills: "Skills", nav_projects: "Projects", nav_friends: "Friends", nav_contacts: "Contacts",
        theme_title: "Choose Reality",
        hero_subtitle: "Python Developer & Learner",
        hero_desc: "Code is my creative playground. I write in Python, sometimes C++ and JS. Looking for an internship and interesting projects.",
        hero_bdate: "Date of birth:", hero_age: "Current age:",
        info_title: "Info", info_approach_title: "My Approach",
        info_approach_text: "Hi! I'm a beginner Python developer. For me, code is not just a set of symbols but a tool for creativity. I don't just solve tasks — I look for ways to express my ideas through projects. It matters to me that what I build is convenient and clear not only to me, but can also help others. I prefer tools for tasks rather than tasks for tools, and I value practice above theory. My focus is learning new technologies through real projects.",
        info_hobbies_title: "Hobbies",
        info_hobbies_intro: "Outside of code, I read manga, watch anime, play board games and both co-op and single-player video games.",
        info_manga: "Favorite manga:", info_manga_list: "Spy x Family, My Dress-Up Darling, The Apothecary Diaries",
        info_games: "Favorite games:", info_games_list: "Fortnite, HoYoverse games, many Steam games",
        info_board: "Board games:", info_board_list: "Carcassonne, Monopoly, UNO",
        info_anime: "Favorite anime:", info_anime_list: "Lucky Star, SPY×FAMILY, The Apothecary Diaries, My Dress-Up Darling",
        info_spheres_title: "Spheres of Interest", info_spheres_text: "ML, Python code, web development, game development.",
        skills_title: "Skills", skills_langs: "Programming Languages", skills_libs: "Libraries & Frameworks", skills_tools: "Tools",
        projects_title: "Projects", project_japname_desc: "A simple yet heartfelt generator of Japanese given names and surnames with autosave to a file.", project_open: "Open on GitHub",
        end_spine: "The End", end_title: "Oh, you scrolled all the way to the end?",
        end_p1: "Yes, there's no project here. Yet. But there will be. What will it be? Maybe something useful, maybe a joke made in an hour — who knows.",
        end_p2: "What matters is that you're here. Alright, keep scrolling the site :)",
        friends_title: "Friends", acquaintances_title: "Acquaintances",
        friend_venya_name: "Veniamin <span class='friend-badge best'>BEST</span>", friend_venya_desc: "My brother. The guy who's always ready to talk about anything, anytime :)",
        friend_vadim_name: "Vadim <span class='friend-badge best'>BEST</span>", friend_vadim_desc: "A great classmate who introduced me to IT and keeps giving me cool project ideas.",
        love_her: "Love her", friend_chris_desc: "A talented artist and a wonderful friend. She inspires me...",
        friend_sergey_name: "Sergey <span class='friend-badge best'>BEST</span>", friend_sergey_desc: "A childhood friend — we conquered Minecraft servers together and, later, YouTube :)",
        friend_vitya_name: "Vitya <span class='friend-badge best'>BEST</span>", friend_vitya_desc: "A cool guy, we play games together. We met on a project....",
        friend_leon_name: "Leon", friend_leon_desc: "A cool guy from Central University; we met in the most unexpected place: he was running a D&D game",
        friend_maxim_name: "Maxim", friend_maxim_desc: "A classmate, game designer, from Spain, really cool :)",
        friend_slava_desc: "A great young programmer; we crossed paths at Sber.",
        contacts_title: "Contacts", contacts_desc: "Always open to communication and new projects!",
        footer_text: "© 2026 EkeVoki. Made over a cup of coffee.", cake_lie: "The cake is a lie",
        win_start: "Start", win_themes: "Themes", win_lang: "Language", win_shutdown: "Shut Down...",
        win_shutdown_msg: "It's now safe to turn off your computer.", win_shutdown_hint: "(click to go back)",
        toast_close: "Just kidding! The browser won't let me close you",
        tab_phrases: ["You didn't close me!", "Hey, I'm still here!", "Come back, I miss you...", "Where are you?"],
        term_help: ["Available commands:", "  help         - this list", "  about        - about me", "  skills       - skills", "  friends      - friends list", "  theme list   - list of themes", "  theme <name> - change theme", "  lang <ru|en|zh> - change language", "  date         - current date", "  clear        - clear screen", "  exit         - leave the terminal"],
        term_lang_set: "Language changed to English.", term_theme_bad: "Error: theme '{0}' not found.", term_cmd_bad: "Command not found: {0}. Type 'help'.", term_lang_bad: "Error: language '{0}' not found (ru, en, zh)."
    },
    zh: {
        page_title: "EkeVoki | Python Developer",
        meta_desc: "EkeVoki —— Python 开发者与学习者。作品集、项目和朋友们。",
        skip_link: "跳到内容",
        t_close: "关闭", t_reload: "重新加载", t_fullscreen: "全屏", t_lang: "语言", t_theme: "切换主题", t_menu: "菜单",
        nav_info: "信息", nav_skills: "技能", nav_projects: "项目", nav_friends: "朋友", nav_contacts: "联系方式",
        theme_title: "选择现实",
        hero_subtitle: "Python 开发者 & 学习者",
        hero_desc: "代码是我的创意游乐场。我用 Python，偶尔用 C++ 和 JS。正在寻找实习机会和有趣的项目。",
        hero_bdate: "出生日期：", hero_age: "当前年龄：",
        info_title: "信息", info_approach_title: "我的方法",
        info_approach_text: "你好！我是一名初学 Python 的开发者。对我来说，代码不只是一堆符号，而是创作的工具。我不只是解决问题，更是在寻找通过项目表达想法的方式。我希望自己做的东西不仅我自己用着方便、看得明白，也能帮助到别人。我更喜欢为任务选择工具，而不是为工具寻找任务，并且重视实践胜过理论。我的重点是通过真实项目学习新技术。",
        info_hobbies_title: "爱好",
        info_hobbies_intro: "代码之外，我读漫画、看动漫、玩桌游，也玩合作和单人游戏。",
        info_manga: "最喜欢的漫画：", info_manga_list: "《间谍过家家》、《更衣人偶坠入爱河》、《药屋少女的呢喃》",
        info_games: "最喜欢的游戏：", info_games_list: "堡垒之夜、米哈游游戏、许多 Steam 游戏",
        info_board: "桌游：", info_board_list: "卡卡颂、大富翁、UNO",
        info_anime: "最喜欢的动漫：", info_anime_list: "幸运星、间谍过家家、药屋少女的呢喃、更衣人偶坠入爱河",
        info_spheres_title: "兴趣领域", info_spheres_text: "机器学习、Python 编程、网站开发、游戏制作。",
        skills_title: "技能", skills_langs: "编程语言", skills_libs: "库和框架", skills_tools: "工具",
        projects_title: "项目", project_japname_desc: "一个简单却很走心的日本人名与姓氏生成器，支持自动保存到文件。", project_open: "在 GitHub 上打开",
        end_spine: "完", end_title: "哦，你一直翻到最后了？",
        end_p1: "是的，这里还没有项目。暂时没有。但以后会有的。会是什么呢？也许是有用的东西，也许是一小时做出来的玩笑——谁知道呢。",
        end_p2: "重要的是你来了。好了，继续往下看吧 :)",
        friends_title: "朋友", acquaintances_title: "熟人",
        friend_venya_name: "Veniamin <span class='friend-badge best'>BEST</span>", friend_venya_desc: "我的兄弟。那种随时随地都愿意聊任何话题的家伙 :)",
        friend_vadim_name: "Vadim <span class='friend-badge best'>BEST</span>", friend_vadim_desc: "很棒的同学，带我走进了 IT 世界，还总给我好点子。",
        love_her: "爱她", friend_chris_desc: "才华横溢的画师，也是很棒的朋友。她给了我很多灵感……",
        friend_sergey_name: "Sergey <span class='friend-badge best'>BEST</span>", friend_sergey_desc: "儿时的朋友，一起征服过 Minecraft 服务器，后来又一起玩 YouTube :)",
        friend_vitya_name: "Vitya <span class='friend-badge best'>BEST</span>", friend_vitya_desc: "很酷的家伙，我们一起玩游戏。是在一个项目里认识的……",
        friend_leon_name: "Leon", friend_leon_desc: "中央大学的酷家伙，我们在最意想不到的地方相遇：他当时在主持一场 D&D 游戏",
        friend_maxim_name: "Maxim", friend_maxim_desc: "同学，游戏策划，来自西班牙，人很棒 :)",
        friend_slava_desc: "很棒的年轻程序员，我们是在 Sber 认识的。",
        contacts_title: "联系方式", contacts_desc: "随时欢迎交流与新项目！",
        footer_text: "© 2026 EkeVoki. 在一杯咖啡中完成。", cake_lie: "蛋糕是个谎言",
        win_start: "开始", win_themes: "主题", win_lang: "语言", win_shutdown: "关机……",
        win_shutdown_msg: "现在可以安全地关闭计算机了。", win_shutdown_hint: "（点击返回）",
        toast_close: "开玩笑的！浏览器不让我关掉你",
        tab_phrases: ["你没把我关掉！", "喂，我还在这儿呢！", "回来吧，我想你了……", "你在哪？"],
        term_help: ["可用命令：", "  help         - 命令列表", "  about        - 关于我", "  skills       - 技能", "  friends      - 朋友列表", "  theme list   - 主题列表", "  theme <名称> - 切换主题", "  lang <ru|en|zh> - 切换语言", "  date         - 当前日期", "  clear        - 清屏", "  exit         - 退出终端"],
        term_lang_set: "语言已更改为中文。", term_theme_bad: "错误：未找到主题“{0}”。", term_cmd_bad: "未找到命令：{0}。请输入 'help'。", term_lang_bad: "错误：未找到语言“{0}”（ru、en、zh）。"
    }
};

// ==========================================
// 3. СОСТОЯНИЕ, ЧАСЫ, ВОЗРАСТ
// ==========================================
let currentLang = 'ru';
let currentTheme = 'dark';
let lastVisualTheme = 'dark';
const t = (key) => {
    const own = translations[currentLang] && translations[currentLang][key];
    return own !== undefined ? own : (translations.ru[key] !== undefined ? translations.ru[key] : key);
};
const pad2 = (n) => String(n).padStart(2, '0');

function updateClock() {
    const now = new Date();
    const timeEl = $('#clock-time'), dateEl = $('#clock-date'), tray = $('#tray-time');
    if (timeEl) timeEl.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
    if (dateEl) dateEl.textContent = `${pad2(now.getDate())}.${pad2(now.getMonth() + 1)}.${now.getFullYear()}`;
    if (tray) tray.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}`;
}

function calcAge() {
    const now = new Date();
    const birth = new Date(2009, 9, 23); // 23 октября 2009
    let age = now.getFullYear() - birth.getFullYear();
    const m = now.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) age--;
    return age;
}
function yearsWord(lang, n) {
    if (lang === 'en') return n === 1 ? 'year old' : 'years old';
    if (lang === 'zh') return '岁';
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return 'год';
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'года';
    return 'лет';
}
function renderAge() {
    const age = calcAge();
    const ageEl = $('#dynamic-age'), wordEl = $('#age-word');
    if (ageEl) ageEl.textContent = age;
    if (wordEl) wordEl.textContent = yearsWord(currentLang, age);
}

// ==========================================
// 4. МЕНЮ, ТОСТЫ, URL
// ==========================================
function setLangMenu(open) { $('#lang-dropdown').classList.toggle('hidden', !open); $('#lang-btn').setAttribute('aria-expanded', String(open)); }
function setThemeMenu(open) { $('#theme-selector').classList.toggle('hidden', !open); $('#theme-btn').setAttribute('aria-expanded', String(open)); }
function setNavMenu(open) { $('#nav-links').classList.toggle('open', open); $('#burger').setAttribute('aria-expanded', String(open)); }
function setStartMenu(open) { $('#win98-start-menu').classList.toggle('open', open); $('#win98-start-btn').setAttribute('aria-expanded', String(open)); }
function closeMenus() { setLangMenu(false); setThemeMenu(false); setNavMenu(false); setStartMenu(false); }

function setUrlParam(key, value) {
    try {
        const url = new URL(location.href);
        url.searchParams.set(key, value);
        history.replaceState(null, '', url);
    } catch (e) { /* file:// и т.п. */ }
}

function showToast(message, ms = 2600) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => el.classList.add('out'), ms);
    setTimeout(() => el.remove(), ms + 450);
}

function closeSite() {
    window.close();
    if (!animOn()) { showToast(t('toast_close')); return; }
    document.body.style.transition = 'opacity 0.4s';
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.opacity = '1';
        setTimeout(() => { document.body.style.transition = ''; }, 450);
        showToast(t('toast_close'));
    }, 600);
}
function toggleFullscreen() {
    if (!document.fullscreenEnabled) return;
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
    else document.exitFullscreen();
}

// ==========================================
// 5. ЯЗЫК
// ==========================================
function setLang(code, opts = {}) {
    const { persist = true, syncUrl = true } = opts;
    const lang = normLang(code) || 'ru';
    currentLang = lang;
    const dict = translations[lang];

    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
    $$('[data-i18n]').forEach((el) => { const v = dict[el.dataset.i18n]; if (typeof v === 'string') el.textContent = v; });
    $$('[data-i18n-html]').forEach((el) => { const v = dict[el.dataset.i18nHtml]; if (typeof v === 'string') el.innerHTML = v; });
    $$('[data-i18n-title]').forEach((el) => { const v = dict[el.dataset.i18nTitle]; if (typeof v === 'string') { el.title = v; el.setAttribute('aria-label', v); } });

    const label = $('#lang-label');
    if (label) label.textContent = { ru: 'RU', en: 'EN', zh: '中文' }[lang];
    $$('[data-lang]').forEach((b) => b.setAttribute('aria-current', String(b.dataset.lang === lang)));
    document.title = dict.page_title;
    const meta = $('#meta-desc');
    if (meta) meta.setAttribute('content', dict.meta_desc);
    renderAge();

    if (persist) store.set('site-lang', lang);
    if (syncUrl) setUrlParam('lang', lang);
    closeMenus();
}

// ==========================================
// 6. ТЕМЫ И ПЕРЕХОДЫ МЕЖДУ НИМИ
// ==========================================
let petalTimer = null;
let fadeTimer = null;

function startPetals() {
    stopPetals();
    if (!FLAGS.petals || !animOn()) return;
    const box = $('#sakura-petals');
    petalTimer = setInterval(() => {
        if (document.hidden || box.childElementCount > 45) return;
        const petal = document.createElement('div');
        const size = 10 + Math.random() * 10;
        const duration = 5 + Math.random() * 4;
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.setProperty('--s', size + 'px');
        petal.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
        petal.style.animationDuration = duration + 's';
        box.appendChild(petal);
        setTimeout(() => petal.remove(), duration * 1000 + 200);
    }, 350);
}
function stopPetals() {
    if (petalTimer) clearInterval(petalTimer);
    petalTimer = null;
    const box = $('#sakura-petals');
    if (box) box.innerHTML = '';
}

function setTheme(name, opts = {}) {
    const { persist = true, syncUrl = true, origin = null, initial = false } = opts;
    const theme = normTheme(name) || 'dark';
    // точка, из которой «расходится» круговой переход
    const rect = origin && origin.getBoundingClientRect ? origin.getBoundingClientRect() : null;
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 40;
    const y = rect ? rect.top + rect.height / 2 : 40;

    closeMenus();
    if (theme === currentTheme && !initial) return;
    const prev = currentTheme;
    currentTheme = theme;
    if (theme !== 'terminal') lastVisualTheme = theme;

    const apply = () => {
        THEMES.forEach((th) => document.body.classList.toggle('theme-' + th, th === theme));
        const metaTheme = $('#meta-theme');
        if (metaTheme) metaTheme.setAttribute('content', THEME_COLORS[theme]);
        $$('.theme-btn').forEach((b) => b.setAttribute('aria-current', String(b.dataset.theme === theme)));
        if (prev === 'win98' && theme !== 'win98') restoreAllWindows();
        if (theme === 'sakura') startPetals(); else stopPetals();
        if (theme === 'terminal') openTerminal();
    };
    const afterVisible = () => {
        if (theme === 'win98' && !initial && animOn()) showBoot();
        if (theme === 'terminal') { const input = $('#term-input'); if (input) input.focus({ preventScroll: true }); }
    };

    if (persist && theme !== 'terminal') store.set('site-theme', theme);
    if (syncUrl) setUrlParam('theme', theme);

    if (!initial && animOn() && typeof document.startViewTransition === 'function') {
        const transition = document.startViewTransition(apply);
        transition.ready.then(() => {
            const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
            document.documentElement.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 650, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' }
            );
        }).catch(() => {});
        transition.finished.then(afterVisible, afterVisible);
    } else {
        if (!initial && animOn()) {
            document.body.classList.add('theme-fading');
            clearTimeout(fadeTimer);
            fadeTimer = setTimeout(() => document.body.classList.remove('theme-fading'), 650);
        }
        apply();
        afterVisible();
    }
}

// ==========================================
// 7. WINDOWS 98: окна, загрузка, выключение
// ==========================================
const winTasks = new Map();

function hideWin(win) {
    win.classList.add('is-hidden');
    if (winTasks.has(win)) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'win-task';
    const icon = $('.win-title .icon', win);
    if (icon) btn.appendChild(icon.cloneNode(true));
    btn.appendChild(document.createTextNode($('.win-title', win).textContent.trim()));
    btn.addEventListener('click', () => showWin(win));
    $('#win98-tasks').appendChild(btn);
    winTasks.set(win, btn);
}
function showWin(win) {
    win.classList.remove('is-hidden');
    const btn = winTasks.get(win);
    if (btn) { btn.remove(); winTasks.delete(win); }
    win.scrollIntoView({ behavior: animOn() ? 'smooth' : 'auto', block: 'center' });
}
function restoreAllWindows() {
    winTasks.forEach((btn, win) => { win.classList.remove('is-hidden'); btn.remove(); });
    winTasks.clear();
    $$('.win98-window.is-max').forEach((w) => w.classList.remove('is-max'));
}

function showBoot() {
    const boot = $('#win98-boot');
    if (!boot) return;
    boot.classList.add('show');
    const end = () => boot.classList.remove('show');
    boot.onclick = end;
    setTimeout(end, 1500);
}
function showShutdown() { setStartMenu(false); const s = $('#win98-shutdown'); s.classList.add('show'); s.focus({ preventScroll: true }); }
function hideShutdown() { const s = $('#win98-shutdown'); if (s.classList.contains('show')) { s.classList.remove('show'); if (currentTheme === 'win98' && animOn()) showBoot(); } }

// ==========================================
// 8. ТОРТ
// ==========================================
let cakeClicks = 0;
function eatCake() {
    cakeClicks++;
    const cake = $('#birthday-cake'), msg = $('#cake-message');
    if (!cake || !msg) return;
    if (cakeClicks >= 6) {
        cake.classList.remove('visible');
        msg.classList.add('visible');
    } else {
        cake.style.transform = `scale(${1 - cakeClicks * 0.15})`;
    }
}

// ==========================================
// 9. ОБРАБОТКА КЛИКОВ И КЛАВИШ (делегирование)
// ==========================================
function handleAction(action) {
    switch (action) {
        case 'close': closeSite(); break;
        case 'reload': location.reload(); break;
        case 'fullscreen': toggleFullscreen(); break;
        case 'toggle-lang': { const open = $('#lang-dropdown').classList.contains('hidden'); closeMenus(); setLangMenu(open); break; }
        case 'toggle-theme-menu': { const open = $('#theme-selector').classList.contains('hidden'); closeMenus(); setThemeMenu(open); break; }
        case 'toggle-nav': { const open = !$('#nav-links').classList.contains('open'); closeMenus(); setNavMenu(open); break; }
        case 'start': { const open = !$('#win98-start-menu').classList.contains('open'); closeMenus(); setStartMenu(open); break; }
        case 'cake': eatCake(); break;
        case 'term-exit': setTheme(lastVisualTheme); break;
        case 'shutdown': showShutdown(); break;
        case 'shutdown-back': hideShutdown(); break;
    }
}

document.addEventListener('click', (e) => {
    const target = e.target;

    const themeBtn = target.closest('[data-theme]');
    if (themeBtn) { setTheme(themeBtn.dataset.theme, { origin: themeBtn }); return; }
    const langBtn = target.closest('[data-lang]');
    if (langBtn) { setLang(langBtn.dataset.lang); return; }
    const actionEl = target.closest('[data-action]');
    if (actionEl) { handleAction(actionEl.dataset.action); return; }

    const winBtn = target.closest('[data-win-act]');
    if (winBtn) {
        const win = winBtn.closest('.win98-window');
        if (win) {
            if (winBtn.dataset.winAct === 'max') win.classList.toggle('is-max');
            else hideWin(win);
        }
        return;
    }

    // кассеты: на сенсорных экранах карточка открывается по нажатию
    const cassette = target.closest('.cassette');
    if (cassette && !cassette.classList.contains('disabled') && !target.closest('.cassette-card a')) {
        const willOpen = !cassette.classList.contains('open');
        $$('.cassette.open').forEach((c) => c.classList.remove('open'));
        cassette.classList.toggle('open', willOpen);
    } else if (!cassette) {
        $$('.cassette.open').forEach((c) => c.classList.remove('open'));
    }
    // «Люблю её» — по нажатию на сенсорных экранах
    const loveAvatar = target.closest('.special-avatar');
    $$('.special-avatar.show').forEach((a) => { if (a !== loveAvatar) a.classList.remove('show'); });
    if (loveAvatar) loveAvatar.classList.toggle('show');

    // закрытие выпадающих меню по клику снаружи
    if (target.closest('.nav-links a')) setNavMenu(false);
    if (!target.closest('.lang-selector')) setLangMenu(false);
    if (!target.closest('#theme-selector') && !target.closest('#theme-btn')) setThemeMenu(false);
    if (!target.closest('#win98-taskbar')) setStartMenu(false);
    if (!target.closest('.navbar')) setNavMenu(false);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMenus();
        hideShutdown();
        $$('.cassette.open').forEach((c) => c.classList.remove('open'));
        return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
        const el = e.target.closest ? e.target.closest('.cassette:not(.disabled), .special-avatar, #win98-shutdown') : null;
        if (el && e.target === el) { e.preventDefault(); el.click(); }
    }
});

// ==========================================
// 10. ЗМЕЙКА PYTHON (наведи на иконку Python и подожди)
// ==========================================
let gameLoop = null, gameTimeout = null, holdTimeout = null;
let score = 0, currentIndex = 0, gameActive = false, appleIndex = -1;

function initSnake() {
    const pythonCard = $('.snake-card');
    const trigger = $('#python-trigger');
    const gameArea = $('#python-game');
    if (!pythonCard || !trigger || !gameArea) return;

    gameArea.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('snake-cell');
        gameArea.appendChild(cell);
    }
    const head = document.createElement('img');
    head.id = 'snake-head';
    head.alt = '';
    head.width = 40; head.height = 40;
    head.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg';
    head.style.opacity = '0';
    gameArea.appendChild(head);
    const cells = $$('.snake-cell', gameArea);

    let lastTouch = 0;
    const startHold = (ms) => { if (gameActive) return; clearTimeout(holdTimeout); holdTimeout = setTimeout(startSnakeGame, ms); };
    const cancelHold = () => clearTimeout(holdTimeout);
    trigger.addEventListener('mouseenter', () => { if (Date.now() - lastTouch > 800) startHold(5000); });
    trigger.addEventListener('mouseleave', cancelHold);
    // на телефонах — долгое нажатие
    trigger.addEventListener('touchstart', () => { lastTouch = Date.now(); startHold(3000); }, { passive: true });
    ['touchend', 'touchcancel'].forEach((ev) => trigger.addEventListener(ev, () => { lastTouch = Date.now(); cancelHold(); }));

    function updateHeadPosition(index) {
        head.style.top = `${Math.floor(index / 10) * 10}%`;
        head.style.left = `${(index % 10) * 10}%`;
    }
    function spawnApple() {
        let pos;
        do { pos = Math.floor(Math.random() * 100); } while (pos === currentIndex);
        appleIndex = pos;
        cells[appleIndex].classList.add('snake-apple');
    }
    function startSnakeGame() {
        if (gameActive) return;
        gameActive = true;
        pythonCard.classList.add('playing');
        cells.forEach((c) => c.classList.remove('snake-apple'));
        score = 0;
        currentIndex = 45;
        updateHeadPosition(currentIndex);
        head.style.opacity = '1';
        head.style.transform = 'scale(1)';
        spawnApple();
        gameTimeout = setTimeout(endSnakeGame, 10000);
        gameLoop = setInterval(moveSnakeTowardsApple, 250);
    }
    function moveSnakeTowardsApple() {
        if (!gameActive) return;
        const currRow = Math.floor(currentIndex / 10), currCol = currentIndex % 10;
        const targetRow = Math.floor(appleIndex / 10), targetCol = appleIndex % 10;
        let next = currentIndex;
        if (currRow < targetRow) next = currentIndex + 10;
        else if (currRow > targetRow) next = currentIndex - 10;
        else if (currCol < targetCol) next = currentIndex + 1;
        else if (currCol > targetCol) next = currentIndex - 1;
        if (next < 0 || next >= 100) return;
        currentIndex = next;
        updateHeadPosition(currentIndex);
        if (currentIndex === appleIndex) {
            score++;
            cells[currentIndex].classList.remove('snake-apple');
            head.style.transform = `scale(${Math.min(1 + score * 0.2, 2.5)})`;
            if (score >= 6) endSnakeGame(); else spawnApple();
        }
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
            head.style.opacity = '0';
            cells.forEach((c) => c.classList.remove('snake-apple'));
            appleIndex = -1;
        }, 500);
    }
}

// ==========================================
// 11. ЗАГОЛОВОК ВКЛАДКИ
// ==========================================
let tabTimer = null;
document.addEventListener('visibilitychange', () => {
    clearTimeout(tabTimer);
    if (document.hidden) {
        tabTimer = setTimeout(() => {
            if (!document.hidden) return;
            const phrases = t('tab_phrases');
            document.title = phrases[Math.floor(Math.random() * phrases.length)];
        }, 1000);
    } else {
        document.title = t('page_title');
    }
});

// ==========================================
// 12. КОТ ПЕЧАТАЕТ
// ==========================================
const catCategories = {
    philosophy: ["Если дерево падает в лесу, а никто не слышит... оно падает?", "Смысл жизни в том, чтобы найти сосиску.", "Мы все просто код в чьей-то матрице.", "Ты не ты, когда голоден.", "Почему мы здесь? Просто чтобы страдать?", "Время — иллюзия, а обед — нет.", "Я мыслю, следовательно, я мяукаю.", "Вселенная бесконечна, как и моя наглость.", "Не важно, куда ты идешь, важно, где твоя миска.", "Счастье — это когда тебя гладят.", "Мы живем в симуляции, и создатель этого сайта — студент.", "Жизнь коротка, а обед длится вечность.", "Что первично: дух или материя? Материя (еда).", "В конце времен останется только пыль и мой мурмур.", "Я видел вечность и она была полна пустых мисок."],
    cute: ["Я котик:3", "Мяу-мяу! (＾▽＾)", "Сделай мне погладить!", "Я самый милый кот в этом интернете.", "Мурмурмур... (￣▽￣)", "А ты знаешь, что я люблю тебя?", "Дай сосиску, и я дам тебе лапку.", "Я пушистый и опасный.", "Ты меня покормил? Я тебя люблю.", "Я сплю 20 часов в сутки, а ты?", "Мой хвост — моя жизнь.", "Я бегу к тебе со всех лап!", "У меня самые лучшие уши на свете.", "Ты меня гладишь, я мурчу.", "Спасибо, что ты есть. (｡•́︿•̀｡)"],
    it_memes: ["Это не баг, это фича.", "Работает? Не трогай!", "У меня все работает на моей машине.", "Ты забыл поставить точку с запятой, да?", "Код, который я писал в 3 часа ночи, работает, но я не знаю как.", "Стек: Python, Django, и надежда.", "Ты когда-нибудь видел, как горит сервер? Я нет, но слышал.", "Перезагрузка решает все проблемы.", "Git push --force и будь что будет.", "Я не пишу код, я пишу спагетти.", "Тестирование — для слабаков.", "Ты думал, что я умный? Я просто гуглю.", "Мой код — это искусство, а ты не понимаешь.", "Я не знаю, как это работает, но это работает.", "У меня 99 багов, но я их не фикшу."],
    breaking_4th: ["Ты зачем сюда скроллишь?", "Я знаю, что ты читаешь это. Я вижу тебя.", "Хватит пялиться на мой экран!", "Ты думаешь, я не настоящий кот?", "А ты знал, что создатель этого сайта... это я? Нет, шучу.", "Ты читаешь это, а я наблюдаю за тобой.", "Привет, ты! Да, именно ты.", "Ты думаешь, это игра? Это симуляция.", "Ты нажал на кнопку? Я видел.", "Улыбнись, тебя снимает камера.", "Я знаю, что ты не спал всю ночь.", "Ты когда-нибудь выходил из этой комнаты?", "Я кот, который знает, где ты живешь.", "Не закрывай вкладку, мне скучно.", "Ты думал, что я не замечу, как ты меня читаешь?"],
    miku: ["А ты знал, что трек Мику 'World is Mine' считается классикой?", "Мику — это вокалоид, созданный Yamaha в 2007.", "Мику говорит только 'Мику-Мику' в оригинале.", "Она самая известная виртуальная певица в мире.", "Мику дала концерты в реальном мире с голограммой.", "Ее день рождения — 31 августа.", "Мику — топ!", "Ты слушал 'Ievan Polkka' в ее исполнении?", "Мику — не просто картинка, это голос.", "Она — символ всей вокалоидной культуры.", "Знаешь, сколько фанатов у Мику? Миллионы.", "Мику вдохновила на создание тысяч песен.", "Она — икона стиля и будущего.", "Мику — это моя жизнь.", "Я не фанат, я — преданный последователь Мику."],
    site_creation: ["Ты думал создавать сайт легко? Меня писали, чтобы я нормально работал, кучу часов!", "Знаешь, сколько багов было исправлено? Ты даже не представляешь.", "Этот сайт — результат кучи ночей и кофе.", "Я создан, чтобы ты улыбался.", "Сайт собирался из трех файлов, а работает на четырех.", "Мой разработчик не спал неделю, чтобы ты это увидел.", "Тут было столько ошибок, что я устал их считать.", "Это не просто сайт, это история.", "Я — результат чистой воли и отладки.", "Сайт писался под ночные треки Мику.", "Ты не поверишь, но я почти сломался.", "Сайт — это труд, а не просто код.", "Мой создатель попросил меня быть милым.", "Я — кот, созданный человеком.", "Ты держишь в руках (на экране) мою душу."],
    random: ["ыыыы", "явапвпкопл", "фываолддж", "афывафыва", "покопокоп", "рукавп", "мыфмфмм", "вапвапвап", "йцукенг", "фывапрол", "ячсмить", "олдфыва", "пукпукпук", "мыыыыш", "фыва"]
};

const catText = $('#cat-text');
let catCategory = null, catUsed = [], catTyper = null, catNext = null, catActive = false;
const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

function stopCat() {
    catActive = false;
    clearInterval(catTyper); clearTimeout(catNext);
    catTyper = null; catNext = null;
    if (catText) catText.textContent = '';
}
function startCat() {
    if (catActive || !catText || !FLAGS.cat) return;
    catActive = true;
    typeNextPhrase();
}
function scheduleNextPhrase() { catNext = setTimeout(typeNextPhrase, 3000); }
function typeNextPhrase() {
    if (!catActive) return;
    if (!catCategory || catUsed.length >= catCategories[catCategory].length) {
        catCategory = randItem(Object.keys(catCategories));
        catUsed = [];
    }
    const phrase = randItem(catCategories[catCategory].filter((p) => !catUsed.includes(p)));
    catUsed.push(phrase);
    catText.textContent = '';
    if (!animOn()) { catText.textContent = phrase; scheduleNextPhrase(); return; }
    const chars = Array.from(phrase);
    let i = 0;
    catTyper = setInterval(() => {
        if (i < chars.length) {
            catText.textContent += chars[i++];
        } else {
            clearInterval(catTyper); catTyper = null;
            if (Math.random() < 0.3) catCategory = null; // с шансом 30% меняем тему
            scheduleNextPhrase();
        }
    }, 100);
}
const catObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) startCat(); else stopCat(); });
}, { threshold: 0.1 });

// ==========================================
// 13. ТЕРМИНАЛ
// ==========================================
const termInput = $('#term-input');
const termOutput = $('#term-output');
const termHistory = [];
let termPos = 0, termReady = false;
const fmt = (str, ...args) => str.replace(/\{(\d+)\}/g, (m, i) => (args[i] !== undefined ? args[i] : m));

function printToTerminal(text, className = '') {
    if (!termOutput) return;
    const p = document.createElement('p');
    p.textContent = text;
    if (className) p.classList.add(className);
    termOutput.appendChild(p);
    const body = $('.terminal-body');
    if (body) body.scrollTop = body.scrollHeight;
}
function openTerminal() {
    if (termReady) return;
    termReady = true;
    printToTerminal("Welcome to EkeVoki OS v1.0. Type 'help' for commands.");
}
function runCommand(raw) {
    const cmd = raw.trim();
    printToTerminal(`guest@ekevoki:~$ ${cmd}`);
    if (!cmd) return;
    const parts = cmd.toLowerCase().split(/\s+/);
    const head = parts[0];
    const arg = parts.slice(1).join(' ');
    switch (head) {
        case 'help': t('term_help').forEach((line, i) => printToTerminal(line, i === 0 ? 'term-info' : '')); break;
        case 'about': printToTerminal('EkeVoki - Python Developer.'); break;
        case 'skills': printToTerminal("Python, C++, JS, NumPy, Pandas, Git, Ren'Py."); break;
        case 'friends': printToTerminal('Вадим, Christopher, Сергей, Витя, Леон, Максим, DevSvytaslav.'); break;
        case 'date': printToTerminal(new Date().toLocaleString({ ru: 'ru-RU', en: 'en-GB', zh: 'zh-CN' }[currentLang])); break;
        case 'clear': termOutput.innerHTML = ''; break;
        case 'exit': setTheme(lastVisualTheme); break;
        case '.lang01': setLang('ru'); printToTerminal(t('term_lang_set')); break;
        case '.lang02': setLang('en'); printToTerminal(t('term_lang_set')); break;
        case '.lang03': setLang('zh'); printToTerminal(t('term_lang_set')); break;
        case 'lang': {
            const l = normLang(arg);
            if (l) { setLang(l); printToTerminal(t('term_lang_set')); }
            else printToTerminal(fmt(t('term_lang_bad'), arg), 'term-error');
            break;
        }
        case 'theme': {
            if (arg === 'list') { printToTerminal(THEMES.filter((x) => x !== 'terminal').join(', ')); break; }
            const th = normTheme(arg);
            if (th && th !== 'terminal') setTimeout(() => setTheme(th), 500);
            else if (!th) printToTerminal(fmt(t('term_theme_bad'), arg), 'term-error');
            break;
        }
        default: printToTerminal(fmt(t('term_cmd_bad'), cmd), 'term-error');
    }
}
if (termInput) {
    termInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const value = this.value;
            this.value = '';
            if (value.trim()) { termHistory.push(value); termPos = termHistory.length; }
            runCommand(value);
        } else if (e.key === 'ArrowUp') {
            if (termPos > 0) { termPos--; this.value = termHistory[termPos]; }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (termPos < termHistory.length - 1) { termPos++; this.value = termHistory[termPos]; }
            else { termPos = termHistory.length; this.value = ''; }
            e.preventDefault();
        }
    });
    const termWindow = $('.terminal-window');
    if (termWindow) termWindow.addEventListener('click', (e) => { if (!e.target.closest('button') && !window.getSelection().toString()) termInput.focus({ preventScroll: true }); });
}

// ==========================================
// 14. ЗАПУСК
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    if (!FLAGS.anim) document.body.classList.add('no-anim');

    if (FLAGS.clock) {
        updateClock();
        setInterval(updateClock, 1000);
    } else {
        const navClock = $('#nav-clock'), tray = $('.win98-tray');
        if (navClock) navClock.classList.add('hidden');
        if (tray) tray.classList.add('hidden');
    }

    // Приоритет языка: ?lang= > сохранённый выбор > язык браузера > русский
    const navLang = normLang((navigator.languages && navigator.languages[0]) || navigator.language);
    setLang(normLang(params.get('lang')) || normLang(store.get('site-lang')) || navLang || 'ru', { persist: false, syncUrl: false });
    // Приоритет темы: ?theme= > сохранённая > стартовая
    setTheme(normTheme(params.get('theme')) || normTheme(store.get('site-theme')) || 'dark', { persist: false, syncUrl: false, initial: true });

    if (FLAGS.snake) initSnake();

    const catZone = $('#cat-zone');
    if (catZone) {
        if (FLAGS.cat) catObserver.observe(catZone);
        else catZone.classList.add('hidden');
    }

    const now = new Date();
    if (FLAGS.cake || (now.getMonth() === 9 && now.getDate() === 23)) {
        const cake = $('#birthday-cake');
        if (cake) cake.classList.add('visible');
    }
});
