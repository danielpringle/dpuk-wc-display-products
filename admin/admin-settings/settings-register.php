<?php
namespace DPUK_AC\Admin;


// disable direct file access
if ( ! defined( 'ABSPATH' ) ) {

	exit;

}



// register plugin settings
function postsync_register_settings() {

	/*

	register_setting(
		string   $option_group,
		string   $option_name,
		callable $sanitize_callback = ''
	);

	*/

	register_setting(
		'postsync_options',
		'postsync_options',
		'postsync_callback_validate_options'
	);

	/*

	add_settings_section(
		string   $id,
		string   $title,
		callable $callback,
		string   $page
	);

	*/

	add_settings_section(
		'postsync_section_login',
		'Synced site:',
		'postsync_callback_section_login',
		'postsync'
	);



	/*

	add_settings_field(
    string   $id,
		string   $title,
		callable $callback,
		string   $page,
		string   $section = 'default',
		array    $args = []
	);

	*/

	add_settings_field(
		'postsync_url',
		'URL',
		'postsync_callback_field_text',
		'postsync',
		'postsync_section_login',
		[ 'id' => 'postsync_url', 'label' => 'URL for the synced site' ]
	);

	add_settings_field(
		'postsync_username',
		'Username',
		'postsync_callback_field_text',
		'postsync',
		'postsync_section_login',
		[ 'id' => 'postsync_username', 'label' => 'Username' ]
	);

	add_settings_field(
		'postsync_password',
		'Password',
		'postsync_callback_field_text',
		'postsync',
		'postsync_section_login',
		[ 'id' => 'postsync_password', 'label' => 'Password' ]
	);

	

}
add_action( 'admin_init', __NAMESPACE__ . '\postsync_register_settings' );


