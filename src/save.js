/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {useBlockProps, RichText} from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({attributes}) {
	const blockProps = useBlockProps.save();

	const backgroundImageStyle = {
		backgroundImage: attributes.mediaUrl !== '' ? 'url("' + attributes.mediaUrl + '")' : 'none'
	};

	return (
		<div {...blockProps}>

			<div className={"flex flex-wrap " + (attributes.right ? "lg:justify-end" : "")}>


				<div className={"player-name-image flex" + (attributes.right ? "" : "")}>
					<div className="player-image self-end" style={backgroundImageStyle}/>
				</div>

				<div
					className={"player-info grow order-last mt-3   " + (attributes.right ? "lg:order-first" : "lg:order-none")}>

					<div className="player-description">
						<RichText.Content
							tagName="p"
							value={attributes.description}
						/>
					</div>
					<div className="grid grid-cols-2 player-attributes">
						<div>{attributes.attr1}</div>
						<div>{attributes.val1}</div>
						<div>{attributes.attr2}</div>
						<div>{attributes.val2}</div>
						<div>{attributes.attr3}</div>
						<div>{attributes.val3}</div>
					</div>
				</div>

				<div className="basis-full"></div>

				<div
					className={"player-name inline-block text-5xl lg:text-5xl px-4 py-4 " + (attributes.right ? "" : "")}>
					{attributes.name}
				</div>

				<div className="basis-full"></div>

			</div>
		</div>
	);
}
