<?php
/**
 * Template Name: Sidebar Template
 *
 * @author 	M. Drew LaMar
 * @copyright	December 2016
 */

// define base path (without doc root)
$base = rtrim(str_replace(PATH_ROOT, '', __DIR__), DS);

// define base url for links
$baseLink = 'index.php?option=com_groups&cn=' . $this->group->get('cn');

// check to see if were supposed to no display html (template frame)
$no_html = Request::getInt('no_html', 0);

// add stylesheets and scripts
Document::addStyleSheet($base . DS . 'assets/css/main.css');
Document::addStyleSheet($base . DS . 'assets/css/sidebar.css');
Document::addStyleSheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
Document::addScript($base . DS . 'assets/js/main.js');
Document::addScript($base . DS . 'assets/js/sidebar.js');
?>

<?php if (!$no_html) : ?>
<group:include type="content" scope="before" />

<div class="super-group-body-wrap group-<?php echo $this->group->get('cn'); ?>">
	<div class="super-group-body">
		<?php include_once 'includes/header.php'; ?>

		<!-- ###  Start Sideber ### -->
		<div id="wrapper">
			<!-- Sidebar -->
			<div id="sidebar-wrapper">
				<?php include_once 'includes/sidebar-menu.php'; ?>
			</div><!-- /#sidebar-wrapper -->
			<!-- ###  End Sideber ### -->

			<div id="page-content-wrapper">
				<div class="container-fluid xyz">
					<div class="super-group-content-wrap">
						<div class="super-group-content group_<?php echo $this->tab; ?>">
							<?php
								$title = (isset($this->page) && $this->page->get('title')) ? $this->page->get('title') : Lang::txt('PLG_GROUPS_' . strtoupper($this->tab));
								$title = ($title == 'PLG_GROUPS_' . strtoupper($this->tab) ? ucfirst($this->tab) : $title);
								if ($title != '') :
							?>
								<h2><?php echo $title; ?></h2>
							<?php endif; ?>
			<!-- <?php endif; ?> -->
							<!-- ###  Start Content Include  ### -->
<?php
$fred = $this->get('group')->get('gidNumber');
echo $fred;
?>
								<group:include type="content" />
							<!-- ###  End Content Include  ### -->
			<?php if (!$no_html) : ?>
						</div><!-- /.super-group-content -->
					</div><!-- /.super-group-content-wrap -->
				</div><!-- /.container-fluid xyz -->
			</div><!-- /.page-content-wrapper -->
		</div><!-- /.wrapper -->

		<?php include_once 'includes/footer.php'; ?>
	</div>
</div>

<group:include type="googleanalytics" account="" />
<?php endif; ?>
