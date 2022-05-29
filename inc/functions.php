<?php
/** Functions **/

add_filter('upload_mimes', 'modelviewerviewer_add_file_types_to_uploads', 1, 1);
/**
* Adds glb to allowed uploads.
*/
function modelviewerviewer_add_file_types_to_uploads($file_types){
  $new_filetypes = array();
  // Potentially need to restore as model/gltf-binary in the future.
  // $new_filetypes['glb'] = 'model/gltf-binary';
  $new_filetypes['glb'] = 'application/octet-stream';
  $file_types = array_merge($file_types, $new_filetypes );
  return $file_types;
}

add_filter('wp_check_filetype_and_ext', 'modelviewerviewer_checkfiletypes', 10, 4);
/**
 * Check the filetypes
 */
function modelviewerviewer_checkfiletypes($data, $file, $filename, $mimes) {
    if (!$data['type']) {
        $wp_filetype = wp_check_filetype($filename, $mimes);
        $ext = $wp_filetype['ext'];
        $type = $wp_filetype['type'];
        $proper_filename = $filename;
        if ($type && 0 === strpos($type, 'model/') && $ext !== 'glb') {
            $ext = $type = false;
        }
        $data['ext'] = $ext;
        $data['type'] = $type;
        $data['proper_filename'] = $proper_filename;
    }
    return $data;
}

add_action('wp_enqueue_scripts', 'modelviewerviewer_frontend_assets');

/**
 * Enqueue block frontend JavaScript
 */
function modelviewerviewer_frontend_assets() {

	wp_enqueue_script(
		"modelviewerloader-frontend",
		plugin_dir_url( __FILE__ ) . '../build/assets/js/blocks.frontend.js',
		['wp-element'],
		'',
		true
	);
}

