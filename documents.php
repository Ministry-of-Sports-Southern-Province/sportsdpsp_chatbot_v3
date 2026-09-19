<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

try {

    /*
     * The existing file-scanner uses relative paths such as:
     * assets/circulars/
     *
     * Make sure those paths are resolved from httpdocs.
     */
    $documentRoot = $_SERVER['DOCUMENT_ROOT'] ?? dirname(__DIR__);
    $originalCwd = getcwd();

    chdir($documentRoot);

    require_once __DIR__ . '/../includes/file-scanner.php';

    $category = isset($_GET['category'])
        ? trim((string) $_GET['category'])
        : '';

    $query = isset($_GET['q'])
        ? trim((string) $_GET['q'])
        : '';

    $allowedCategories = [
        'gazzets',
        'circulars',
        'presentation',
        'other'
    ];

    if ($category !== '' && !in_array($category, $allowedCategories, true)) {
        $category = '';
    }

    $allFiles = scanAllDocuments();

    /*
     * Filter category
     */
    if ($category !== '') {

        $allFiles = array_values(
            array_filter(
                $allFiles,
                function (array $file) use ($category): bool {
                    return $file['category'] === $category;
                }
            )
        );
    }

    /*
     * Search title + original filename.
     */
    if ($query !== '') {

        $search = function_exists('mb_strtolower')
            ? mb_strtolower($query, 'UTF-8')
            : strtolower($query);

        $allFiles = array_values(
            array_filter(
                $allFiles,
                function (array $file) use ($search): bool {

                    $title = function_exists('mb_strtolower')
                        ? mb_strtolower((string) $file['title'], 'UTF-8')
                        : strtolower((string) $file['title']);

                    $filename = function_exists('mb_strtolower')
                        ? mb_strtolower((string) $file['filename'], 'UTF-8')
                        : strtolower((string) $file['filename']);

                    return (
                        strpos($title, $search) !== false ||
                        strpos($filename, $search) !== false
                    );
                }
            )
        );
    }

    /*
     * Maximum number returned to Amal at once.
     * Search is still performed over the complete scanned collection.
     */
    $limit = isset($_GET['limit'])
        ? (int) $_GET['limit']
        : 30;

    $limit = max(1, min($limit, 100));

    $allFiles = array_slice($allFiles, 0, $limit);

    $files = [];

    foreach ($allFiles as $file) {

        /*
         * Scanner returns paths such as:
         * assets/circulars/example.pdf
         *
         * Convert them to public website URLs.
         */
        $publicPath = '/' . ltrim(
            str_replace('\\', '/', (string) $file['path']),
            '/'
        );

        $files[] = [
            'filename'     => (string) $file['filename'],
            'title'        => (string) $file['title'],
            'category'     => (string) $file['category'],
            'extension'    => strtolower((string) $file['extension']),
            'year'         => (string) $file['year'],
            'month'        => (string) $file['month'],
            'day'          => (string) $file['day'],
            'display_date' => (string) $file['display_date'],
            'path'         => $publicPath
        ];
    }

    /*
     * Restore original working directory.
     */
    if ($originalCwd !== false) {
        @chdir($originalCwd);
    }

    echo json_encode(
        [
            'success' => true,
            'count'   => count($files),
            'files'   => $files
        ],
        JSON_UNESCAPED_UNICODE |
        JSON_UNESCAPED_SLASHES
    );

} catch (Throwable $e) {

    http_response_code(500);

    echo json_encode(
        [
            'success' => false,
            'count'   => 0,
            'files'   => [],
            'error'   => 'Unable to load documents.'
        ],
        JSON_UNESCAPED_UNICODE |
        JSON_UNESCAPED_SLASHES
    );
}