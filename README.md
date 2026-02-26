Security Playground

A modern web-based Password Security Helper with an interactive Cipher Playground for exploring classical encryption techniques.

Built as a portfolio project to demonstrate secure design thinking, password analysis logic, and classical cryptography concepts using Vue 3 and Vite.

---

Live Demo

(Deploy link will go here after Vercel deployment)

---

Project Overview

Security Playground is an interactive web application designed to:

- Analyse password strength and patterns
- Provide security insights and improvement suggestions
- Demonstrate classical cipher algorithms
- Visually explain encryption transformations

The goal of this project is educational — helping users understand how classical ciphers work and why they are not suitable for modern password security.

---

Tech Stack

- Vue 3 (Composition API + `<script setup>`)
- Vite
- Tailwind CSS
- JavaScript (ES Modules)
- Git & GitHub

---
## Getting started

npm install
npm run dev

Live Link --> https://security-playground-nine.vercel.app/
Features

### Password Analysis
- Strength scoring
- Pattern detection
- Visual strength bar
- Security recommendations

### Cipher Playground
- Caesar Cipher (custom shift)
- ROT13 (fixed shift 13)
- Vigenère Cipher (custom key)
- Per-character visual breakdown of encryption steps
- Mapping visualisation for alphabet shifts

---

Educational Note

The cipher implementations in this project (Caesar, ROT13, Vigenère) are **classical encryption techniques** and are not secure for real-world password storage or data protection.

Modern security uses hashing algorithms such as:
- bcrypt
- Argon2
- SHA-256 (with salting)

This project is intended for learning and visual demonstration purposes only.

---

License

This project is licensed under the MIT License.

Copyright (c) 2026 Joel Anderson
