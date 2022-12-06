/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {useBlockProps, RichText} from '@wordpress/block-editor';

import {PanelBody, Button, ResponsiveWrapper } from '@wordpress/components';

import {withSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
function Edit( { attributes, setAttributes }) {

	const onChangeDescription = ( newDescription ) => {
		setAttributes( { description: newDescription } )
	};

	const onSelectMedia = (media) => {
		props.setAttributes({
			mediaId: media.id,
			mediaUrl: media.url
		});
	};

	const blockStyle = {
		backgroundImage: attributes.mediaUrl !== '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
	};

	return (
		<div {...useBlockProps()}>
			<RichText
				onChange={onChangeDescription}
				tagName="p"
				allowedFormats={['core/bold', 'core/italic']}
				value={attributes.description}
				placeholder={'Player Text'}
			/>


			<MediaUploadCheck>
				<MediaUpload
					onSelect={onSelectMedia}
					value={attributes.mediaId}
					allowedTypes={ ['image'] }
					render={({open}) => (
						<Button
							className={attributes.mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
							onClick={open}
						>
							{attributes.mediaId == 0 && __('Choose an image', 'awp')}
							{props.media != undefined &&
								<ResponsiveWrapper
									naturalWidth={ props.media.media_details.width }
									naturalHeight={ props.media.media_details.height }
								>
									<img src={props.media.source_url} />
								</ResponsiveWrapper>
							}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			{attributes.mediaId !== 0 &&
				<MediaUploadCheck>
					<MediaUpload
						title={__('Replace image', 'awp')}
						value={attributes.mediaId}
						onSelect={onSelectMedia}
						allowedTypes={['image']}
						render={({open}) => (
							<Button onClick={open} isDefault isLarge>{__('Replace image', 'awp')}</Button>
						)}
					/>
				</MediaUploadCheck>
			}
			<div style={blockStyle}>
				... Your block content here...
			</div>

		</div>

	);
}

export default withSelect((select, props) => {
	return { media: props.attributes.mediaId ? select('core').getMedia(props.attributes.mediaId) : undefined };
})(Edit)
