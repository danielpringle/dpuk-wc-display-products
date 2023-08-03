<?php
// namespace DPUK_AC;
namespace DPUK_AC\Admin;
use DPUK_AC\Admin as Admin;
class AdminSubMenu extends AdminMenu {

	function __construct( $options, Admin\AdminMenu $parent ){
		parent::__construct( $options );

		$this->parent_id = $parent->settings_id;
	}

}