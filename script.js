/* ============================================
   EduTech Academy - Shared JavaScript
   ============================================ */

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type = 'info', duration = 3000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================
// LOCAL STORAGE
// ============================================
const Storage = {
    get(key) {
        try { return JSON.parse(localStorage.getItem('edutech_' + key)); }
        catch { return null; }
    },
    set(key, value) {
        try { localStorage.setItem('edutech_' + key, JSON.stringify(value)); }
        catch { console.warn('Storage not available'); }
    },
    remove(key) { localStorage.removeItem('edutech_' + key); }
};

// ============================================
// AUTH
// ============================================
const Auth = {
    login(name) { Storage.set('user', { name, loginTime: Date.now() }); },
    logout()    { Storage.remove('user'); window.location.href = 'index.html'; },
    getUser()   { return Storage.get('user'); },
    isLoggedIn(){ return !!this.getUser(); },
    requireLogin() {
        if (!this.isLoggedIn()) { window.location.href = 'index.html'; return false; }
        return true;
    }
};

// ============================================
// PROGRESS
// ============================================
const Progress = {
    getCompleted(courseId)          { return Storage.get(`progress_${courseId}`) || []; },
    markComplete(courseId, lessonId){
        const c = this.getCompleted(courseId);
        if (!c.includes(lessonId)) { c.push(lessonId); Storage.set(`progress_${courseId}`, c); }
    },
    getPercent(courseId, totalLessons){
        const c = this.getCompleted(courseId);
        return totalLessons > 0 ? Math.round((c.length / totalLessons) * 100) : 0;
    },
    isCompleted(courseId, lessonId){ return this.getCompleted(courseId).includes(lessonId); }
};

// ============================================
// HELPERS
// ============================================
function animateProgressBars() {
    document.querySelectorAll('.progress-fill[data-width]').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
    });
}

function renderUserHeader() {
    const user = Auth.getUser();
    const avatar = document.querySelector('.user-avatar');
    if (avatar && user) {
        avatar.textContent = user.name.charAt(0).toUpperCase();
        avatar.title = user.name;
    }
}

function showFieldError(fieldId, errorId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    if (!input || !error) return;
    if (message) {
        error.textContent = message;
        error.classList.add('show');
        input.classList.add('input-error');
    } else {
        error.classList.remove('show');
        input.classList.remove('input-error');
    }
}

