# RevOpsDev Child Theme

Hello Elementor child theme for revopsdev.com.

## Structure

```
revopsdev-child/
├── style.css              Theme header, fonts, all brand CSS scoped under .rev-widget
├── functions.php          Enqueues, schema/meta hooks (on wp_head, gated by is_front_page)
├── assets/
│   └── main.js            Scrolling-words scrub, IntersectionObserver reveals, mobile menu
├── inc/
│   ├── schema.php         JSON-LD @graph output (Organization, Person, WebSite, Service)
│   └── meta.php           Meta tags, Open Graph, Twitter Card, canonical, favicons
└── sections/              Markup fragments included by page templates
    ├── nav.html           Skip link + fixed nav
    ├── mobile-menu.html   Full-screen overlay menu
    ├── hero.html          Opens <main>, hero section
    └── scroll-sequences.html   Three scroll sections, closes </main>
```

## Brand system primitives

Defined as CSS custom properties on `.rev-widget`:

- Colours: `--rev-bg`, `--rev-bg-2`, `--rev-text`, `--rev-muted`, `--rev-accent`, `--rev-accent-2`, `--rev-grad`
- Layout: `--rev-max` (1200px), `--rev-r` (16px border radius)
- Utility classes: `.r-wrap`, `.r-label`, `.r-heading`, `.r-sub`, `.r-rev` (reveal), `.r-d1-d4` (stagger), `.r-btn`, `.r-btn-fill`, `.r-btn-ghost`

All selectors are scoped under `.rev-widget` so the theme can drop into any WordPress install without colliding with parent theme styles.

## Local development

Recommended: [Local by Flywheel](https://localwp.com/) for a one-click WordPress instance.

1. Create a new site in Local (Hello Elementor as parent, this repo cloned into `wp-content/themes/revopsdev-child/`)
2. Activate "RevOpsDev Child" theme in WP admin
3. Edit theme files in VS Code, browser refresh to preview
4. Commit when satisfied, push to deploy

## Deployment

Hostinger Business plan has Git auto-deployment in hPanel. Configure:

- Repository: `git@github.com:chsharoze/revopsdev-child.git` (private)
- Branch: `main`
- Deploy path: `/public_html/wp-content/themes/revopsdev-child/`
- Auto-deploy: on push to `main`

Push to `main`, Hostinger pulls, file changes are live within ~30 seconds.

**Deploy pipeline status:** GitHub webhook → Hostinger Git → `wp-content/themes/revopsdev-child/`. Verified 2026-05-13.

## Schema and meta

Currently output via `inc/schema.php` and `inc/meta.php`, hooked into `wp_head` only on `is_front_page()`. If Yoast SEO is installed, comment out the two `add_action` calls in `functions.php` to prevent duplicate output.

## Page templates

- Homepage uses theme template via `page-home.php` (planned), not Elementor content
- Other pages may use Elementor where its UI is useful (blog, case studies)
- Section files in `sections/` are included via `get_template_part()` from page templates
