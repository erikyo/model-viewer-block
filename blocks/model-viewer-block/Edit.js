import { __ } from "@wordpress/i18n";
import React, { useState } from 'react';
import {DropZone} from '@wordpress/components';
import './editor.scss';
import {
	useBlockProps,
	ColorPalette,
	InspectorControls,
	MediaUpload,
  AlignmentControl
} from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';
import { settings, upload } from '@wordpress/icons';

import ModelViewerEdit from './components/ModelViewerEdit';

export default function Edit({ attributes, setAttributes, isSelected }) {

	const onChangeBGColor = ( hexColor ) => {
		setAttributes( { bg_color: hexColor } );
	};

	const onChangeBlockHeight = ( height ) => {
		setAttributes( { bl_height: parseInt(height, 10) } );
	};

	const onImageSelect = (imageObject) => {
		setAttributes({ modelViewerSrc: null })
		setAttributes({ modelViewerSrc: imageObject.url })
	};

	const onChangePlacement = (arPlacementValue) => {
		setAttributes({arPlacement: arPlacementValue })
	};

  const onChangePanSetting = (panSetting) => {
    setAttributes({arEnablePan: panSetting})
  }

  const onChangeCamControlsSetting = (camSetting) => {
    setAttributes({arCameraControls: camSetting})
  }

  const onChangeAutoRotateSetting = (autoRotateSetting) => {
    setAttributes({arAutoRotate: autoRotateSetting})
  }

	const setDeviceTarget = (target) => {
		setAttributes({arMode: target})
	}

  const onChangeZoom = (arCameraZoomValue) => {
    setAttributes({ arCameraZoom: arCameraZoomValue })
  }

	const { mediaUpload } = wp.editor;

	const ALLOWED_MEDIA_TYPES = [ 'model/gltf-binary',  'application/octet-stream' ];

	const MyDropZone = () => {
		const [ hasDropped, setHasDropped ] = useState( false );

		return (
			<div>
				{ hasDropped ? 'Dropped!' : 'Drop a glb here or' }
				<DropZone
					onFilesDrop={( files ) => mediaUpload( {
						allowedTypes: ALLOWED_MEDIA_TYPES,
						filesList: files,
						onFileChange: ( [ images ] ) => {
							onImageSelect(images);
						}
					} )}
				/>
			</div>
		);
	}

	return (
		<div {
      ...useBlockProps()
    }>
			<InspectorControls key="setting">
				<Panel header="Settings">
				<PanelBody title="GLB Object" icon={ upload } initialOpen={ true }>
					<PanelRow>
						<span>select a glb file from your media library to render an object in the canvas:</span>
					</PanelRow>
					<PanelRow>
						<MediaUpload
							onSelect={(imageObject) => onImageSelect(imageObject)}
							type="image"
							label="GLB File"
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={attributes.modelViewerSrc}
							render={({ open }) => (
                <>
								<button onClick={open}>
										{
											attributes.modelViewerSrc
												? 'Replace Object'
												: 'Select Object'
										}
								</button>
                <p>{attributes.modelViewerSrc}</p>
                </>
							)}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title="Scene Settings" icon={ settings } initialOpen={ true }>
				<PanelRow>
					<b>Ar Settings:</b>
				</PanelRow>
				<PanelRow>
						<SelectControl
							label="Device Target"
							value={ attributes.arMode }
							options={ [
									{ label: 'WebXR', value: 'webxr scene-viewer quick-look' },
									{ label: 'Scene viewer', value: 'scene-viewer quick-look' },
									{ label: 'Quick Look', value: 'quick-look' },
							] }
							onChange={ ( target ) => setDeviceTarget( target ) }
					/>
				</PanelRow>
        { attributes.arMode === 'webxr scene-viewer quick-look' ?
          <PanelRow>
            <SelectControl
              label="AR placement"
              value={attributes.arPlacement}
              options={[
                {label: 'floor', value: 'floor'},
                {label: 'Wall', value: 'wall'}
              ]}
              onChange={(target) => onChangePlacement(target)}
            />
          </PanelRow> : null
        }

        <PanelRow>
          <b>VR Settings:</b>
        </PanelRow>
          <PanelRow>
            <span>Set a background color:</span>
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Height"
              value={attributes.bl_height}
              min={ 50 }
              max={ 2000 }
              onChange={onChangeBlockHeight}
            />
          </PanelRow>
          <PanelRow>
            <ColorPalette label="Background Color" onChange={ onChangeBGColor }/>
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label="Enable Pan"
              help={
                attributes.arEnablePan
                  ? 'Enables pan'
                  : 'Disables pan'
              }
              checked={ attributes.arEnablePan }
              onChange={ (e) => {
                onChangePanSetting(e);
              } }
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label="Camera Controls"
              help={
                attributes.arCameraControls
                  ? 'Enables controls via mouse/touch'
                  : 'Disables controls via mouse/touch'
              }
              checked={ attributes.arCameraControls }
              onChange={ (e) => {
                onChangeCamControlsSetting(e);
              } }
            />
          </PanelRow>
          <PanelRow>
            <ToggleControl
              label="Auto Rotation"
              help={
                attributes.arAutoRotate
                  ? 'Enables the auto-rotation of the model'
                  : 'Auto-rotation of the model disabled'
              }
              checked={ attributes.arAutoRotate }
              onChange={ (e) => {
                onChangeAutoRotateSetting(e);
              } }
            />
          </PanelRow>
				</PanelBody>
				</Panel>
			</InspectorControls>
			{isSelected ?
	  		<>
				{ attributes.modelViewerSrc ? <ModelViewerEdit
          modelViewerSrc={attributes.modelViewerSrc}
					arMode={attributes.arMode}
          arCameraControls={attributes.arCameraControls}
          arEnablePan={attributes.arEnablePan}
          arAutoRotate={attributes.arAutoRotate}
          bg_color={attributes.bg_color}
          bl_height={attributes.bl_height}
          />
				:
				( <div className="glb-preview-container">
				<MyDropZone/>

				<div>
					<span>Select a glb file to render in the canvas:</span>
				</div>
				<MediaUpload
					onSelect={(imageObject) => onImageSelect(imageObject)}
					type="image"
					allowedTypes={ ALLOWED_MEDIA_TYPES }
					value={attributes.modelViewerSrc}
					render={({ open }) => (
						<button onClick={open}>
						{
									attributes.modelViewerSrc
											? 'Replace Object'
											: 'Select Object'
							}
						</button>
					)}
				/>
				</div>)}
			</>
			: <>
	  		{ attributes.modelViewerSrc ? <ModelViewerEdit
        modelViewerSrc={attributes.modelViewerSrc}
				arMode={attributes.arMode}
        arCameraControls={attributes.arCameraControls}
        arEnablePan={attributes.arEnablePan}
        arAutoRotate={attributes.arAutoRotate}
        bg_color={attributes.bg_color}
        bl_height={attributes.bl_height}
          />
			  :
			( <div className="glb-preview-container">
				<MyDropZone/>
				<div>
					<span>Select a glb file to render in the canvas:</span>
				</div>
			<MediaUpload
				onSelect={(imageObject) => onImageSelect(imageObject)}
				type="image"
				allowedTypes={ALLOWED_MEDIA_TYPES}
				value={attributes.modelViewerSrc}
				render={({ open }) => (
					<button onClick={open}>
						Select Object
					</button>
				)}
			/>
			</div>)}
	  		</>
			}
		</div>
	);
}
