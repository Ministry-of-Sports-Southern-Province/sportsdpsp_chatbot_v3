(() => {
    'use strict';

    const root = document.getElementById('sportsdpsp-chatbot');
    if (!root || !window.SPORTSDPSP_CHATBOT) return;

    const data = window.SPORTSDPSP_CHATBOT;
    const cfg = data.config;
    const translations = data.translations;

    const launcher = document.getElementById('chatbotLauncher');
    const panel = document.getElementById('chatbotPanel');
    const closeBtn = document.getElementById('chatbotClose');
    const body = document.getElementById('chatbotBody');
    const form = document.getElementById('chatbotForm');
    const input = document.getElementById('chatbotInput');
    const title = document.getElementById('chatbotTitle');
    const department = document.getElementById('chatbotDepartment');
    const footer = document.getElementById('chatbotFooter');

    let lang = localStorage.getItem('sportsdpsp_chat_lang') || '';
    let showingIntro = false;

    function tr(key) {
        return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
    }

    function esc(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll("'", '&#039;');
    }

    function addMessage(text, who = 'bot', buttons = []) {
        const wrap = document.createElement('div');
        wrap.className = `chatbot-message ${who}`;

        const bubble = document.createElement('div');
        bubble.className = 'chatbot-bubble';
        bubble.innerHTML = esc(text);
        wrap.appendChild(bubble);

        if (buttons.length) {
            const grid = document.createElement('div');
            grid.className = 'chatbot-buttons';

            buttons.forEach(item => {
                const button = document.createElement('button');
                button.type = 'button';
                button.className = `chatbot-action ${item.primary ? 'primary' : ''} ${item.full ? 'full' : ''}`;
                button.textContent = item.label;
                button.addEventListener('click', item.action);
                grid.appendChild(button);
            });

            wrap.appendChild(grid);
        }

        body.appendChild(wrap);
        body.scrollTop = body.scrollHeight;
    }

    function button(label, action, options = {}) {
        return {
            label,
            action,
            primary: !!options.primary,
            full: !!options.full
        };
    }

    function updateChrome() {
        title.textContent = tr('title');
        department.textContent = tr('department');
        input.placeholder = tr('input_placeholder');
        footer.textContent = tr('footer');
    }

    function chooseLanguage() {
        // Language selection is always the first screen when the chatbot opens.
        showingIntro = false;
        body.innerHTML = '';

        title.textContent = 'SportsDPSP Assistant';
        department.textContent = 'Department of Sports - Southern Province';
        input.placeholder = 'Type your question...';

        const box = document.createElement('div');
        box.className = 'language-box';
        box.innerHTML = `
            <div class="language-title">Please select your preferred language</div>
            <div class="language-sub">භාෂාව තෝරන්න / உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்</div>
        `;

        const grid = document.createElement('div');
        grid.className = 'chatbot-lang-grid';

        [['සිංහල', 'si', 'lang-si'], ['தமிழ்', 'ta', 'lang-ta'], ['English', 'en', 'lang-en']].forEach(([label, code, cls]) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = `chatbot-lang-btn ${cls}`;
            btn.textContent = label;
            btn.addEventListener('click', () => {
                lang = code;
                localStorage.setItem('sportsdpsp_chat_lang', lang);
                showingIntro = true;
                updateChrome();
                showIntroduction();
            });
            grid.appendChild(btn);
        });

        box.appendChild(grid);
        body.appendChild(box);

        const footerMessage = document.createElement('div');
        footerMessage.className = 'chatbot-language-note';
        footerMessage.textContent = 'Department of Sports - Southern Province';
        body.appendChild(footerMessage);
        body.scrollTop = body.scrollHeight;
    }

    function showIntroduction() {
        body.innerHTML = '';
        showingIntro = true;
        updateChrome();

        const intro = document.createElement('div');
        intro.className = 'chatbot-welcome';
        intro.innerHTML = `
            <div class="welcome-top">
                <img class="welcome-amal" src="${esc(cfg.assets.amal)}" alt="Amal pony mascot">
                <div>
                    <div class="welcome-title">${esc(tr('welcome_title'))}</div>
                    <div>${esc(tr('title'))}</div>
                </div>
            </div>
            <div class="welcome-copy">
                ${esc(tr('welcome_1'))}<br><br>
                ${esc(tr('welcome_2'))}<br><br>
                ${esc(tr('welcome_3'))}
            </div>
            <div class="amal-story">${esc(tr('amal_story'))}</div>
        `;
        body.appendChild(intro);

        const actions = document.createElement('div');
        actions.className = 'chatbot-buttons';
        const continueBtn = document.createElement('button');
        continueBtn.type = 'button';
        continueBtn.className = 'chatbot-action primary full';
        continueBtn.textContent = '→ ' + tr('continue');
        continueBtn.addEventListener('click', () => {
            showingIntro = false;
            body.innerHTML = '';
            addMessage(tr('language_prompt'));
            mainMenu();
        });
        actions.appendChild(continueBtn);
        body.appendChild(actions);

        body.scrollTop = body.scrollHeight;
    }

    function mainMenu() {
        const buttons = [
            button('🏢 ' + tr('menu_org'), () => showPage('about')),
            button('🖼 ' + tr('menu_gallery'), () => showPage('gallery')),
            button('📥 ' + tr('menu_downloads'), () => showPage('downloads')),
            button('👥 ' + tr('menu_staff'), () => showPage('staff')),
            button('📞 ' + tr('menu_contact'), () => showContact()),
            button('🏛 ' + tr('menu_other'), () => showOtherSites()),
            button('➕ ' + tr('menu_more'), () => showMore(), { full: true })
        ];
        addMessage(tr('menu_prompt'), 'bot', buttons);
    }

    function showMore() {
        addMessage(tr('more_prompt'), 'bot', [
            button('🏠 ' + tr('menu_home'), () => showPage('home')),
            button('🌐 ' + tr('menu_restart'), () => chooseLanguage()),
            button('🏛 ' + tr('menu_other'), () => showOtherSites()),
            button('📞 ' + tr('menu_contact'), () => showContact()),
            button('↩ ' + tr('menu_back'), () => mainMenu(), { full: true })
        ]);
    }

    function showPage(key) {
        const url = cfg.links[key];
        const text = tr(`${key}_text`);
        addMessage(text, 'bot', [
            button('➡ ' + tr('open_page'), () => { window.location.href = url; }, { primary: true }),
            button('↩ ' + tr('menu_back'), () => mainMenu())
        ]);
    }

    function showContact() {
        const c = cfg.contact;
        addMessage(tr('contact_heading') + '\n\n' + tr('contact_help'));

        const card = document.createElement('div');
        card.className = 'chatbot-contact-card';
        card.innerHTML = `
            <div class="chatbot-contact-item"><span class="chatbot-contact-label">${esc(tr('address_label'))}</span>${esc(c.address)}</div>
            <div class="chatbot-contact-item"><span class="chatbot-contact-label">${esc(tr('director_label'))}</span><a href="tel:${esc(c.director)}">${esc(c.director)}</a></div>
            <div class="chatbot-contact-item"><span class="chatbot-contact-label">${esc(tr('assistant_director_label'))}</span><a href="tel:${esc(c.assistant_director)}">${esc(c.assistant_director)}</a></div>
            <div class="chatbot-contact-item"><span class="chatbot-contact-label">${esc(tr('admin_officer_label'))}</span><a href="tel:${esc(c.administrative_officer)}">${esc(c.administrative_officer)}</a></div>
            <div class="chatbot-contact-item"><span class="chatbot-contact-label">${esc(tr('office_label'))}</span><a href="tel:${esc(c.office)}">${esc(c.office)}</a></div>
            <div class="chatbot-contact-item"><span class="chatbot-contact-label">${esc(tr('fax_label'))}</span>${esc(c.fax)}</div>
            <div class="chatbot-contact-item"><span class="chatbot-contact-label">${esc(tr('email_label'))}</span><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></div>
        `;
        body.appendChild(card);

        addMessage('', 'bot', [
            button('🔗 ' + tr('contact_page'), () => { window.location.href = cfg.links.contact; }, { primary: true, full: true }),
            button('↩ ' + tr('menu_back'), () => mainMenu(), { full: true })
        ]);
    }

    function showOtherSites() {
        addMessage(tr('other_intro'));

        if (!Array.isArray(cfg.other_sites) || cfg.other_sites.length === 0) {
            addMessage(tr('other_empty'), 'bot', [
                button('📞 ' + tr('menu_contact'), () => showContact()),
                button('↩ ' + tr('menu_back'), () => mainMenu())
            ]);
            return;
        }

        cfg.other_sites.forEach(site => {
            const link = document.createElement('a');
            link.className = 'other-site-card';
            link.href = site.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = `${esc(site.name)}<span class="other-site-url">${esc(site.url)}</span>`;
            body.appendChild(link);
        });

        addMessage('', 'bot', [button('↩ ' + tr('menu_back'), () => mainMenu(), { full: true })]);
    }

    const phraseSets = {
        en: {
            about: ['about', 'organization', 'organisation', 'department', 'ministry information'],
            gallery: ['gallery', 'photo', 'photos', 'picture', 'pictures', 'image', 'images'],
            downloads: ['download', 'downloads', 'document', 'documents', 'form', 'forms', 'circular', 'circulars', 'gazette', 'gazettes'],
            staff: ['staff', 'team', 'officers', 'employees', 'employee'],
            contact: ['contact', 'phone', 'telephone', 'email', 'address', 'office', 'fax', 'complaint', 'complain', 'help', 'assistance'],
            home: ['home', 'homepage', 'main page']
        },
        si: {
            about: ['අපි ගැන', 'සංවිධානය', 'දෙපාර්තමේන්තුව ගැන', 'දෙපාර්තමේන්තුව', 'තොරතුරු'],
            gallery: ['ගැලරිය', 'ඡායාරූප', 'පින්තූර', 'ඡායාරූප ගැලරිය'],
            downloads: ['බාගැනීම්', 'බාගන්න', 'ලේඛන', 'චක්‍රලේඛ', 'ගැසට්', 'පෝරම', 'ආකෘති පත්‍ර'],
            staff: ['කාර්ය මණ්ඩලය', 'නිලධාරී', 'නිලධාරින්', 'කණ්ඩායම'],
            contact: ['සම්බන්ධ', 'අමතන්න', 'දුරකථන', 'දුරකථන අංකය', 'ඊමේල්', 'විද්‍යුත් තැපෑල', 'ලිපිනය', 'කාර්යාලය', 'පැමිණිල්ල', 'පැමිණිලි', 'උදව්', 'සහාය'],
            home: ['මුල් පිටුව', 'ප්‍රධාන පිටුව', 'මුල් පිටුවට']
        },
        ta: {
            about: ['எங்களை பற்றி', 'அமைப்பு', 'துறை', 'துறை பற்றி', 'தகவல்'],
            gallery: ['காட்சியகம்', 'புகைப்படம்', 'புகைப்படங்கள்', 'படங்கள்'],
            downloads: ['பதிவிறக்கம்', 'பதிவிறக்கங்கள்', 'ஆவணம்', 'ஆவணங்கள்', 'சுற்றறிக்கை', 'வர்த்தமானி', 'படிவம்', 'படிவங்கள்'],
            staff: ['பணியாளர்கள்', 'ஊழியர்கள்', 'அதிகாரிகள்', 'குழு'],
            contact: ['தொடர்பு', 'தொடர்பு கொள்ள', 'தொலைபேசி', 'தொலைபேசி எண்', 'மின்னஞ்சல்', 'முகவரி', 'அலுவலகம்', 'தொலைநகல்', 'புகார்', 'புகார்கள்', 'உதவி'],
            home: ['முகப்பு', 'முகப்புப் பக்கம்', 'முதன்மை பக்கம்']
        }
    };

    function detectIntent(text) {
        const normalized = text.toLowerCase().trim();
        const pool = phraseSets[lang] || phraseSets.en;
        for (const [intent, phrases] of Object.entries(pool)) {
            if (phrases.some(phrase => normalized.includes(phrase.toLowerCase()))) return intent;
        }
        return null;
    }

    function answer(text) {
        addMessage(text, 'user');
        const intent = detectIntent(text);
        if (intent === 'about') return showPage('about');
        if (intent === 'gallery') return showPage('gallery');
        if (intent === 'downloads') return showPage('downloads');
        if (intent === 'staff') return showPage('staff');
        if (intent === 'home') return showPage('home');
        if (intent === 'contact') {
            addMessage(tr('complaint'));
            return showContact();
        }

        addMessage(tr('unknown'), 'bot', [
            button('📞 ' + tr('menu_contact'), () => showContact()),
            button('↩ ' + tr('menu_back'), () => mainMenu())
        ]);
    }

    function openPanel() {
        panel.classList.add('is-open');
        panel.setAttribute('aria-hidden', 'false');
        setTimeout(() => input.focus(), 100);
        if (!body.dataset.initialized) {
            body.dataset.initialized = '1';
            // Always begin with language selection.
            chooseLanguage();
        }
    }

    function closePanel() {
        panel.classList.remove('is-open');
        panel.setAttribute('aria-hidden', 'true');
    }

    launcher.addEventListener('click', openPanel);
    closeBtn.addEventListener('click', closePanel);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        answer(text);
    });
})();
