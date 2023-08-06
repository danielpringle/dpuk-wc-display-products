/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { select, useSelect } from '@wordpress/data';
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { Spinner} from '@wordpress/components';
import {  PanelBody, PanelRow, __experimentalNumberControl as NumberControl } from '@wordpress/components';

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
            per_page: attributes.numberOfProducts,
            orderby: 'title',
            order: 'asc',
            status: 'publish',
        }
		const blockProps = useBlockProps();

        const {posts} = useSelect( ( select ) => {
            return {
                posts: select( 'core' ).getEntityRecords( 'postType', 'product', query ),
            }
        }, [attributes.numberOfProducts] );

		const defaultImage = window.location.protocol + "//" + window.location.host + "/" +'wp-content/plugins/dpuk-wc-display-products/includes/blocks/wc-display-products/src/woocommerce-placeholder.png';
      
        // let productDetails = [];
        // if (posts) {
        //     posts.forEach(post => {
                
        //         const imgSrc = post.dp_img_src ? post.dp_img_src : defaultImage

        //         productDetails.push({ 
        //             id: post.id, 
        //             title: post.title.rendered, 
        //             image: imgSrc, 
        //             price: post.dp_price, 
        //             currency: post.dp_currency,
        //             media: post.featured_media,
        //             media2: select('core').getMedia( post.featured_media),
        //         });
        //     });
        // } 

        /**
         * Display the currency symbol
         * @param {*} currency 
         * @returns 
         */
        function getCurrency(currency){
            switch(currency) {
                case 'GBP':
                  return '£';
                default:
                  return '£';
              }
        }

        return (
            <div { ...blockProps }>
            { ! posts && <Spinner /> }
            { posts && posts.length === 0 && 'No Products' }
            { posts && posts.length > 0 && (
            <>
				<InspectorControls>
					<PanelBody
						title="Select number of posts to display."
						initialOpen={true}
					>
						<PanelRow>
                        <NumberControl
                            onChange={ ( numberOfProducts ) => setAttributes( { numberOfProducts  } ) }
                            isDragEnabled
                            isShiftStepEnabled
                            shiftStep={ 10 }
                            step={1}
                            value={ attributes.numberOfProducts }
                            min={-1}
                        />
						</PanelRow>
                        </PanelBody>
				</InspectorControls>
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
                posts.map( ( post ) => {
                    const featuredImage = post.featured_media ? wp.data.select('core').getMedia( post.featured_media ) : null;
                    const featuredImageUrl = featuredImage ? featuredImage.media_details.sizes.woocommerce_thumbnail.source_url : defaultImage;

                    return (
                    <div key={post.id} className="product-card">
                    <div className="product-card__image">    
                    { ! featuredImage && <Spinner />
                    }
                    { featuredImage && 
                        <img src={ featuredImageUrl } />
                    }
                    </div>
                    <div className="product-card__contents">
                    <div className="product-card__title">
                    <h3 key={post.title}>
                    {post.title.rendered} 
                    </h3>
                    </div>
                    <div className="product-card__price">
                    <span key={post.dp_price}>{getCurrency(post.dp_currency)}{post.dp_price}</span>
                    </div>
                    </div>
                    </div>
                    )
                })
                }
            </div>
            </>
            ) }
            </div>
        );
	},
	save(props) {
		return null;
	  },
});
