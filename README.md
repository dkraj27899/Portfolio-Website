# Dikshant Raj Meena — Portfolio

Personal portfolio website for **Dikshant Raj Meena**, IIT Kanpur CS Graduate and Senior Software Engineer at Goalzen Capital Services. Built with a cyberpunk/terminal aesthetic to showcase projects, skills, and experience.

**Live site:** [dikshant.netlify.app](https://dikshant.netlify.app) <!-- update once deployed -->

---

## Sections

| Tab | Description |
|---|---|
| **Home / Intro** | Animated terminal typewriter with career summary |
| **Projects** | Searchable, filterable project cards with case study modals |
| **Timeline** | Chronological history of work with SVG-animated nodes |
| **Stack / Skills** | Tech stack dashboard with proficiency meters |
| **Network / Status** | Live-simulated infrastructure view of project environments |
| **Contact** | Netlify Forms-powered contact form — submissions go to email |

---

## Tech Stack

- **Framework** — React 19 + TypeScript
- **Build tool** — Vite 6
- **Styling** — Tailwind CSS v4
- **Animation** — Motion (Framer Motion)
- **Icons** — Lucide React
- **Forms** — Netlify Forms (no backend required)
- **Deployment** — Netlify

---

## Run Locally

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000
```

To enable the **Download CV** button, place your resume PDF in the public folder:
```bash
cp your-resume.pdf public/resume.pdf
```

---

## Build & Deploy

```bash
# Production build
npm run build
# Output goes to /dist
```

**Netlify** deployment is configured via [`netlify.toml`](netlify.toml):
- Build command: `npm run build`
- Publish directory: `dist`
- SPA redirect rule: all routes → `index.html`

### Deploy steps
1. Push this repo to GitHub
2. Go to [netlify.com](https://netlify.com) → Add new site → Import from Git
3. Select your repo — build settings are auto-detected
4. Click **Deploy**

### Enable email notifications for the contact form
After deploying:
**Netlify Dashboard → Forms → contact → Form notifications → Add notification → Email**
Enter `dkrajmeena27899@gmail.com` to receive all submissions.

---

## Project Structure

```
PORTFOLIO-Site/
├── public/
│   └── resume.pdf          # Place your CV here
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── IntroView.tsx
│   │   ├── ProjectList.tsx
│   │   ├── CaseStudyModal.tsx
│   │   ├── TimelineView.tsx
│   │   ├── StackDashboard.tsx
│   │   ├── NetworkHub.tsx
│   │   ├── ContactConsole.tsx
│   │   ├── Footer.tsx
│   │   └── BottomNavBar.tsx
│   ├── data.ts             # All project, stack, and network data
│   ├── types.ts            # TypeScript interfaces
│   └── App.tsx
├── index.html
├── netlify.toml
└── vite.config.ts
```

---

## Contact

- **Email** — dkrajmeena27899@gmail.com
- **GitHub** — [github.com/dkraj27899](https://github.com/dkraj27899)
- **LinkedIn** — [linkedin.com/in/dikshant-raj-meena-04a41b209](https://www.linkedin.com/in/dikshant-raj-meena-04a41b209/)
