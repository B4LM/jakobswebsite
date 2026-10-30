# LetItRip_ROS website

Documentation site for the LetItRip_ROS meltybrain robot. Plain HTML and CSS, no build step, hosted with GitHub Pages at https://b4lm.github.io/jakobswebsite/.

```
index.html           project overview
wiring.html          wiring map
parts.html           parts list
assets/css/site.css  shared look: colours, fonts, layout
templates/page.html  starting point for new pages
```

## Add a page

1. Copy `templates/page.html` to the top folder, e.g. `parts.html`.
2. Change the title, breadcrumb and content.
3. Link it from the "Documentation" list in `index.html` (turn the `planned` entry into a link and change its tag to `<span class="tag ok">available</span>`). Main pages also go into the header nav of every page.

## Preview locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publish

Push to `main`. GitHub Pages publishes the branch `main`, folder `/ (root)`.
