# windsurf-project: #buildinginpublic Astro Spectre Blog

## Overview
A minimal, visually appealing, Markdown-first blog built with Astro (Spectre theme). No CMS, no backend—just write Markdown and push to GitHub. Designed for sharing open-source and startup progress, devlogs, and honest reflections.

---

## 🚀 Quick Start

1. **Clone the repo:**
   ```sh
   git clone https://github.com/paradiselabs-ai/windsurf-project.git
   cd windsurf-project
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the dev server:**
   ```sh
   npm run dev
   ```
   Visit http://localhost:4321

---

## 📝 Content Structure
- `content/blog/` – Company/devlog posts
- `content/articles/` – AI/informative/opinion articles
- `content/about.md` – About page
- `content/index.md` – Home page

**To add a post:**
- Create a new `.md` file in `content/blog/` or `content/articles/`
- Use frontmatter (`---` at the top) for title, date, summary, tags
- Push to GitHub: site auto-rebuilds on Vercel

---

## 🌐 Deployment
- Connect this repo to [Vercel](https://vercel.com/)
- Every push to `main` auto-deploys
- Custom domain: configure in Vercel dashboard

---

## 🤖 No CMS Needed
- All content is Markdown, versioned in Git
- No admin panel, no database, no backend
- Update from any device by editing Markdown and pushing to GitHub

---

## (Optional) CollectedNotes API Integration
- You can extend the site to pull posts from [CollectedNotes](https://collectednotes.com/) for mobile publishing
- See `docs/PLAN.md` for integration ideas

---

## 🛠️ Customization
- Built with [Astro](https://astro.build/) and the [Spectre theme](https://astro.build/themes/details/spectre/)
- Easy to customize styles, navigation, and content structure

---

## 🙌 Credits
- [Spectre Theme by Louis Escher](https://astro.build/themes/details/spectre/)
- [Astro](https://astro.build/)

---

## 💡 #buildinginpublic
Share your journey. Ship early. Iterate in the open.

---

### License
MIT