// ============================================
// COURSES DATA  — real YouTube videos, 5 lessons each
// ============================================
const COURSES = [
    {
        id: 'ai-basics',
        title: 'Artificial Intelligence Fundamentals',
        description: 'Understand the core concepts of AI, machine learning models, and neural networks through real university-level lectures.',
        category: 'AI & ML',
        level: 'Beginner',
        duration: '2h 37m',
        lessons: 5,
        instructor: 'Andrew Ng — DeepLearning.AI',
        rating: 4.9,
        students: 3200,
        icon: 'fa-brain',
        color: '#0057FF',
        tags: ['Python', 'ML', 'Neural Networks'],
        lessonList: [
            { id: 'l1', title: 'What is AI? — Introduction & Overview',         duration: '15:52', videoId: 'ad79nYk2keg' },
            { id: 'l2', title: 'Neural Networks — Visual Explanation',           duration: '19:13', videoId: 'aircAruvnKk' },
            { id: 'l3', title: 'Gradient Descent — How ML Models Learn',        duration: '21:03', videoId: 'IHZwWFHWa-w' },
            { id: 'l4', title: 'Natural Language Processing Fundamentals',       duration: '26:18', videoId: 'fOvTtapxa9c' },
            { id: 'l5', title: 'AI in Real Life — Applications & Future Trends', duration: '35:00', videoId: 'mJeNghZXtMo' },
        ]
    },
    {
        id: 'web-dev',
        title: 'Full-Stack Web Development',
        description: 'Build modern web applications from scratch using HTML, CSS, JavaScript, and Node.js with hands-on project-based learning.',
        category: 'Web Dev',
        level: 'Intermediate',
        duration: '3h 14m',
        lessons: 5,
        instructor: 'Beau Carnes — freeCodeCamp',
        rating: 4.9,
        students: 5100,
        icon: 'fa-code',
        color: '#00C896',
        tags: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
        lessonList: [
            { id: 'l1', title: 'HTML5 Structure & Semantic Elements',  duration: '46:00', videoId: 'kUMe1FH4CHE' },
            { id: 'l2', title: 'CSS3 Layouts, Flexbox & Grid',         duration: '37:00', videoId: '1Rs2ND1ryYc' },
            { id: 'l3', title: 'JavaScript Essentials for the Web',    duration: '48:00', videoId: 'PkZNo7MFNFg' },
            { id: 'l4', title: 'DOM Manipulation & Events',            duration: '31:00', videoId: '5fb2aPlgoys' },
            { id: 'l5', title: 'Node.js & Building a REST API',        duration: '32:00', videoId: 'fBNz5xF-Kx4' },
        ]
    },
    {
        id: 'data-science',
        title: 'Data Science with Python',
        description: 'Analyze real-world data, build visualizations, and create predictive models using Python, Pandas, and Matplotlib.',
        category: 'Data Science',
        level: 'Intermediate',
        duration: '2h 48m',
        lessons: 5,
        instructor: 'Keith Galli — Data Scientist',
        rating: 4.8,
        students: 2400,
        icon: 'fa-chart-line',
        color: '#FF3D57',
        tags: ['Python', 'Pandas', 'NumPy', 'Matplotlib'],
        lessonList: [
            { id: 'l1', title: 'Python for Data Science — Full Crash Course', duration: '34:00', videoId: '_uQrJ0TkZlc' },
            { id: 'l2', title: 'NumPy Complete Tutorial',                      duration: '35:00', videoId: 'QUT1VHiLmmI' },
            { id: 'l3', title: 'Pandas for Data Analysis',                    duration: '40:00', videoId: 'vmEHCJofslg' },
            { id: 'l4', title: 'Data Visualization with Matplotlib',          duration: '29:00', videoId: 'DAQNHzOcO5A' },
            { id: 'l5', title: 'Building Your First ML Predictive Model',     duration: '30:00', videoId: 'M9Itm95JzL0' },
        ]
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity Essentials',
        description: 'Learn to protect systems and networks from digital attacks, understand ethical hacking, and master the fundamentals of InfoSec.',
        category: 'Security',
        level: 'Beginner',
        duration: '2h 22m',
        lessons: 5,
        instructor: 'NetworkChuck',
        rating: 4.7,
        students: 1850,
        icon: 'fa-shield-alt',
        color: '#FFB800',
        tags: ['Networking', 'Linux', 'Ethical Hacking'],
        lessonList: [
            { id: 'l1', title: 'Cybersecurity for Beginners — Full Overview',   duration: '31:00', videoId: 'inWWhr5tnEA' },
            { id: 'l2', title: 'How the Internet & Networking Work',             duration: '25:00', videoId: 'qiQR5rTSshw' },
            { id: 'l3', title: 'Phishing & Social Engineering Attacks Explained', duration: '27:00', videoId: 'u9dBGWVwMMA' },
            { id: 'l4', title: 'Linux for Hackers — Getting Started',           duration: '29:00', videoId: 'VbEx7B_PTOE' },
            { id: 'l5', title: 'Ethical Hacking Full Introduction',             duration: '30:00', videoId: '3Kq1MIfTWCE' },
        ]
    }
];

// ============================================
// LOGIN PAGE LOGIC
// ============================================
function initLoginPage() {
    if (Auth.isLoggedIn()) { window.location.href = 'courses.html'; return; }

    function handleLogin() {
        const name = document.getElementById('nameInput').value.trim();
        const pass = document.getElementById('passInput').value;
        let valid = true;

        if (!name) {
            showFieldError('nameInput', 'nameError', 'Please enter your name');
            valid = false;
        } else {
            showFieldError('nameInput', 'nameError', null);
        }

        if (!pass) {
            showFieldError('passInput', 'passError', 'Please enter a password');
            valid = false;
        } else if (pass.length < 8) {
            showFieldError('passInput', 'passError', 'Password must be at least 8 characters');
            valid = false;
        } else {
            showFieldError('passInput', 'passError', null);
        }

        if (!valid) return;

        Auth.login(name);
        showToast('Welcome back, ' + name + '!', 'success');
        setTimeout(() => { window.location.href = 'courses.html'; }, 800);
    }

    document.getElementById('loginBtn').addEventListener('click', handleLogin);

    document.addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });

    // Real-time password feedback
    document.getElementById('passInput').addEventListener('input', function () {
        const val = this.value;
        if (val.length > 0 && val.length < 8) {
            showFieldError('passInput', 'passError', `Password must be at least 8 characters (${val.length}/8)`);
        } else if (val.length >= 8) {
            showFieldError('passInput', 'passError', null);
        }
    });
}

