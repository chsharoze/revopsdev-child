<?php
/**
 * Front page template — RevOpsDev
 * Reads section files directly; updates on every git deploy without touching Elementor.
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php
$s = get_stylesheet_directory() . '/sections/';
readfile( $s . 'nav.html' );
readfile( $s . 'mobile-menu.html' );
readfile( $s . 'hero.html' );
readfile( $s . 'scroll-sequences.html' );
readfile( $s . 'footer.html' );
?>
<?php wp_footer(); ?>
</body>
</html>
