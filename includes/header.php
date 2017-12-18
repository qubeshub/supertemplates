<?php
/**
 * Header
 *
 * Template used for Special Groups. Will now be auto-created
 * when admin switches group from type HUB to type Special.
 *
 * @author     HUBzero
 * @copyright  December 2015
 */
 
if ($this->group->get('logo') == NULL) {
	$logo = NULL;
} else {
	$logo = rtrim(str_replace(PATH_ROOT, '', __DIR__), 'template/includes') . DS . 'uploads' . DS . $this->group->get('logo');
}
?>

<div class="super-group-header-wrap">
	<div class="super-group-header cf">
	</div>
</div>

<div class="super-group-header-overlay-wrap" onclick="location.href='<?php echo Route::url('index.php?option=com_groups&cn=' . $this->group->get('cn')); ?>';" style="cursor: pointer;">
	<div class="super-group-header-overlay">
		<h1 class="header-id">
			<a href="<?php echo Route::url('index.php?option=com_groups&cn=' . $this->group->get('cn')); ?>" title="<?php echo $this->group->get('description'); ?> Home">
				<?php if ($logo) : ?>
					<img src="<?php echo $logo ?>" class="header-id-logo">
				<?php endif; ?>
				<span><?php echo $this->group->get('description'); ?></span>
				<!-- <span>[<?php echo $this->group->get('cn'); ?>]</span> -->
			</a>
		</h1>
	</div>
</div>

<div class="super-group-menu-wrap">
	<div class="super-group-menu">
		<!-- ###  Start Menu Include  ### -->
		<group:include type="menu" />
		<!-- ###  End Menu Include  ### -->
	</div>
</div>