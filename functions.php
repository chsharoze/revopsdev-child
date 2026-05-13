<?php
/**
 * RevOpsDev Child Theme functions
 */

require_once get_stylesheet_directory() . '/inc/schema.php';
require_once get_stylesheet_directory() . '/inc/meta.php';

function revopsdev_child_enqueue_scripts() {
    wp_enqueue_style( 'hello-elementor-theme-style', get_template_directory_uri() . '/style.min.css' );
    wp_enqueue_style( 'revopsdev-child-style', get_stylesheet_directory_uri() . '/style.css', array('hello-elementor-theme-style'), wp_get_theme()->get('Version') );
    wp_enqueue_script( 'revopsdev-main-js', get_stylesheet_directory_uri() . '/assets/main.js', array(), wp_get_theme()->get('Version'), array('strategy' => 'defer', 'in_footer' => true) );
}
add_action( 'wp_enqueue_scripts', 'revopsdev_child_enqueue_scripts', 20 );

add_action('wp_head', 'revopsdev_homepage_schema', 5);
add_action('wp_head', 'revopsdev_homepage_meta', 1);