// ============================================
// COURSES PAGE LOGIC
// ============================================
function initCoursesPage() {
    Auth.requireLogin();

    let activeFilter = 'all';

    function renderCourses(list) {
        const grid = document.getElementById('coursesGrid');
        if (!grid) return;

        if (list.length === 0) {
            grid.innerHTML = `<div class="no-results"><i class="fas fa-search"></i><p>No courses found</p></div>`;
            return;
        }

        grid.innerHTML = list.map((c, i) => {
            const percent   = Progress.getPercent(c.id, c.lessons);
            const hasProgress = percent > 0;
            const btnLabel  = percent === 0 ? 'Start Course' : (percent === 100 ? 'Review' : 'Continue');
            const btnIcon   = percent === 0 ? 'fa-play' : (percent === 100 ? 'fa-redo' : 'fa-arrow-right');

            return `
            <a class="course-card" href="course.html?id=${c.id}" style="animation-delay:${i * 0.07}s">
                <div class="card-banner" style="background:linear-gradient(135deg,${c.color}99,${c.color}22)">
                    <i class="fas ${c.icon} card-banner-icon"></i>
                </div>
                <div class="card-body">
                    <div class="card-category">${c.category}</div>
                    <div class="card-title">${c.title}</div>
                    <div class="card-desc">${c.description}</div>
                    <div class="card-meta">
                        <span><i class="fas fa-play-circle"></i>${c.lessons} lessons</span>
                        <span><i class="fas fa-clock"></i>${c.duration}</span>
                        <span><i class="fas fa-signal"></i>${c.level}</span>
                    </div>
                    <div class="card-progress-wrap ${hasProgress ? 'visible' : ''}">
                        <div class="card-progress-label"><span>Progress</span><span>${percent}%</span></div>
                        <div class="progress-bar">
                            <div class="progress-fill" data-width="${percent}"></div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="card-rating"><i class="fas fa-star"></i>${c.rating}</div>
                        <button class="btn btn-primary card-btn">
                            <i class="fas ${btnIcon}"></i> ${btnLabel}
                        </button>
                    </div>
                </div>
            </a>`;
        }).join('');

        animateProgressBars();
    }

    function filterAndSearch() {
        const q = document.getElementById('searchField').value.toLowerCase();
        let list = COURSES;
        if (activeFilter !== 'all') list = list.filter(c => c.level === activeFilter);
        if (q) list = list.filter(c =>
            c.title.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q) ||
            c.tags.some(t => t.toLowerCase().includes(q))
        );
        renderCourses(list);
    }

    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilter = pill.dataset.filter;
            filterAndSearch();
        });
    });

    const searchField = document.getElementById('searchField');
    if (searchField) searchField.addEventListener('input', filterAndSearch);

    renderCourses(COURSES);
}

