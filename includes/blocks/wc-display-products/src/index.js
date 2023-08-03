/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useSelect, withSelect, select  } from '@wordpress/data';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { get } from 'lodash';

const { Component } = wp.element;

/**
 * Internal dependencies
 */
import json from '../block.json';

// Import CSS
import './editor.scss';

// Destructure the json file to get the name of the block
// For more information on how this works, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const { name } = json;

// Register the block
registerBlockType(name, {

	edit: (props) => { 

        const { 
			attributes, 
			setAttributes,
			isSelected, 
			clientId, 
		} = props;

        const query = {
            per_page: 12,
            orderby: 'title',
            order: 'asc',
            status: 'publish',
        }
		const blockProps = useBlockProps();
        const posts = useSelect( ( select ) => {
            return select( 'core' ).getEntityRecords( 'postType', 'product', query );
        }, [] );

		const defaultImage = window.location.protocol + "//" + window.location.host + "/" +'wp-content/plugins/dpuk-wc-display-products/includes/blocks/wc-display-products/src/woocommerce-placeholder.png';

        console.log(posts);
        
        let productDetails = [];
        if (posts) {
  
            posts.forEach(post => {

                // const media = post.id 
                // ? wp.data.select( 'core').getMedia( post.featured_media ) 
                // : null;

                // const image = useSelect( () => select( 'core' ).getMedia( post.featured_media ) );
                
                // console.log('media');
                // console.log(media);
                // console.log(image);

                console.log(post.title.rendered );
                productDetails.push({ id: post.id, label: post.title.rendered, ft: post.featured_media
                //productDetails.push({ id: post.id, label: post.title.rendered, ft: post.featured_image_src   
                 
                });
            });
        } 

        console.log(productDetails);      
        
        return (
            <div { ...blockProps }>
    
            <div className={ "product-block__title-section" }>
						<RichText
							tagName='h2'
							className='product-block__title'
							value={attributes.productSectionTitle}
							onChange={(productSectionTitle) => setAttributes({productSectionTitle: productSectionTitle})}
							placeholder="Section title goes here"
						/>
			</div>

 
            <div className="product-block-inner">
            {
                        productDetails.map((productDetail) => (
                            <div key={productDetail.id} className="product-card">
                            <div className="product-card__image">    
                            <img key={productDetail.ft} src={defaultImage} alt={productDetail.label}></img>
                            </div>
                            <div className="product-card__contents">
                            <div className="product-card__title">
                            <h3 key={productDetail.label}>
                              {productDetail.label} 
                            </h3>
                            </div>
                            <div className="product-card__price">
                            <span>xx:xx</span>
                            </div>
                            </div>
                            </div>
                          ))
            }
            </div>
            </div>

        );


	},
	save(props) {
		return null;
	  },
});
