<?php
    add_image_size('main-image', 1920, 980);
    add_image_size('newses-image', 455, 426);
    add_image_size('newses-image-big', 455, 481);
    add_image_size('contact-image', 971, 918);
    add_image_size('gallery-big-image', 1920, 820);
    add_image_size('gallery-thumbnail', 75, 75, true);
    add_image_size('gallery-listing-thumbnail', 675, 585);
    add_image_size('news-image', 1920, 430);

    acf_add_options_page(array(
		'page_title' 	=> 'Ustawienia szablonu',
		'menu_title'	=> 'Customizacja',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));

    add_filter('wp_nav_menu_objects', 'my_wp_nav_menu_objects', 10, 2);

    function my_wp_nav_menu_objects( $items, $args ) {
        foreach( $items as &$item ) {
            $icon = get_field('svg_icon', $item);
            if( $icon ) {
                $item->title = $icon;   
            }   
        }
        return $items;   
    }

    register_nav_menus( array(
        'main_menu' => 'Menu główne',
        'races_menu' => 'Submenu rasy',
        'pup_menu' => 'Submenu szczenięta',
        'gallery_menu' => 'Submenu galeria',
        'mobile_menu' => 'Menu na urządzenia mobilne',
        'footer_left' => 'Menu stopka (lewe)',
        'footer_right' => 'Menu stopka (prawe)',
    ));
      
    add_theme_support( 'post-thumbnails' );
    add_post_type_support( 'gallery', 'thumbnail' );
    add_post_type_support( 'dog', 'thumbnail' );
    add_post_type_support( 'pup', 'thumbnail' );
    add_post_type_support( 'races', 'thumbnail' );

    function create_posttype() {
        register_post_type( 'gallery',
            array(
                'labels' => array(
                    'name' => __( 'Galerie' ),
                    'singular_name' => __( 'Galeria' )
                ),
                'public' => true,
                'has_archive' => true,
                'rewrite' => array('slug' => 'galeria'),
                'show_in_rest' => true
            )
        );
        register_post_type( 'dog',
            array(
                'labels' => array(
                    'name' => __( 'Psy' ),
                    'singular_name' => __( 'Pies' )
                ),
                'public' => true,
                'has_archive' => true,
                'rewrite' => array('slug' => 'pies'),
                'show_in_rest' => true
            )
        );
        register_post_type( 'pup',
            array(
                'labels' => array(
                    'name' => __( 'Szczenięta' ),
                    'singular_name' => __( 'Szczenięta' )
                ),
                'public' => true,
                'has_archive' => true,
                'rewrite' => array('slug' => 'szczenieta'),
                'show_in_rest' => true
            )
        );
    }
    add_action( 'init', 'create_posttype' );