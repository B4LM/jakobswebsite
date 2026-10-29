# Jakob's Workshop

Static website (plain HTML and CSS, no build step), hosted with GitHub Pages.

```
index.html                     home page
assets/css/site.css            shared look: colours, fonts, layout
projects/letitrip/index.html   LetItRip_ROS project page
projects/letitrip/wiring.html  wiring map
templates/page.html            starting point for new pages
jakobswebsite.html, jakob2.html  earlier experiments
```

## Add a page

1. Copy `templates/page.html` to where it belongs, e.g. `projects/letitrip/parts.html`.
2. Change the title, breadcrumb and content.
3. Link it from the "Documentation" list in `projects/letitrip/index.html`
   (turn the `planned` entry into a link and change its tag to `<span class="tag ok">available</span>`).

A new project gets its own folder under `projects/` and an entry on the home page.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish

Push to `main`. In the repository settings under Pages, the source must be "Deploy from a branch", branch `main`, folder `/ (root)`.
The site is then at https://b4lm.github.io/jakobswebsite/.
