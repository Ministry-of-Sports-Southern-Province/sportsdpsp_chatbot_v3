# SportsDPSP Assistant — V3

A multilingual website assistant for the Department of Sports – Southern Province. It helps visitors navigate public website pages, find contact and office-location information, and search official documents.

The assistant is a **client-side, rule-based website guide**, not an AI/LLM chatbot. It uses predefined phrase matching and guided buttons; it does not answer arbitrary questions or connect to a chatbot service.

## Capabilities

- **Sinhala, Tamil, and English interface.** Visitors choose a language when opening the assistant. The selected language is stored in the browser's `localStorage`.
- **Guided introduction and button menus**, with options for the department, gallery, staff, contact information, office location, other public-sector websites, and additional navigation.
- **Keyword-based navigation.** Recognized phrases in the selected language can open relevant pages or contact information. Unsupported questions receive a limitation message and navigation options.
- **Document browsing and search** through the `documents.php` endpoint:
  - Browse gazettes, circulars, presentations, and other documents.
  - Search document titles and original filenames.
  - Show document titles, file types, and available dates.
  - Preview PDFs in a new tab and download files.
- **Contact information** with clickable telephone and email links.
- **Office location** with links to Google Maps and directions.
- **Links to related public websites**, configured in `chatbot_config.php`.
- **Embeddable widget loader** for adding the assistant to another page on the same website.
- **Responsive interface** with an Amal mascot, department branding, and mobile layout.

## What the assistant does not do

- It does not use generative AI, a language model, or a backend conversation service.
- It does not understand arbitrary questions. Text input is matched against predefined phrases for navigation intents.
- It does not provide private, personalized, or account-based services.
- It does not save chat transcripts. The selected language is the only assistant preference stored in the browser.
- Document search matches titles and filenames; it does not search the contents of documents.

## Repository contents

| File or directory | Purpose |
| --- | --- |
| `chatbot.php` | Renders the assistant markup and provides configuration and translations to the client. Supports a widget mode with `?widget=1`. |
| `chatbot.js` | Language selection, menus, phrase matching, navigation, contact and office cards, and document browsing/search UI. |
| `chatbot.css` | Widget appearance, responsive layout, document cards, office card, and launcher animation. |
| `chatbot-loader.js` | Loads the widget markup, stylesheet, and JavaScript onto another page. |
| `chatbot_config.php` | Branding, department page URLs, contact details, related websites, office location, and asset paths. |
| `chatbot_translations.php` | English, Sinhala, and Tamil interface text. |
| `documents.php` | JSON endpoint that scans, filters, and searches the website's documents. |
| `assets/department-logo.png` | Department logo. |
| `assets/southern-flag.jpg` | Southern Province flag image. |
| `assets/amal.jpg` | Amal mascot image. |

The old documentation listed `assets/amal.svg`; the current configuration uses `assets/amal.jpg`.

## Requirements and deployment

- A PHP-capable web server. PHP 7.0 or later is required by the typed PHP code; use a currently supported PHP release where possible.
- A modern browser with JavaScript enabled, `fetch`, and `localStorage`.
- Serve the project at the website path `/chatbot`, or update the absolute `/chatbot/...` paths in the source and configuration.
- The document endpoint requires the website's existing `includes/file-scanner.php` and the document directories that scanner indexes. In the current deployment layout, the endpoint loads `../includes/file-scanner.php` and runs the scanner from the web document root.

No database, package manager, build step, or third-party JavaScript library is used by the chatbot code.

### Typical deployment layout

The source expects URLs such as `/chatbot/chatbot.css`, `/chatbot/chatbot.js`, and `/chatbot/documents.php`. Deploy the project under the website's `/chatbot` directory and ensure the configured asset files are reachable at their `/chatbot/assets/...` URLs.

The document endpoint also expects the host site's scanner at `includes/file-scanner.php`. Deploying the chatbot without that host-site dependency will prevent document browsing and search from working.

## Use on the chatbot website

Include `chatbot.php` from a PHP page. In normal mode, it adds the stylesheet and JavaScript references:

```php
<?php require __DIR__ . '/chatbot.php'; ?>