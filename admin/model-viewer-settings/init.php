<?php
//Register assets for Model Viewer Settings
add_action('init', function () {
    $handle = 'model-viewer-block';
    if( file_exists(dirname(__FILE__, 3). "/build/$handle-settings.asset.php" ) ){
        $assets = include dirname(__FILE__, 3). "/build/$handle-settings.asset.php";
        $dependencies = $assets['dependencies'];
        wp_register_script(
            $handle,
            plugins_url("/build/$handle-admin-page.js", dirname(__FILE__, 2)),
            $dependencies,
            $assets['version']
        );
    }
});

//Register API Route to read and update settings.
add_action('rest_api_init', function (){
    //Register route
    register_rest_route( 'model-viewer-viewer/v1' , '/model-viewer-settings/', [
        //Endpoint to get settings from
        [
            'methods' => ['GET'],
            'callback' => function($request){
                return rest_ensure_response( [
                    'data' => [
                        'enabled' => false,
                    ]
                ], 200);
            },
            'permission_callback' => function(){
                return current_user_can('manage_options');
            }
        ],
        //Endpoint to update settings at
        [
            'methods' => ['POST'],
            'callback' => function($request){
                return rest_ensure_response( $request->get_params(), 200);
            },
            'permission_callback' => function(){
                return current_user_can('manage_options');
            }
        ]
    ]);
});

//Enqueue assets for Model Viewer Settings on admin page only
add_action('admin_enqueue_scripts', function ($hook) {
    if ('toplevel_page_model-viewer-settings' != $hook) {
        return;
    }
    wp_enqueue_script('model-viewer-block');
});

//Register Model Viewer Settings menu page
// add_action('admin_menu', function () {
//     add_menu_page(
//         __('Model Viewer Settings', 'model-viewer-viewer'),
//         __('Model Viewer Settings', 'model-viewer-viewer'),
//         'manage_options',
//         'model-viewer-settings',
//         function () {
//             //React root
//             echo '<div id="model-viewer-settings"></div>';
//         }
//     );
// });
