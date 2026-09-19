<?php
/**
 * SportsDPSP Assistant configuration.
 * Keep public destinations here. No database access is used by the chatbot.
 */

$chatbot_config = [
    'site_home' => 'https://www.sportsdpsp.lk/',

    'branding' => [
        'bot_name' => 'SportsDPSP Assistant',
        'department_name' => 'Department of Sports - Southern Province',
        'developer' => 'Janidu Siriwardhana',
    ],

    'links' => [
        'home' => 'https://www.sportsdpsp.lk/',
        'about' => 'https://www.sportsdpsp.lk/about',
        'gallery' => 'https://www.sportsdpsp.lk/gallery',
        'downloads' => 'https://www.sportsdpsp.lk/download',
        'staff' => 'https://www.sportsdpsp.lk/staff',
        'contact' => 'https://www.sportsdpsp.lk/contact',
    ],

    // Add the exact official URLs here when you provide the other ministries/departments.
    // Example:
    // ['name' => 'Ministry of Education', 'url' => 'https://example.gov.lk/'],
    'other_sites' => [],

    'contact' => [
        'address' => '3rd Floor, "Dakshinapaya", Ministry Complex, Labuduwa, Galle',
        'director' => '091 4936738',
        'assistant_director' => '091 4936703',
        'administrative_officer' => '091 4936712',
        'office' => '091 4936711',
        'fax' => '091 22236272',
        'email' => 'minisportssouthern@gmail.com',
    ],

    'assets' => [
        'logo' => '/chatbot/assets/department-logo.png',
        'flag' => '/chatbot/assets/southern-flag.jpg',
        'amal' => '/chatbot/assets/amal.svg',
    ],
];
?>
