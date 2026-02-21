![header](https://capsule-render.vercel.app/api?type=waving&height=300&color=gradient&text=NCNU%20SSO%20Redesign&textBg=false&animation=twinkling&desc=A%20modern%20UI%20for%20NCNU%20SSO.&descAlign=50&descAlignY=70)

![Home](./assets/After/Home.png)

<p align="center">
  <a href="https://github.com/york9675/NCNU_SSO_Redesign/releases" target="_blank">
    <img alt="Version" src="https://img.shields.io/github/release/york9675/NCNU_SSO_Redesign?style=for-the-badge" />
  </a>
  <a href="#License" target="_blank">
    <img alt="License" src="https://img.shields.io/github/license/york9675/NCNU_SSO_Redesign?logo=github&style=for-the-badge" />
  </a>
  <a>
    <img src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
  </a>
  <a>
    <img src="https://img.shields.io/badge/-CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS"/>
  </a>
</p>

<p align="center"> 
  🌐
  <a href="README.md">繁體中文</a> 
  ·
  <b>English</B> 
</p>

---

## Introduction

**NCNU SSO Redesign** is a brand new UI userscript specifically built for the National Chi Nan University (NCNU) Single Sign-On (SSO) portal.

The original system has many visual and user experience pain points, including an outdated interface, inconvenient captcha input on mobile devices, and broken English translations that are extremely unfriendly to international students. This project adopts a modern light pink Glassmorphism design and deeply refactors the DOM structure and translation dictionary using JavaScript, comprehensively upgrading the daily login experience for NCNU students.

## Installation Guide

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension in your browser (supports Chrome, Edge, Safari, Firefox, etc.). (Other UserScript extensions like [Violentmonkey](https://violentmonkey.github.io/) are also supported.)
2. Go to the **[👉 Greasy Fork Script Page 👈](https://greasyfork.org/zh-TW/scripts/566962-ncnu-sso-重新設計)** and click the green "Install this script" button.
3. Open/Refresh the [NCNU SSO Login Page](https://sso.ncnu.edu.tw/) and enjoy the brand new interface!

## Security Disclaimer

> [!WARNING]\
> Since this involves the login page for all university students and faculty, please note the following statement:
> 
> This project is a completely open-source front-end styling (CSS) and text replacement (DOM Manipulation) tool. **The script will NEVER intercept, collect, record, or transmit any passwords or private data.** All code runs locally in your browser, so please use it with peace of mind. You can inspect the source code at any time.

---

## Core Features

<details>
  <summary><b>✨ 1. Modern Glassmorphism UI & Dynamic Greetings</b></summary>
  
  Say goodbye to rigid white backgrounds! Featuring a high-quality semi-transparent blur effect with smooth animation transitions, it blends perfectly with the original cherry blossom background. It also includes dynamic greetings that say hello based on the time of day.

  ![Home After](./assets/After/Home.png)
</details>

<details>
  <summary><b>🌐 2. Deep Translation Fixes (International Student Friendly)</b></summary>
  
  The original system still displays a lot of Chinese text in English mode, and even directly exposes raw keys like `uid` and `displayName` on the profile page. This script has a complete built-in translation dictionary to automatically replace all broken text and placeholders.

  **BEFORE:**
  ![Translation Before 1](./assets/Before/Home.png)
  ![Translation Before 2](./assets/Before/Change.png)
  ![Translation Before 3](./assets/Before/Profile.png)
</details>

<details>
  <summary><b>📱 3. Captcha & Mobile UX Optimization</b></summary>
  
  Refactored the crowded captcha input area, moving the image and refresh button to the top. More importantly, tapping the captcha box on a mobile device now **directly summons the pure numeric keypad**, drastically improving the mobile login efficiency! The interface is also fully equipped with intuitive Emoji tags.

  ![Login Mobile](./assets/After/Login_Mobile.jpeg)
</details>

<details>
  <summary><b>👤 4. Profile Page Refactoring</b></summary>
  
  No more rigid, ugly HTML Tables. The script automatically extracts data from the original table in the background and reconstructs it into a beautifully laid out profile card with exclusive icons.

  ![Profile After](./assets/After/Profile.png)
</details>

**✨ 5. Others**

## Screenshots

<details>
  <summary><b>Click to expand and view more screenshots</b></summary>

  ![Login After](./assets/After/Login.png)
  ![Home After](./assets/After/Home.png)
  ![Change After](./assets/After/Change.png)
  ![Profile After](./assets/After/Profile.png)
</details>

## Support & Sponsorship

If you feel this project makes your campus life more beautiful and smoother, feel free to give this project a ⭐️!

This is an open-source project I independently develop and maintain in my spare time. If this tool helps you, you are welcome to buy me a coffee using the button below. Your support is my biggest motivation to keep maintaining it!

<a href="https://www.buymeacoffee.com/york0524"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="york0524" /></a><br><br>

(I also accept Line Pay Money and bank transfers. Feel free to email me!)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=york9675/NCNU_SSO_Redesign&type=Date)](https://star-history.com/#york9675/NCNU_SSO_Redesign&Date)

***

© 2026 York Development

Made with :heart: in Taiwan.