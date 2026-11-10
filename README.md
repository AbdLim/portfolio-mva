# Abdulalim Ladan - Portfolio and Academic Planner

A personal developer portfolio combined with a working academic task planner. Built for **COS 106 - Introduction to Web Technologies** at MIVA Open University.

This is a **static website**: plain HTML5, CSS3 and vanilla JavaScript (ES6+). There is no framework, build step or backend. The contact form performs **front-end validation only** and does not send messages anywhere.

## Features

- Five responsive pages with shared navigation, active-page indication and a mobile menu
- Dark design system built on CSS custom properties (colours, type, spacing, radii, shadows)
- **Academic Planner**: add, complete, reopen and delete tasks; All / Pending / Completed filters; live statistics; empty states; persistence with `localStorage`
- **Contact form**: required fields, email format check, digits-only phone check, field-specific messages
- Semantic HTML, an HTML table, lists, images, forms, hyperlinks and an HTML5 `<video>` element
- Flexbox and Grid layouts, transitions, and `prefers-reduced-motion` support

## Technologies

HTML5, CSS3, JavaScript (ES6+), Google Fonts (Inter), `localStorage`. Icons are inline SVG.

## Folder structure

```
portfolio/
├── index.html        Home
├── about.html        About (education table, timeline, video)
├── projects.html     Projects
├── planner.html      Academic Planner
├── contact.html      Contact
├── css/style.css     Shared stylesheet
├── js/
│   ├── main.js       Mobile menu, footer year, video fallback (all pages)
│   ├── planner.js    Task planner (planner.html)
│   └── contact.js    Form validation (contact.html)
├── assets/
│   ├── images/       Portrait and project placeholders (SVG)
│   ├── icons/        Favicon
│   └── media/        Put intro.mp4 here
└── README.md
```

## Run locally

Open `index.html` in a browser. Or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Notes

- Planner tasks are stored in this browser only (`localStorage` key `academicPlannerTasks`). Clearing site data removes them.
- User-entered text is rendered with `textContent`, never `innerHTML`.
