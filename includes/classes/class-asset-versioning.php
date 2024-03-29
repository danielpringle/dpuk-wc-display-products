<?php

/**
 * Assets class
 *
 * Methods for enqueueing and printing assets
 * such as JavaScript and CSS files.
 *
 * @package    DPUK_AC
 * @subpackage Classes
 * @category   Core
 * @since      1.0.0
 */

namespace DPUK_AC\Classes;

// Restrict direct access.
if (! defined('ABSPATH')) {
    die;
}

final class AssetVersioning
{
    /**
     * Plugin version
     *
     * @since  1.0.0
     * @access private
     * @var    string The version number.
     */
    private $version = DPUKAC_VERSION;

    /**
     * Plugin version
     *
     * @since  1.0.0
     * @access public
     * @return string Returns the version number.
     */
    public function version()
    {
        return $this->version;
    }

    /**
     * File suffix
     *
     * Adds the `.min` filename suffix if
     * the system is not in debug mode.
     *
     * @since  1.0.0
     * @access public
     * @param  string $suffix The string returned
     * @return string Returns the `.min` suffix or
     *                an empty string.
     */
    public function suffix($suffix = '')
    {

        // If in one of the debug modes do not minify.
        if (
            ( defined('WP_DEBUG') && WP_DEBUG ) ||
            ( defined('SCRIPT_DEBUG') && SCRIPT_DEBUG )
        ) {
            $suffix = '';
        } else {
            $suffix = '.min';
        }

        // Return the suffix or not.
        return $suffix;
    }

    public function version_control($version_control = '')
    {

        // If in one of the debug modes do not minify.
        if (
            ( defined('WP_DEBUG') && WP_DEBUG ) ||
            ( defined('SCRIPT_DEBUG') && SCRIPT_DEBUG )
        ) {
            $version_control = date("Y-m-d-h:i-s");
        } else {
            $version_control = $this->version();
        }

        // Return the suffix or not.
        return $version_control;
    }
}
