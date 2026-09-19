<?php

require_once __DIR__ . '/chatbot_config.php';
require_once __DIR__ . '/chatbot_translations.php';

$isWidget = isset($_GET['widget']) && $_GET['widget'] === '1';

$chatbotData = [
    'config' => $chatbot_config,
    'translations' => $chatbot_translations
];

$chatbotDataJson = json_encode(
    $chatbotData,
    JSON_UNESCAPED_UNICODE |
    JSON_UNESCAPED_SLASHES |
    JSON_HEX_TAG |
    JSON_HEX_AMP |
    JSON_HEX_APOS |
    JSON_HEX_QUOT
);
?>

<?php if (!$isWidget): ?>
<link rel="stylesheet" href="/chatbot/chatbot.css">
<?php endif; ?>


<div
    id="sportsdpsp-chatbot"
    class="sportsdpsp-chatbot"
    data-chatbot-config="<?php echo htmlspecialchars($chatbotDataJson, ENT_QUOTES, 'UTF-8'); ?>"
>

    <button
        type="button"
        class="chatbot-launcher"
        id="chatbotLauncher"
        aria-label="Open SportsDPSP Assistant"
    >
        <img
            src="<?php echo htmlspecialchars(
                $chatbot_config['assets']['amal'],
                ENT_QUOTES,
                'UTF-8'
            ); ?>"
            alt="Amal"
            class="launcher-amal"
        >

        <span class="launcher-label">
            අමල් - වෙබ් සහායක
        </span>
    </button>


    <section
        class="chatbot-panel"
        id="chatbotPanel"
        aria-label="SportsDPSP Assistant"
        aria-hidden="true"
    >

        <header class="chatbot-header">

            <div class="chatbot-brand-strip">

                <img
                    src="<?php echo htmlspecialchars(
                        $chatbot_config['assets']['logo'],
                        ENT_QUOTES,
                        'UTF-8'
                    ); ?>"
                    alt="Department of Sports - Southern Province"
                    class="chatbot-logo"
                >

                <img
                    src="<?php echo htmlspecialchars(
                        $chatbot_config['assets']['flag'],
                        ENT_QUOTES,
                        'UTF-8'
                    ); ?>"
                    alt="Southern Province flag"
                    class="chatbot-flag"
                >

            </div>


            <div class="chatbot-header-row">

                <div class="header-mascot-wrap">

                    <img
                        src="<?php echo htmlspecialchars(
                            $chatbot_config['assets']['amal'],
                            ENT_QUOTES,
                            'UTF-8'
                        ); ?>"
                        alt="Amal pony mascot"
                        class="header-amal"
                    >

                </div>


                <div class="header-copy">

                    <div
                        class="chatbot-title"
                        id="chatbotTitle"
                    >
                        අමල් - වෙබ් සහායක
                    </div>

                    <div
                        class="chatbot-subtitle"
                        id="chatbotDepartment"
                    >
                        Department of Sports - Southern Province
                    </div>

                </div>


                <button
                    type="button"
                    class="chatbot-close"
                    id="chatbotClose"
                    aria-label="Close"
                >
                    ×
                </button>

            </div>

        </header>


        <div
            class="chatbot-body"
            id="chatbotBody"
        ></div>


        <form
            class="chatbot-input-wrap"
            id="chatbotForm"
            autocomplete="off"
        >

            <input
                type="text"
                id="chatbotInput"
                aria-label="Question"
                placeholder="Type your question..."
            >

            <button
                type="submit"
                id="chatbotSend"
                aria-label="Send"
            >
                ➤
            </button>

        </form>


        <footer
            class="chatbot-footer"
            id="chatbotFooter"
        >
            Developed by @Janidu Siriwardhana
        </footer>

    </section>

</div>


<?php if (!$isWidget): ?>

<script>
window.SPORTSDPSP_CHATBOT = <?php
echo $chatbotDataJson;
?>;
</script>

<script src="/chatbot/chatbot.js" defer></script>

<?php endif; ?>