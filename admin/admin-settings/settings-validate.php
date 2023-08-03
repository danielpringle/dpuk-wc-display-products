<?php // MyPlugin - Validate Settings
namespace DPUK_AC\Admin;


// disable direct file access
if ( ! defined( 'ABSPATH' ) ) {
	
	exit;
	
}

// callback: validate options
function postsync_callback_validate_options( $input ) {
	
	// postsync_url
	if ( isset( $input['postsync_url'] ) ) {
		
		$input['postsync_url'] = esc_url( $input['postsync_url'] );
		
	}
	
	// postsync_username
	if ( isset( $input['postsync_username'] ) ) {
		
		$input['postsync_username'] = sanitize_text_field( $input['postsync_username'] );


		
	}

	// postsync_password
	if ( isset( $input['postsync_password'] ) ) {
		
		$input['postsync_password'] = sanitize_text_field( $input['postsync_password'] );
		
	}


	return $input;
	
}


