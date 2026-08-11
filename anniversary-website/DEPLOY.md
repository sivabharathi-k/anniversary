# Deploy Guide — Anniversary Website

Pure static site (HTML + CSS + JS). No build step. No server needed.
Works on any free static host.

---

## OPTION 1 — Netlify (Recommended — Free, fastest)

1. Go to https://app.netlify.com
2. Sign up / log in (free)
3. Click **"Add new site" → "Deploy manually"**
4. Drag and drop the entire `anniversary-website` folder onto the page
5. Done — Netlify gives you a URL like `https://random-name.netlify.app`

**To get a custom name:**
- In Netlify dashboard → Site configuration → Change site name
- Example: `https://happy-anniversary.netlify.app`

---

## OPTION 2 — GitHub Pages (Free, permanent)

### Step A — Push to GitHub
1. Install Git: https://git-scm.com
2. Create a free account at https://github.com
3. Create a new **public** repository (e.g. `anniversary-website`)
4. Open a terminal in the `anniversary-website` folder and run:

```
git init
git add .
git commit -m "Anniversary website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/anniversary-website.git
git push -u origin main
```

### Step B — Enable Pages
1. Go to your repository on GitHub
2. Click **Settings → Pages**
3. Under "Source" select **Deploy from a branch**
4. Branch: `main` / Folder: `/ (root)`
5. Click **Save**
6. Wait ~1 minute → your site is live at:
   `https://YOUR_USERNAME.github.io/anniversary-website/`

---

## OPTION 3 — Vercel (Free, instant)

1. Go to https://vercel.com → Sign up
2. Click **"Add New Project"**
3. Import from GitHub (connect your repo from Option 2 above)
   OR drag-drop the folder if using the CLI
4. No build settings needed — leave everything default
5. Click **Deploy**
6. Live at `https://anniversary-website.vercel.app`

---

## OPTION 4 — Tiiny.host (Simplest — no account needed)

1. Go to https://tiiny.host
2. Zip the entire `anniversary-website` folder
3. Upload the zip file
4. Get a shareable link instantly

---

## FILE STRUCTURE (what gets deployed)

```
anniversary-website/
├── index.html          ← Page 1: Love Letter
├── memories.html       ← Page 2: Scrapbook
├── music.html          ← Page 3: Music Gift
├── css/
│   ├── style.css
│   ├── memories.css
│   └── music.css
├── js/
│   ├── script.js
│   ├── memories.js
│   └── music.js
└── assets/
    └── images/
        ├── image11.jpeg   ← Scrapbook photo 1
        ├── image22.jpeg   ← Scrapbook photo 2
        ├── image33.jpeg   ← Scrapbook photo 3
        ├── image44.jpeg   ← Scrapbook photo 4
        ├── image55.jpeg   ← Scrapbook photo 5
        ├── image66.jpeg   ← Scrapbook photo 6
        └── image77.jpeg   ← Music gift page photo
```

**All image paths are relative — they work on any host with no changes.**

---

## BEFORE DEPLOYING — Checklist

- [ ] All 6 scrapbook photos placed in `assets/images/`
- [ ] Gift photo placed as `assets/images/image77.jpeg`
- [ ] Test locally by opening `index.html` in a browser
- [ ] Confirm all 3 pages navigate correctly
- [ ] Confirm Spotify link opens correctly from the music page
