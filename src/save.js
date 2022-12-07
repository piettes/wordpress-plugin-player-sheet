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

	return (
		<div {...useBlockProps.save()} >

			<div className="grid lg:grid-cols-2 gap-2">


				<div className={"player-name-image " + (attributes.right ? "lg:order-last" : "")}>
					<div>
						<img className="player-image" src={attributes.mediaUrl}/>
					</div>
					<div className="player-name inline-block text-5xl lg:text-5xl px-4 py-4">
						Body
						Bab
					</div>
				</div>

				<div className={"flex flex-col justify-center player-info"}>

					<div className="player-description">
						Grosse description avec un super text de la mort qui tue. Et après on est content et on va jouer
						aux
						billes
					</div>
					<div className="grid grid-cols-2 player-attributes">
						<div>Taille</div>
						<div>1400 mm</div>
						<div>Ville de naissance</div>
						<div>Loutreville</div>
						<div>🇩🇪🇬🇧🇫🇷🇨🇦</div>
					</div>
				</div>

				{/*<div>*/}
				{/*	<div>*/}
				{/*		<img className="player-image" src={attributes.mediaUrl}/>*/}
				{/*	</div>*/}
				{/*	<h2>{attributes.name}</h2>*/}
				{/*</div>*/}

				{/*<div>*/}

				{/*	<RichText.Content*/}
				{/*		tagName="p"*/}
				{/*		value={attributes.description}*/}
				{/*	/>*/}
				{/*</div>*/}
				{/*<div>*/}
				{/*	<div>{attributes.attr1}</div>*/}
				{/*	<div>{attributes.val1}</div>*/}
				{/*	<div>{attributes.attr2}</div>*/}
				{/*	<div>{attributes.val2}</div>*/}
				{/*	<div>{attributes.attr3}</div>*/}
				{/*	<div>{attributes.val3}</div>*/}
				{/*</div>*/}


			</div>
		</div>
	);
}
