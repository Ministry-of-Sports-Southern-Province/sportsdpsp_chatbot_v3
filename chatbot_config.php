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

    'other_sites' => [
        [
            'name' => 'Ministry of Sports - Southern Province',
            'url' => 'https://sportsmin.sp.gov.lk'
        ],
        [
            'name' => 'Chief Ministry - Southern Province',
            'url' => 'https://www.cm.sp.gov.lk/index.php'
        ],
        [
            'name' => 'Chief Secretariat - Southern Province',
            'url' => 'https://www.cs.sp.gov.lk'
        ],
        [
            'name' => 'Public Service Commission - Southern Province',
            'url' => 'https://psc.sp.gov.lk'
        ]
    ],

    'contact' => [
        'address' => '3rd Floor, "Dakshinapaya", Ministry Complex, Labuduwa, Galle',
        'director' => '091 4936738',
        'assistant_director' => '091 4936703',
        'administrative_officer' => '091 4936712',
        'office' => '091 4936711',
        'fax' => '091 22236272',
        'email' => 'minisportssouthern@gmail.com',
    ],
	'office' => [
    'name' => 'Department of Sports - Southern Province',
    'address' => '3rd Floor, "Dakshinapaya", Ministry Complex, Labuduwa, Galle',
    'maps_search' => 'https://www.google.com/maps/search/?api=1&query=Department+of+Sports+Southern+Province+Labuduwa+Galle',
    'directions' => 'https://www.google.com/maps/dir/?api=1&destination=Department+of+Sports+Southern+Province+Labuduwa+Galle',
    ],

    'assets' => [
        'logo' => '/chatbot/assets/department-logo.png',
        'flag' => '/chatbot/assets/southern-flag.jpg',
        'amal' => '/chatbot/assets/amal.jpg',
    ],
];
?>