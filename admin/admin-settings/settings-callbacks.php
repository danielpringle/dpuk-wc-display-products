<?php // MyPlugin - Settings Callbacks



// disable direct file access
if ( ! defined( 'ABSPATH' ) ) {

	exit;

}


// callback: login section
function postsync_callback_section_login() {

	echo '<p>Add the details of the site you are syncing with. Requires valid user credentials. This plugin uses a JSON Web Token for authentication.</p>';

}


// callback: text field
function postsync_callback_field_text( $args ) {

	$options = get_option( 'postsync_options' );

	$id    = isset( $args['id'] )    ? $args['id']    : '';
	$label = isset( $args['label'] ) ? $args['label'] : '';

	$value = isset( $options[$id] ) ? sanitize_text_field( $options[$id] ) : '';

	echo '<input id="postsync_options_'. $id .'" name="postsync_options['. $id .']" type="text" size="40" value="'. $value .'"><br />';
	echo '<label for="postsync_options_'. $id .'">'. $label .'</label>';

}




