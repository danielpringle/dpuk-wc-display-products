<?php
/**
 * Register plugin classes
 *
 * The autoloader registers plugin classes for later use.
 *
 * @package    DPUK_AC
 * @subpackage Includes
 * @category   Classes
 * @since      1.0.0
 */

namespace DPUK_AC;

// Restrict direct access.
if ( ! defined( 'ABSPATH' ) ) {
	die;
}

/**
 * Class files
 *
 * Defines the class directory and file prefix.
 *
 * @since 1.0.0
 * @var   string Defines the class file path.
 */
define( 'DPUKAC_CLASS', DPUKAC_PATH . 'includes/classes/class-' );

/**
 * Array of classes to register
 *
 * @since 1.0.0
 * @var   array Defines an array of class files to register.
 */
define( 'DPUKAC_CLASSES', [
	__NAMESPACE__ . '\Classes\AssetVersioning'          => DPUKAC_CLASS . 'asset-versioning.php',
    __NAMESPACE__ . '\Classes\EnqueueAssets'            => DPUKAC_CLASS . 'enqueue-assets.php',

] );

/**
 * Autoload class files
 *
 * @since  1.0.0
 * @access public
 * @return void
 */
spl_autoload_register(
	function ( string $class ) {
		if ( isset( DPUKAC_CLASSES[ $class ] ) ) {
			require DPUKAC_CLASSES[ $class ];
		}
	}
);