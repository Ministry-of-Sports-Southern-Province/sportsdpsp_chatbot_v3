SportsDPSP Assistant V2
=======================

Multilingual public-site assistant for the Department of Sports - Southern Province.

Languages:
- Sinhala
- Tamil
- English

Included:
- SportsDPSP Assistant branding
- Amal-inspired pony mascot
- Department logo banner
- Southern Province flag accent
- Pre-language introduction explaining the assistant and developer credit
- Main navigation to public pages only
- Strict FAQ/keyword matching for public-site topics
- Contact/complaint fallback with official phone, email and address
- Other Ministries & Departments menu ready for official links
- Responsive mobile layout
- No database access
- No Dialogflow/API dependency in V2

Files:
chatbot.php
chatbot.css
chatbot.js
chatbot_config.php
chatbot_translations.php
assets/department-logo.png
assets/southern-flag.jpg
assets/amal.svg

Plesk installation
------------------
1. Open Plesk -> Files -> httpdocs.
2. Create this folder:
   /httpdocs/chatbot/
3. Upload all files and the assets folder into /httpdocs/chatbot/.
4. On every PUBLIC PHP page, add this once before </body>:

   <?php include $_SERVER['DOCUMENT_ROOT'] . '/chatbot/chatbot.php'; ?>

If your pages share one common footer/layout, add it there once instead of repeating it manually on every page.

Do not include the widget on password-protected/admin systems unless desired.

Other ministries/departments
----------------------------
Edit chatbot_config.php and add official public links inside the other_sites array.
Example:

'other_sites' => [
    ['name' => 'Official Organization Name', 'url' => 'https://official.example/'],
],

Only add verified official public URLs.

Updating contact details
------------------------
Edit chatbot_config.php -> contact.

Updating wording/translations
-----------------------------
Edit chatbot_translations.php.

Cache/testing
-------------
After uploading, hard-refresh the site with Ctrl+F5.
If the chatbot does not appear, check that chatbot.php is included only once and that the /chatbot/ URLs are correct.
new updates will be available
