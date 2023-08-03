<?php
namespace DPUK_AC\Classes;

class WC_Display_Products {

     public function __construct() {

        add_action('init', array( $this,'register_block') );

     }

      /**
       * Register block
       */
      public function register_block(){
        register_block_type(
            DPUKAC_PATH . "includes/blocks/wc-display-products",
            array(
                'render_callback' => array($this,'wc_display_products_dynamic_callback'),
            )
        );
    }

    /**
     * Build the dynamic render for the SHareprice block.
     */
    public function wc_display_products_dynamic_callback($attributes, $content){

        $productSectionTitle = $attributes['productSectionTitle'];

        $output = '';
        $args = array(
            'post_type'      => 'product',
            'posts_per_page' => 12,
            'post_status'    => 'publish',
            'orderby'        => 'title',
            'order'	         => 'ASC',
        );
        $products = new \WP_Query( $args );
        if ( $products->have_posts() ) {

            $output .= '<div class="product-block-container">';
            $output .= '<div class="product-block__title-section"><h2 class="product-block__title">'. $productSectionTitle .'</h2></div>';
            $output .= '<div class="product-block-inner">';

            while ( $products->have_posts() ) : $products->the_post();
                
            $product    = wc_get_product( get_the_ID() );
            $price      = $product->get_price_html();
            $imageSize  = 'full';
            // build the card
                $output .=   '<a href="'.get_permalink().'" target="_self" title="link to '.get_the_title().'" class="product-card">';
                $output .=  '<div class="product-card-container">';
                $output .=  '<div class="card__image">'.get_the_post_thumbnail( get_the_ID(), $imageSize ).'</div>';
                $output .=  '<div class="card__content">';
                $output .=  '<div class="card__title">'.get_the_title().'</div>';
                $output .=  '<div class="card__link_cta">'.$price.'</div>';
                $output .=  '</div>';
                $output .=  '</div>';
                $output .=  '</a>';
            endwhile;
            $output .= '</div>';
            $output .= '</div>';
        } else {
            echo __( 'No products found' );
        }
        wp_reset_postdata();

        return $output;
    }
}
new WC_Display_Products();