// ============================================
// COURSE PAGE LOGIC
// ============================================
function initCoursePage() {
    Auth.requireLogin();

    const params   = new URLSearchParams(window.location.search);
    const courseId = params.get('id') || 'ai-basics';
    const course   = COURSES.find(c => c.id === courseId) || COURSES[0];

    function getPercent() { return Progress.getPercent(course.id, course.lessonList.length); }

    function updateProgressUI() {
        const pct       = getPercent();
        const completed = Progress.getCompleted(course.id).length;
        const total     = course.lessonList.length;

        document.getElementById('progressNum').textContent        = pct + '%';
        document.getElementById('mainBar').style.width            = pct + '%';
        document.getElementById('sidebarPercent').textContent     = pct + '%';
        document.getElementById('sidebarBar').style.width         = pct + '%';

        document.getElementById('progressStats').innerHTML = `
            <div class="p-stat"><i class="fas fa-check-circle"></i>${completed} of ${total} lessons done</div>
            <div class="p-stat"><i class="fas fa-clock"></i>${course.duration} total</div>
            <div class="p-stat"><i class="fas fa-user"></i>${course.instructor}</div>
        `;

        const btn = document.getElementById('heroBtn');
        if (pct === 0)         { btn.innerHTML = '<i class="fas fa-play"></i> Start Course'; btn.className = 'btn btn-primary'; }
        else if (pct === 100)  { btn.innerHTML = '<i class="fas fa-trophy"></i> Completed!'; btn.className = 'btn btn-success'; }
        else                   { btn.innerHTML = '<i class="fas fa-arrow-right"></i> Continue'; btn.className = 'btn btn-primary'; }
    }

    function renderSidebar() {
        document.getElementById('lessonList').innerHTML = course.lessonList.map((lesson, i) => {
            const done = Progress.isCompleted(course.id, lesson.id);
            return `
            <div class="lesson-item" data-id="${lesson.id}" data-index="${i}" onclick="window.location.href='lesson.html?course=${course.id}&lesson=${lesson.id}'">
                <div class="lesson-check ${done ? 'done' : ''}">
                    <i class="fas ${done ? 'fa-check' : 'fa-play'}"></i>
                </div>
                <div class="lesson-info">
                    <div class="lesson-name">${lesson.title}</div>
                    <div class="lesson-dur">${lesson.duration}</div>
                </div>
            </div>`;
        }).join('');
    }

    function renderHero() {
        document.title = `EduTech — ${course.title}`;
        document.getElementById('heroCat').textContent   = course.category;
        document.getElementById('heroTitle').textContent = course.title;
        document.getElementById('heroDesc').textContent  = course.description;
        document.getElementById('sidebarTitle').textContent = course.title;

        document.getElementById('heroTags').innerHTML =
            course.tags.map(t => `<span class="tag">${t}</span>`).join('');

        document.getElementById('heroMeta').innerHTML = `
            <div class="hero-meta-item"><i class="fas fa-play-circle"></i>${course.lessons} lessons</div>
            <div class="hero-meta-item"><i class="fas fa-clock"></i>${course.duration}</div>
            <div class="hero-meta-item"><i class="fas fa-signal"></i>${course.level}</div>
            <div class="hero-meta-item"><i class="fas fa-star" style="color:var(--warning)"></i>${course.rating}</div>
        `;

        const iconWrap = document.getElementById('heroIconWrap');
        iconWrap.style.background = course.color + '22';
        iconWrap.style.border     = `2px solid ${course.color}44`;

        const icon = document.getElementById('heroIcon');
        icon.className  = `fas ${course.icon}`;
        icon.style.color = course.color;

        document.getElementById('heroBtn').href = `lesson.html?course=${course.id}&lesson=${course.lessonList[0].id}`;
    }

    window.toggleSidebar = function () { document.getElementById('sidebar').classList.toggle('open'); };

    document.addEventListener('click', e => {
        const sidebar = document.getElementById('sidebar');
        const toggle  = document.querySelector('.menu-toggle');
        if (window.innerWidth <= 900 && sidebar && toggle &&
            !sidebar.contains(e.target) && !toggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    renderHero();
    renderSidebar();
    updateProgressUI();
}

// ============================================
// LESSON PAGE LOGIC
// ============================================
function initLessonPage() {
    Auth.requireLogin();

    const params   = new URLSearchParams(window.location.search);
    const courseId = params.get('course') || 'ai-basics';
    const lessonId = params.get('lesson');
    const course   = COURSES.find(c => c.id === courseId) || COURSES[0];
    let currentIndex = course.lessonList.findIndex(l => l.id === lessonId);
    if (currentIndex < 0) currentIndex = 0;

    function currentLesson() { return course.lessonList[currentIndex]; }

    function renderPage() {
        const lesson = currentLesson();
        const isDone = Progress.isCompleted(course.id, lesson.id);

        document.title = `EduTech — ${lesson.title}`;
        document.getElementById('lessonTitle').textContent      = lesson.title;
        document.getElementById('lessonDur').textContent        = lesson.duration;
        document.getElementById('lessonInstructor').textContent = course.instructor;
        document.getElementById('breadCourse').textContent      = course.title;
        document.getElementById('breadCourse').href             = `course.html?id=${course.id}`;
        document.getElementById('breadLesson').textContent      = lesson.title;
        document.getElementById('sidebarCourseName').textContent = course.title;
        document.getElementById('lessonCounter').textContent    = `Lesson ${currentIndex + 1} of ${course.lessonList.length}`;
        document.getElementById('lessonDoneTag').style.display  = isDone ? 'flex' : 'none';

        const markBtn = document.getElementById('markDoneBtn');
        markBtn.innerHTML   = isDone ? '<i class="fas fa-check-circle"></i> Completed' : '<i class="fas fa-check"></i> Mark as Done';
        markBtn.className   = `nav-btn mark-done${isDone ? ' done' : ''}`;

        document.getElementById('videoFrame').src = `https://www.youtube.com/embed/${lesson.videoId}?rel=0`;
        document.getElementById('prevBtn').disabled = currentIndex === 0;
        document.getElementById('nextBtn').disabled = currentIndex === course.lessonList.length - 1;

        renderSidebar();
    }

    function renderSidebar() {
        document.getElementById('lessonList').innerHTML = course.lessonList.map((l, i) => {
            const done    = Progress.isCompleted(course.id, l.id);
            const current = i === currentIndex;
            return `
            <div class="lesson-item ${current ? 'active' : ''}" onclick="jumpTo(${i})">
                <div class="lesson-num ${done ? 'done' : current ? 'current' : ''}">
                    ${done ? '<i class="fas fa-check"></i>' : (i + 1)}
                </div>
                <div class="lesson-info">
                    <div class="lesson-name">${l.title}</div>
                    <div class="lesson-dur">${l.duration}</div>
                </div>
            </div>`;
        }).join('');
    }

    window.markDone = function () {
        const lesson = currentLesson();
        if (!Progress.isCompleted(course.id, lesson.id)) {
            Progress.markComplete(course.id, lesson.id);
            showToast('Lesson marked as complete!', 'success');
            if (currentIndex < course.lessonList.length - 1) {
                setTimeout(() => goLesson(1), 800);
            }
        }
        renderPage();
    };

    window.goLesson = function (dir) {
        const next = currentIndex + dir;
        if (next < 0 || next >= course.lessonList.length) return;
        currentIndex = next;
        const l = course.lessonList[currentIndex];
        history.pushState({}, '', `?course=${course.id}&lesson=${l.id}`);
        renderPage();
        window.scrollTo(0, 0);
    };

    window.jumpTo = function (index) {
        currentIndex = index;
        const l = course.lessonList[currentIndex];
        history.pushState({}, '', `?course=${course.id}&lesson=${l.id}`);
        renderPage();
        if (window.innerWidth <= 900) document.getElementById('sidebar').classList.remove('open');
    };

    window.toggleSidebar = function () { document.getElementById('sidebar').classList.toggle('open'); };

    document.addEventListener('click', e => {
        const sidebar = document.getElementById('sidebar');
        const toggle  = document.querySelector('.menu-toggle');
        if (window.innerWidth <= 900 && sidebar && toggle &&
            !sidebar.contains(e.target) && !toggle.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  goLesson(1);
        if (e.key === 'ArrowRight') goLesson(-1);
        if (e.key === 'Enter')      markDone();
    });

    renderPage();
}

// ============================================
// LOGOUT
// ============================================
function handleLogout() { Auth.logout(); }

// ============================================
// AUTO-INIT — detect current page by body class
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderUserHeader();
    animateProgressBars();

    const body = document.body;
    if      (body.classList.contains('login-page'))   initLoginPage();
    else if (body.classList.contains('courses-page'))  initCoursesPage();
    else if (body.classList.contains('course-page'))   initCoursePage();
    else if (body.classList.contains('lesson-page'))   initLessonPage();
});