<?php
/**
 * DPUK WC Display Products Block
 *
 * Block to display WC Products
 *
 * @package 
 * @version 1.0.1
 * @link    
 *
 * Plugin Name:  DPUK WC Display Products Block
 * Version: 1.0.0
 * Plugin URI:   https://danielpringle.co.uk
 * Description:  Block to display WC Products
 * Author:       Daniel Pringle
 * Author URI:   https://danielpringle.co.uk
 * Text Domain:  dpuk-ac
 * Domain Path:  /languages
 * Requires PHP: 7.4
 * Requires at least: 5.8
 * Tested up to: 5.7.1
 */
namespace DPUK_AC;

// Alias namespaces.
use DPUK_AC\Classes\Activate as Activate;

// Restrict direct access.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * License & Warranty
 *
 */

/**
 * Constant: Plugin Name and Version
 *
 * @since 1.0.0
 * @var   string The name of this plugin file.
 * @var   string The version of this plugin file.
 */
$plugin_data          = get_file_data(
	__FILE__,
	array(
		'name'    => 'Plugin Name',
		'version' => 'Version',
		'text'    => 'Text Domain',
		'requires' =>'Requires PHP',
	)
);
define( 'DPUKAC_VERSION',  $plugin_data['version'] );
define( 'DPUKAC_NAME',  $plugin_data['name'] );
define( 'DPUKAC_REQUIRES_PHP',  $plugin_data['name'] );

/**
 * Constant: Plugin basename
 *
 * @since 1.0.0
 * @var   string The basename of this plugin file.
 */
define( 'DPUKAC_BASENAME', plugin_basename( __FILE__ ) );

// Get the PHP version class.
require_once plugin_dir_path( __FILE__ ) . 'includes/classes/class-php-version.php';

// Get plugin configuration file.
require plugin_dir_path( __FILE__ ) . 'config.php';

/**
 * Activation & deactivation
 *
 * The activation & deactivation methods run here before the check
 * for PHP version which otherwise disables the functionality of
 * the plugin.
 */

// Get the plugin activation class.
include_once DPUKAC_PATH . 'activate/classes/class-activate.php';

// Get the plugin deactivation class.
include_once DPUKAC_PATH . 'activate/classes/class-deactivate.php';

/**
 * Register the activation & deactivation hooks
 *
 * The namspace of this file must remain escaped by use of the
 * backslash (`\`) prepending the activation hooks and corresponding
 * functions.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
\register_activation_hook( __FILE__, __NAMESPACE__ . '\activate_plugin' );
\register_deactivation_hook( __FILE__, __NAMESPACE__ . '\deactivate_plugin' );

/**
 * Activation callback
 *
 * The function that runs during plugin activation.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
function activate_plugin() {

	// Instantiate the Activate class.
	$activate = new Activate\Activate;

	// Update options.
	$activate->options();
}

/**
 * Deactivation callback
 *
 * The function that runs during plugin deactivation.
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
function deactivate_plugin() {}

/**
 * Disable plugin for PHP version
 *
 * Stop here if the minimum PHP version in the config
 * file is not met. Prevents breaking sites running
 * older PHP versions.
 *
 * A notice is added to the plugin row on the Plugins
 * screen as a more elegant and more informative way
 * of disabling the plugin than putting the PHP minimum
 * in the plugin header, which activates a die() message.
 * However, the Requires PHP tag is included in the
 * plugin header with a minimum of version 5.4
 * because of the namespaces.
 *
 * @since  1.0.0
 * @return void
 */
if ( ! Classes\php()->version() ) {

	// First add a notice to the plugin row.
	$activate = new Activate\Activate;
	$activate->get_row_notice();

	// Stop here.
	return;
}

/**
 * Plugin initialization
 *
 * Get the plugin initialization file if
 * the PHP minimum is met.
 *
 * @since  1.0.0
 */
require_once DPUKAC_PATH . 'init.php';


add_action( 'rest_api_init', __NAMESPACE__ . '\add_thumbnail_to_JSON' );
function add_thumbnail_to_JSON() {
//Add featured image
register_rest_field( 
    'product', // Where to add the field (Here, blog posts. Could be an array)
    'featured_image_src', // Name of new field (You can call this anything)
    array(
        'get_callback'    => 'get_image_src',
        'update_callback' => null,
        'schema'          => null,
         )
    );
}

function get_image_src( $object, $field_name, $request ) {
  $feat_img_array = wp_get_attachment_image_src(
    $object['featured_media'], // Image attachment ID
    'full',  // Size.  Ex. "thumbnail", "large", "full", etc..
    false // Whether the image should be treated as an icon.
  );
  return $feat_img_array[0];
}

require_once DPUKAC_PATH . 'includes/classes/class-wc-display-products.php';








