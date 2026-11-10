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

## Update content

- **Profile photograph**: save your photo in `assets/images/` (e.g. `portrait.jpg`) and change the `src` of the portrait `<img>` in `index.html` from `portrait-placeholder.svg`. Update the `alt` text to describe the photo.
- **Project screenshots**: add images to `assets/images/` and change the `src` on each project's `<img>` in `projects.html`. Keep the `alt` text meaningful.
- **Personal information**: edit the text in the HTML files directly. Search for `PLACEHOLDER` to find the email and LinkedIn spots (`contact.html`, `index.html`) and `EMAIL_PLACEHOLDER` in `js/contact.js`.
- **GitHub repository links**: add a button inside a project's `.project-links` div only once you have the real URL.
- **Video**: put an MP4 file named `intro.mp4` in `assets/media/`. To use another name or format, edit the `<source>` in `about.html`. Until a file exists, the page shows a fallback message.

## Deploy with GitHub Pages

1. Create a GitHub repository and push this folder to it (`index.html` must be at the repository root).
2. Go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute your site is live at `https://<username>.github.io/<repository>/`.

For a custom domain such as `aaladan.dev`, add it under Settings > Pages and configure DNS as GitHub describes.

## Notes

- Planner tasks are stored in this browser only (`localStorage` key `academicPlannerTasks`). Clearing site data removes them.
- User-entered text is rendered with `textContent`, never `innerHTML`.
