import {useBlockProps, RichText} from '@wordpress/block-editor';

import {MediaUpload, MediaUploadCheck} from '@wordpress/block-editor';
import {Button, TextControl, ToggleControl} from '@wordpress/components';

import {withSelect} from '@wordpress/data';

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
function Edit(props) {
	const {attributes, setAttributes} = props;

	const onSelectMedia = (media) => {
		setAttributes({
			mediaId: media.id,
			mediaUrl: media.url
		});
	};

	const blockProps = useBlockProps();
	return (
		<div {...useBlockProps}>

			<TextControl
				label="Name"
				value={attributes.name}
				onChange={(value) => setAttributes({name: value})}
			/>


			<RichText
				onChange={(value) => setAttributes({description: value})}
				tagName="p"
				allowedFormats={['core/bold', 'core/italic']}
				value={attributes.description}
				placeholder={'Player Text'}
			/>


			<MediaUploadCheck>
				<MediaUpload
					onSelect={onSelectMedia}
					value={attributes.mediaId}
					allowedTypes={['image']}
					render={({open}) => (
						<Button
							className={attributes.mediaId === 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
							onClick={open}
							style={{display: "contents"}}
						>
							{attributes.mediaId === 0 && 'Choose an image'}
							{props.media !== undefined &&
								<img src={props.media.source_url} alt="img preview"
									 style={{maxWidth: "150px", maxHeight: "150px", display: "block"}}/>
							}
						</Button>
					)}
				/>
			</MediaUploadCheck>
			{attributes.mediaId !== 0 &&
				<MediaUploadCheck>
					<MediaUpload
						title={'Replace image'}
						value={attributes.mediaId}
						onSelect={onSelectMedia}
						allowedTypes={['image']}
						render={({open}) => (
							<Button onClick={open} isDefault isLarge>{'Replace image'}</Button>
						)}
					/>
				</MediaUploadCheck>
			}

			<ToggleControl
				label="Right"
				checked={attributes.right}
				onChange={() => {
					setAttributes({right: !attributes.right});
				}}
			/>

			<div className="grid grid-cols-2">
				<div>
					<TextControl
						label="Attr1"
						value={attributes.attr1}
						onChange={(value) => setAttributes({attr1: value})}
					/>
				</div>
				<div>
					<TextControl
						label="Val1"
						value={attributes.val1}
						onChange={(value) => setAttributes({val1: value})}
					/>
				</div>

				<div>
					<TextControl
						label="Attr2"
						value={attributes.attr2}
						onChange={(value) => setAttributes({attr2: value})}
					/>
				</div>
				<div>
					<TextControl
						label="Val2"
						value={attributes.val2}
						onChange={(value) => setAttributes({val2: value})}
					/>
				</div>

				<div>
					<TextControl
						label="Attr3"
						value={attributes.attr3}
						onChange={(value) => setAttributes({attr3: value})}
					/>
				</div>
				<div>
					<TextControl
						label="Val3"
						value={attributes.val3}
						onChange={(value) => setAttributes({val3: value})}
					/>
				</div>


			</div>

		</div>

	);
}

export default withSelect((select, props) => {
	return {media: props.attributes.mediaId ? select('core').getMedia(props.attributes.mediaId) : undefined};
})(Edit)
