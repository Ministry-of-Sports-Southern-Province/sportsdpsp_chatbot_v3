(function () {

    // Do not load twice
    if (document.getElementById('sportsdpsp-chatbot')) {
        return;
    }

    // Load chatbot CSS
    if (!document.querySelector('link[href="/chatbot/chatbot.css"]')) {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = '/chatbot/chatbot.css';
        document.head.appendChild(css);
    }

    // Load chatbot HTML from chatbot.php
    fetch('/chatbot/chatbot.php?widget=1')
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Could not load chatbot.php');
            }

            return response.text();
        })
        .then(function (html) {

            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;

            // Insert chatbot HTML into page
            while (wrapper.firstChild) {
                document.body.appendChild(wrapper.firstChild);
            }

            const chatbot =
                document.getElementById('sportsdpsp-chatbot');

            if (!chatbot) {
                throw new Error('Chatbot HTML not found');
            }

            // Read chatbot configuration
            const configData =
                chatbot.getAttribute('data-chatbot-config');

            if (!configData) {
                throw new Error('Chatbot configuration not found');
            }

            window.SPORTSDPSP_CHATBOT =
                JSON.parse(configData);

            // Load chatbot.js AFTER chatbot HTML exists
            const script = document.createElement('script');

            script.src = '/chatbot/chatbot.js';

            script.onload = function () {
                console.log('SportsDPSP Assistant loaded successfully.');
            };

            script.onerror = function () {
                console.error('Could not load chatbot.js');
            };

            document.body.appendChild(script);
        })
        .catch(function (error) {
            console.error(
                'SportsDPSP chatbot error:',
                error
            );
        });

})();