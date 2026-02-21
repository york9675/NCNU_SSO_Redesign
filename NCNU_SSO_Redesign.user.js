// ==UserScript==
// @name         NCNU SSO 重新設計
// @name:en      NCNU SSO Redesign
// @namespace    https://github.com/york9675
// @version      1.0.2
// @description  NCNU SSO 全新界面設計，採用淺粉色玻璃風格，改進排版，修正英文翻譯等多項優化。
// @description:en  New UI for NCNU SSO portal with a light pink glassmorphism design, improved typography, and fixed English translations, plus other improvements.
// @author       york9675
// @match        *://sso.ncnu.edu.tw/*
// @icon         https://service.ncnu.edu.tw/ncnuweb/units/share/全校共用/web_material/images/logo/70_70.gif
// @homepageURL  https://github.com/york9675/NCNU_SSO_Redesign
// @supportURL   https://github.com/york9675/NCNU_SSO_Redesign/issues
// @license      MIT
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // Reusable glass mixin value
    const GLASS = `background: rgba(255,255,255,0.4) !important; backdrop-filter: blur(24px) saturate(180%) !important; -webkit-backdrop-filter: blur(24px) saturate(180%) !important; border: 1px solid rgba(255,255,255,0.8) !important; border-radius: 16px !important; box-shadow: 0 10px 40px rgba(0,0,0,0.08) !important;`;

    const lightPinkGlassCSS = `
        :root {
            --glass-bg: rgba(255, 255, 255, 0.4);
            --glass-border: rgba(255, 255, 255, 0.8);
            --text-main: #1f2937;
            --text-muted: #6b7280;
            --accent: #ff4ebd;
            --accent-hover: #d93da0;
            --input-bg: rgba(255, 255, 255, 0.6);
            --input-border: rgba(255, 255, 255, 0.9);
            --shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            --table-hover: rgba(0, 0, 0, 0.03);
            --radius: 16px;
            --pill-bg: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
            --pill-shadow: 0 4px 15px rgba(255, 78, 189, 0.3);
        }

        /* Base */
        body {
            background-color: transparent !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
            color: var(--text-main) !important;
        }
        body::before {
            content: '';
            position: fixed;
            inset: 0;
            background:
                radial-gradient(circle at 10% 10%, rgba(255, 78, 189, 0.05), transparent 40%),
                radial-gradient(circle at 90% 90%, rgba(120, 0, 255, 0.03), transparent 40%);
            z-index: -2;
            pointer-events: none;
        }

        /* Strip Bootstrap defaults */
        .bg-light, .bg-white, .container, main, .wrap {
            background-color: transparent !important;
            box-shadow: none !important;
            border: none !important;
        }

        /* Glass Elements */
        form, .card, table, .login-panel, .panel, .jumbotron, .loginDiv, .profile-card {
            background: var(--glass-bg) !important;
            backdrop-filter: blur(24px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
            border: 1px solid var(--glass-border) !important;
            border-radius: var(--radius) !important;
            box-shadow: var(--shadow) !important;
            color: var(--text-main) !important;
        }

        .card-header, .card-footer { background: transparent !important; border: none !important; }
        .card-header { border-bottom: 1px solid rgba(0,0,0,0.06) !important; }

        /* Dropdowns */
        .dropdown-menu {
            background: var(--glass-bg) !important;
            backdrop-filter: blur(20px) saturate(180%) !important;
            -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
            border: 1px solid var(--glass-border) !important;
            border-radius: 12px !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1) !important;
            padding: 0.5rem !important;
            margin-top: 0.5rem !important;
            animation: dropdownSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
            transform-origin: top center !important;
        }
        @keyframes dropdownSlideIn {
            0% { opacity: 0; transform: translateY(-8px) scale(0.96); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .dropdown-toggle:focus, .dropdown-toggle:active, .dropdown-toggle.show,
        .nav-link:focus, .nav-link:active {
            outline: none !important; box-shadow: none !important; border-color: transparent !important;
        }
        .dropdown-item {
            color: var(--text-main) !important; border-radius: 8px !important;
            transition: all 0.2s ease !important; padding: 0.5rem 1rem !important; font-weight: 500 !important;
        }
        .dropdown-item:hover, .dropdown-item:focus {
            background: rgba(255, 78, 189, 0.1) !important; color: var(--accent) !important; transform: translateX(2px) !important;
        }
        .dropdown-menu.dropdown-closing {
            animation: dropdownSlideOut 0.2s cubic-bezier(0.4, 0, 1, 1) forwards !important;
        }
        @keyframes dropdownSlideOut {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-6px) scale(0.96); }
        }

        /* Typography */
        h1, h2, h3, h4, h5, .h1, .h2, .h3, .text-dark { color: var(--text-main) !important; font-weight: 700 !important; }
        p, span, div { color: var(--text-main); }
        a { color: var(--accent) !important; text-decoration: none !important; font-weight: 600 !important; transition: all 0.2s ease !important; }
        a:hover { color: var(--accent-hover) !important; text-shadow: 0 0 12px rgba(255, 78, 189, 0.3) !important; }

        /* Inputs */
        .card-body, .login-body { padding: 2.5rem !important; }
        label { color: var(--text-main) !important; font-weight: 600 !important; margin-bottom: 0.5rem !important; display: inline-block !important; }

        input.form-control, input[type="text"], input[type="password"], input[type="email"], input[type="number"], select {
            background: var(--input-bg) !important; border: 2px solid var(--input-border) !important;
            color: var(--text-main) !important; border-radius: 12px !important;
            padding: 0.85rem 1rem !important; font-size: 1rem !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.02) !important;
        }
        input:focus, select:focus {
            background: rgba(255, 255, 255, 0.9) !important; border-color: var(--accent) !important;
            box-shadow: 0 0 0 4px rgba(255, 78, 189, 0.2) !important; outline: none !important;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type="number"] { -moz-appearance: textfield; }
        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px rgba(255,255,255,0.8) inset !important;
            -webkit-text-fill-color: var(--text-main) !important;
            transition: background-color 5000s ease-in-out 0s; border: 2px solid var(--accent) !important;
        }

        /* Buttons */
        .btn, .btn-primary, button[type="submit"], button {
            background: var(--pill-bg) !important; border: none !important; color: #fff !important;
            border-radius: 50px !important; padding: 0.5rem 1.4rem !important;
            transition: all 0.3s ease !important; font-weight: 600 !important;
            font-size: 0.9rem !important; letter-spacing: 0.3px !important;
            box-shadow: var(--pill-shadow) !important;
        }
        .btn:hover, button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 20px rgba(255, 78, 189, 0.4) !important; filter: brightness(1.1) !important;
        }
        .btn-link, a.btn-link {
            background: transparent !important; color: var(--accent) !important;
            box-shadow: none !important; border: 2px solid var(--accent) !important; border-radius: 50px !important;
        }
        .btn-link:hover, a.btn-link:hover {
            background: rgba(255, 78, 189, 0.08) !important; color: var(--accent-hover) !important;
            box-shadow: none !important; text-shadow: none !important;
        }

        /* Captcha */
        #reload { padding: 0.4rem 0.6rem !important; border-radius: 10px !important; font-size: 1.1rem !important; }
        .loginDiv form .row.mb-3 .captcha, .loginDiv form .row.mb-3 #reload { display: inline-block !important; vertical-align: middle !important; }
        .loginDiv form #captcha { margin-top: 0.6rem !important; display: block !important; width: 100% !important; }

        /* Tables */
        table { border-collapse: separate !important; border-spacing: 0 !important; overflow: hidden !important; }
        table.border-black, table.border { border-color: var(--glass-border) !important; --bs-border-color: var(--glass-border) !important; }
        table td, table th {
            background: transparent !important; border: none !important;
            border-bottom: 1px solid rgba(0,0,0,0.05) !important;
            padding: 12px 16px !important; transition: background 0.2s ease !important; vertical-align: middle !important;
        }
        table tr:last-child td { border-bottom: none !important; }
        table tr:hover td { background: var(--table-hover) !important; }
        table td a {
            display: inline-block !important; background: var(--pill-bg) !important; color: #fff !important;
            padding: 0.4rem 1.2rem !important; border-radius: 20px !important;
            font-size: 0.85rem !important; font-weight: 600 !important;
            box-shadow: 0 3px 10px rgba(255, 78, 189, 0.25) !important;
        }
        table td a:hover {
            transform: translateY(-1px) !important;
            box-shadow: 0 5px 15px rgba(255, 78, 189, 0.35) !important; color: #fff !important;
        }

        /* Layout */
        .alert { background: rgba(255, 78, 189, 0.1) !important; backdrop-filter: blur(10px) !important; border: 1px solid rgba(255, 78, 189, 0.3) !important; color: var(--accent-hover) !important; border-radius: 12px !important; font-weight: 500 !important; }
        .loginDiv { padding: 2.5rem 2rem 2rem !important; margin-top: 1rem !important; }
        .loginDiv form { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; background: transparent !important; border: none !important; box-shadow: none !important; }
        .loginDiv .img-fluid { max-width: 65% !important; height: auto !important; display: block; margin: 0 auto; }
        .navbar-toggler { background: var(--glass-bg) !important; backdrop-filter: blur(16px) saturate(180%) !important; border: 1px solid var(--glass-border) !important; border-radius: 12px !important; }
        .navbar-toggler-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255,78,189,0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important; }

        /* Card / Password Pages */
        .container .card, .container > .row > div > div, .container form {
            background: var(--glass-bg) !important; backdrop-filter: blur(24px) saturate(180%) !important;
            border: 1px solid var(--glass-border) !important; border-radius: var(--radius) !important; box-shadow: var(--shadow) !important;
        }
        .container > .row > div > div form, .card form { background: transparent !important; backdrop-filter: none !important; border: none !important; box-shadow: none !important; }
        .card hr { display: none !important; }
        .card-body { border: none !important; background: transparent !important; }

        /* Profile Card */
        .profile-card { max-width: 520px; margin: 0 auto; padding: 2rem 2.5rem; animation: profileFadeIn 0.4s ease; }
        @keyframes profileFadeIn { 0% { opacity: 0; transform: translateY(12px); } 100% { opacity: 1; transform: translateY(0); } }
        .profile-title {
            text-align: center; font-size: 1.6rem !important; font-weight: 700 !important;
            color: var(--text-main) !important; margin-bottom: 1.5rem !important;
            padding-bottom: 1rem; border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .profile-row {
            display: flex; align-items: center; justify-content: space-between;
            padding: 0.85rem 0; border-bottom: 1px solid rgba(0,0,0,0.04);
            gap: 0.5rem 1rem; flex-wrap: wrap;
        }
        .profile-row:last-child { border-bottom: none; }
        .profile-label { font-weight: 600; color: var(--text-muted); font-size: 0.9rem; white-space: nowrap; flex-shrink: 0; }
        .profile-value {
            color: var(--text-main); font-weight: 500; font-size: 0.95rem; text-align: right;
            display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap;
            justify-content: flex-end; min-width: 0; word-break: break-all;
        }
        .profile-value a {
            display: inline-block !important; background: var(--pill-bg) !important; color: #fff !important;
            padding: 0.35rem 1.1rem !important; border-radius: 50px !important;
            font-size: 0.8rem !important; font-weight: 600 !important;
            box-shadow: 0 3px 10px rgba(255, 78, 189, 0.25) !important;
            white-space: nowrap; word-break: normal;
        }
        .profile-value a:hover {
            transform: translateY(-1px) !important;
            box-shadow: 0 5px 15px rgba(255, 78, 189, 0.35) !important; color: #fff !important;
        }

        /* Footer & Greetings */
        .sso-redesign-footer { text-align: center; padding: 1.5rem 1rem; margin-top: 2rem; color: var(--text-muted); font-size: 0.8rem; letter-spacing: 0.2px; }
        .sso-greeting { font-size: 1.8rem !important; font-weight: 700 !important; color: var(--text-main) !important; margin-bottom: 0.5rem !important; }
        .sso-greeting-sub { font-size: 0.95rem; color: var(--text-muted); font-weight: 400; margin-bottom: 1.5rem; }
    `;

    // Inject Theme & Meta
    function setupTheme() {
        document.head.appendChild(Object.assign(document.createElement('style'), { textContent: lightPinkGlassCSS }));
        if (!document.querySelector('meta[name="theme-color"]')) {
            const m = Object.assign(document.createElement('meta'), { name: 'theme-color', content: '#fdf2f8' });
            document.head.appendChild(m);
        }
    }

    // Translations Dictionary
    const translations = {
        'uid': 'Account',
        'displayName': 'Display Name',
        'mail': 'Email',
        'backupemail': 'Backup Email',
        'old_password': 'Current Password',
        'new_password': 'New Password',
        'new_password_confirmation': 'Confirm New Password',
        'submit': 'Submit',
        'password': 'Password',
        'Webmail電子郵件系統': 'Webmail Email System',
        '圖書館資源探索服務': 'Library Resource Discovery Service',
        'SSL-VPN 連線服務': 'SSL-VPN Connection Service',
        '新版Moodle課程資訊網': 'New Moodle Course Information Network',
        '使用者資料': 'User Profile',
        '使用者帳號': 'Account',
        '名稱': 'Name',
        '電子信箱': 'Email',
        '備援信箱': 'Backup Email'
    };

    // Translations Fix
    function fixTranslations(isEnglish) {
        if (!isEnglish) return;

        // Group queries to limit DOM passes
        const textElements = document.querySelectorAll('label, .card-header, h1, h2, h3, h4, h5, h6, strong, button, .btn, th, td, a');

        textElements.forEach(el => {
            if (el.dataset.translated || el.children.length > 0) return; // Skip already translated or nested elements
            const txt = el.textContent.trim();
            if (translations[txt]) {
                el.textContent = translations[txt];
                el.dataset.translated = '1';
            }
        });

        // Specific fix for placeholders
        document.querySelectorAll('input[placeholder]').forEach(input => {
            const ph = input.getAttribute('placeholder');
            if (translations[ph]) {
                input.setAttribute('placeholder', translations[ph]);
            }
        });

        // Specific fix for language switcher nav link
        const langSwitcher = document.getElementById('langswitcher');
        if (langSwitcher && langSwitcher.textContent.trim() === '切換語言') {
            langSwitcher.childNodes.forEach(node => {
                if (node.nodeType === 3 && node.textContent.trim() === '切換語言') {
                    node.textContent = ' Switch Language\n            ';
                }
            });
        }
    }

    // UI Enhancements (Icons, Captcha & Profile)
    function enhanceUI(isEnglish) {
        // Update Captcha to be strictly numeric
        const captchaInput = document.getElementById('captcha');
        if (captchaInput) {
            captchaInput.type = 'number';
            captchaInput.inputMode = 'numeric';
        }

        // Restructure captcha elements
        const captchaSpan = document.querySelector('.captcha');
        const reloadBtn = document.getElementById('reload');
        if (captchaInput && captchaSpan && reloadBtn) {
            const wrapper = captchaSpan.parentElement;
            if (wrapper && !wrapper.dataset.rearranged) {
                wrapper.dataset.rearranged = '1';
                wrapper.innerHTML = '';
                const topRow = document.createElement('div');
                topRow.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:8px;';
                topRow.appendChild(reloadBtn);
                topRow.appendChild(captchaSpan);
                wrapper.appendChild(topRow);
                wrapper.appendChild(captchaInput);
            }
        }

        // Add icons economically 
        const iconMappings = {
            '訪問網址': '↗ 訪問網址',
            'Visit URL': '↗ Visit URL',

            '登入': '🔑 登入',
            'Login': '🔑 Login',

            '送出': '✅ 送出',
            'Submit': '✅ Submit',

            '修改': '✏️ 修改',
            'Change': '✏️ Change',

            'ZH-TW': '🇹🇼 ZH-TW',
            '繁體中文': '🇹🇼 繁體中文',

            'EN': '🌐 EN',
            '英文': '🌐 英文',

            '個人資料': '👤 個人資料',
            'Profile': '👤 Profile',

            '修改密碼': '🔒 修改密碼',
            'Change password': '🔒 Change password',

            '新世代校務系統': '🎓 新世代校務系統',
            'School Information System': '🎓 School Information System',

            'Webmail電子郵件系統': '✉️ Webmail電子郵件系統',
            'Webmail Email System': '✉️ Webmail Email System',

            '圖書館資源探索服務': '📚 圖書館資源探索服務',
            'Library Resource Discovery Service': '📚 Library Resource Discovery Service',

            '人事差勤管理系統': '📋 人事差勤管理系統',
            'Personnel and Attendance Management System': '📋 Personnel and Attendance Management System',

            '公文及檔案整合系統': '📁 公文及檔案整合系統',
            'Official document and file integration system': '📁 Official document and file integration system',

            'SSL-VPN 連線服務': '🔐 SSL-VPN 連線服務',
            'SSL-VPN Connection Service': '🔐 SSL-VPN Connection Service',

            '新版Moodle課程資訊網': '📖 新版Moodle課程資訊網',
            'New Moodle Course Information Network': '📖 New Moodle Course Information Network'
        };

        document.querySelectorAll('a, button, .dropdown-item, td').forEach(el => {
            if (el.dataset.iconed || el.children.length > 0) return;
            const txt = el.textContent.trim();
            if (iconMappings[txt]) {
                el.innerHTML = iconMappings[txt];
                el.dataset.iconed = '1';
            }
        });

        const forgotLink = document.querySelector('a.btn-link[href*="forgetpassword"], a.btn-link[href*="reset"]');
        if (forgotLink && !forgotLink.dataset.iconed) {
            forgotLink.dataset.iconed = '1';
            forgotLink.innerHTML = '❓ ' + forgotLink.textContent.trim();
        }

        const logoutLink = document.querySelector('a.nav-link[href*="logout"]');
        if (logoutLink && !logoutLink.dataset.iconed) {
            logoutLink.dataset.iconed = '1';
            logoutLink.innerHTML = '🚪 ' + logoutLink.textContent.trim();
        }

        // Profile Page Redesign
        if (window.location.pathname.includes('/profile')) {
            // Find the profile table (look for a table with an h1 inside it)
            const profileH1 = document.querySelector('table h1');
            const table = profileH1 ? profileH1.closest('table') : null;
            if (table && !table.dataset.redesigned) {
                table.dataset.redesigned = '1';

                const rows = table.querySelectorAll('tbody tr');
                const profileCard = document.createElement('div');
                profileCard.className = 'profile-card';

                // Profile label icons
                const labelIcons = {
                    '使用者帳號': '🆔', 'Account': '🆔', 'uid': '🆔',
                    '名稱': '📛', 'Name': '📛', 'Display Name': '📛', 'displayName': '📛',
                    '電子信箱': '✉️', 'Email': '✉️', 'mail': '✉️',
                    '備援信箱': '📧', 'Backup Email': '📧', 'backupemail': '📧'
                };

                // Title
                const title = document.createElement('h1');
                title.className = 'profile-title';
                title.textContent = isEnglish ? '👤 User Profile' : '👤 使用者資料';
                profileCard.appendChild(title);

                // Parse each data row (skip the first title row)
                for (let i = 1; i < rows.length; i++) {
                    const cells = rows[i].querySelectorAll('td');
                    if (cells.length < 2) continue;

                    const row = document.createElement('div');
                    row.className = 'profile-row';

                    const label = document.createElement('span');
                    label.className = 'profile-label';
                    // Get label text without the button text
                    let labelText = '';
                    let changeLink = null;
                    cells[0].childNodes.forEach(node => {
                        if (node.nodeType === 3) {
                            labelText += node.textContent.trim();
                        } else if (node.tagName === 'A') {
                            changeLink = node.cloneNode(true);
                        }
                    });
                    // Translate label if in English
                    if (isEnglish && translations[labelText]) {
                        labelText = translations[labelText];
                    }
                    const icon = labelIcons[labelText] || '';
                    label.textContent = icon ? `${icon} ${labelText}` : labelText;

                    const value = document.createElement('span');
                    value.className = 'profile-value';
                    const valueText = document.createElement('span');
                    valueText.textContent = cells[1].textContent.trim();
                    value.appendChild(valueText);

                    // Move the change button to the value side
                    if (changeLink) {
                        changeLink.dataset.iconed = '1';
                        changeLink.innerHTML = isEnglish ? '✏️ Change' : '✏️ 修改';
                        value.appendChild(changeLink);
                    }

                    row.appendChild(label);
                    row.appendChild(value);
                    profileCard.appendChild(row);
                }

                // Replace the table with the new card
                table.parentNode.replaceChild(profileCard, table);
            }
        }
    }

    // Greeting & Footer
    function injectGreetingAndFooter(isEnglish) {
        const userDropdown = document.getElementById('navbarDropdown');
        const userName = userDropdown ? userDropdown.textContent.trim() : null;
        const hour = new Date().getHours();

        let greeting, subtext;

        if (isEnglish) {
            if (hour >= 5 && hour < 12) {
                greeting = '☀️ Good Morning';
            } else if (hour >= 12 && hour < 17) {
                greeting = '🌤 Good Afternoon';
            } else {
                greeting = '🌙 Good Evening';
            }
            subtext = 'Welcome to NCNU Single Sign-On Portal';
        } else {
            if (hour >= 5 && hour < 12) {
                greeting = '☀️ 早安';
            } else if (hour >= 12 && hour < 17) {
                greeting = '🌤 午安';
            } else {
                greeting = '🌙 晚安';
            }
            subtext = '歡迎使用國立暨南國際大學單一登入平台';
        }

        const h1 = document.querySelector('h1');
        if (h1 && (h1.textContent.trim() === '首頁' || h1.textContent.trim() === 'Home') && userName) {
            h1.className = 'sso-greeting';

            if (isEnglish) {
                h1.textContent = `${greeting}, ${userName}!`;
            } else {
                h1.textContent = `${greeting}，${userName}！`;
            }

            const sub = document.createElement('p');
            sub.className = 'sso-greeting-sub';
            sub.textContent = subtext;
            h1.parentNode.insertBefore(sub, h1.nextSibling);
        }

        const main = document.querySelector('main');
        if (main && !document.querySelector('.sso-redesign-footer')) {
            const footer = document.createElement('div');
            footer.className = 'sso-redesign-footer';

            if (isEnglish) {
                footer.innerHTML = `✨ UI Redesigned by <a href="https://github.com/york9675" target="_blank">york9675</a><br>This redesign is personal and NOT affiliated with NCNU`
            } else {
                footer.innerHTML = `✨ 介面重新設計：<a href="https://github.com/york9675" target="_blank">york9675</a><br>此重新設計為個人作品，且與暨南大學官方無任何關聯`
            }

            main.appendChild(footer);
        }
    }

    // Dropdown close animation
    function setupDropdownCloseAnimation() {
        document.querySelectorAll('.dropdown').forEach(dd => {
            if (dd.dataset.closeAnim) return;
            dd.dataset.closeAnim = '1';
            dd.addEventListener('hide.bs.dropdown', function (e) {
                const menu = this.querySelector('.dropdown-menu');
                if (!menu) return;
                e.preventDefault();
                menu.classList.add('dropdown-closing');
                menu.addEventListener('animationend', () => {
                    menu.classList.remove('dropdown-closing', 'show');
                    const toggle = dd.querySelector('[data-bs-toggle="dropdown"]');
                    if (toggle) { toggle.classList.remove('show'); toggle.setAttribute('aria-expanded', 'false'); }
                }, { once: true });
            });
        });
    }

    // Main Initialization
    function init() {
        setupTheme();

        // Compute language mode once per load
        const isEnglish = document.documentElement.lang === 'en'
            || document.querySelector('a.nav-link[href*="logout"]')?.textContent.trim() === 'Logout'
            || document.querySelector('h1')?.textContent.trim() === 'Home';

        fixTranslations(isEnglish);
        enhanceUI(isEnglish);
        injectGreetingAndFooter(isEnglish);
        setupDropdownCloseAnimation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
