<?php // MyPlugin - Admin Menu
namespace DPUK_AC\Admin;
use DPUK_AC\Admin as Admin;

// disable direct file access
if ( ! defined( 'ABSPATH' ) ) {
	
	exit;
	
}







// add top-level administrative menu
function postsync_add_toplevel_menu() {
	
	/* 
	
	add_menu_page(
		string   $page_title, 
		string   $menu_title, 
		string   $capability, 
		string   $menu_slug, 
		callable $function = '', 
		string   $icon_url = '', 
		int      $position = null 
	)
	
	*/
	
	add_menu_page(
		'PostSync Settings',
		'PostSync',
		'manage_options',
		'postsync',
		'DPUK_AC\Admin\postsync_display_settings_page',
		'dashicons-admin-generic',
		null
	);
	
}
add_action( 'admin_menu', __NAMESPACE__ . '\postsync_add_toplevel_menu' );


