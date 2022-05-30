import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element"
import { DropZone } from "@wordpress/components"
import './editor.scss';
import {
	useBlockProps,
	ColorPalette,
	InspectorControls,
	MediaUpload,
  AlignmentControl
} from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';
import { settings, upload, captureVideo } from '@wordpress/icons';

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

	const onPosterSelect = (imageObject) => {
		setAttributes({ modelViewerPoster: null })
		setAttributes({ modelViewerPoster: imageObject.url })
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
    setAttributes({camera_autoRotate: autoRotateSetting})
  }

	const setDeviceTarget = (target) => {
		setAttributes({arMode: target})
	}

  const setProp = (target, prop) => {
    setAttributes({[prop]: target})
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
          <PanelRow>
            <MediaUpload
              onSelect={(imageObject) => onPosterSelect(imageObject)}
              type="image"
              label="Poster image"
              allowedTypes={ [ 'image/jpeg',  'image/png' ] }
              value={attributes.modelViewerPoster}
              render={({ open }) => (
                <>
                  <button onClick={open}>
                    {
                      attributes.modelViewerPoster
                        ? 'Replace Poster'
                        : 'Select Poster'
                    }
                  </button>
                  <img src={attributes.modelViewerPoster} alt={"poster preview"} style={{height: '52px', width: '52px', objectFit: 'contain'}} />
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
                {label: 'Floor', value: 'floor'},
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
                  ? 'Using the left click you will be able to move the model'
                  : 'Pan disabled'
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
        </PanelBody>
        <PanelBody title="Camera Settings" icon={ captureVideo } initialOpen={ false }>

          <PanelRow>
            <b>Camera FOV/Target</b>
          </PanelRow>
          <PanelRow>
            <RangeControl
              // TODO: custom check that allows only numbers and "auto"
              label="Camera Field of View"
              value={attributes.camera_fieldOfView}
              min={ 0 }
              max={ 180 }
              onChange={(e) => {
                setProp(e, 'camera_fieldOfView')
              }}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Camera Target X"
              value={attributes.camera_target_x}
              min={ -10 }
              step={0.1}
              max={ 10 }
              onChange={(e) => {
                setProp(e, 'camera_target_x')
              }}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Camera Target Y"
              value={attributes.camera_target_y}
              min={ -10 }
              step={0.1}
              max={ 10 }
              onChange={(e) => {
                setProp(e, 'camera_target_y')
              }}
            />
          </PanelRow>
          <PanelRow>
            <RangeControl
              label="Camera Target Z"
              value={attributes.camera_target_z}
              min={ -10 }
              step={0.1}
              max={ 10 }
              onChange={(e) => {
                setProp(e, 'camera_target_z')
              }}
            />
          </PanelRow>

          <PanelRow>
            <b>Camera Orbit</b>
          </PanelRow>
            <PanelRow>
              <ToggleControl
                label="Auto Rotation"
                help={
                  attributes.camera_autoRotate
                    ? 'Auto-rotation of the model enabled'
                    : 'Auto-rotation of the model disabled'
                }
                checked={attributes.camera_autoRotate}
                onChange={(e) => {
                  onChangeAutoRotateSetting(e);
                }}
              />
            </PanelRow>
            { attributes.camera_autoRotate ?
              <>
                <PanelRow>
                  <RangeControl
                    label="Camera Orbit Speed (pi/n radians)"
                    value={attributes.camera_orbit_speed}
                    min={0}
                    step={0.1}
                    max={360}
                    onChange={(e) => {
                      setProp(e, 'camera_orbit_speed')
                    }}
                  />
                </PanelRow>
              </>
              : null }

              <PanelRow>
                <p>You can control the azimuthal, theta, and polar, phi, angles (phi is measured down from the top), and the radius from the center of the model.</p>
              </PanelRow>
              <PanelRow>
                <RangeControl
                  label="Camera Orbit Theta"
                  value={attributes.camera_orbit_theta}
                  min={-360}
                  max={360}
                  onChange={(e) => {
                    setProp(e, 'camera_orbit_theta')
                  }}
                />
              </PanelRow>
              <PanelRow>
                <RangeControl
                label="Camera Orbit Phi"
                value={attributes.camera_orbit_phi}
                min={0}
                max={180}
                onChange={(e) => {
                  setProp(e, 'camera_orbit_phi')
                }}
                />
              </PanelRow>
              <PanelRow>
                <RangeControl
                label="Camera Orbit Radius (100% of the default distance)"
                value={attributes.camera_orbit_radius}
                min={0}
                step={0.1}
                max={360}
                onChange={(e) => {
                  setProp(e, 'camera_orbit_radius')
                }}
                />
              </PanelRow>

				</PanelBody>
				</Panel>
			</InspectorControls>
			{isSelected ?
	  		<>
				{ attributes.modelViewerSrc ? <ModelViewerEdit
          modelViewerSrc={attributes.modelViewerSrc}
          modelViewerPoster={attributes.modelViewerPoster}
          bg_color={attributes.bg_color}
          bl_height={attributes.bl_height}
          arMode={attributes.arMode}
          arCameraControls={attributes.arCameraControls}
          arEnablePan={attributes.arEnablePan}
          camera_autoRotate={attributes.camera_autoRotate}
          camera_fieldOfView={attributes.camera_fieldOfView}
          camera_target_x={attributes.camera_target_x}
          camera_target_y={attributes.camera_target_y}
          camera_target_z={attributes.camera_target_z}
          camera_orbit_speed={attributes.camera_orbit_speed}
          camera_orbit_theta={attributes.camera_orbit_theta}
          camera_orbit_phi={attributes.camera_orbit_phi}
          camera_orbit_radius={attributes.camera_orbit_radius}
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
          modelViewerPoster={attributes.modelViewerPoster}
          bg_color={attributes.bg_color}
          bl_height={attributes.bl_height}
          arMode={attributes.arMode}
          arCameraControls={attributes.arCameraControls}
          arEnablePan={attributes.arEnablePan}
          camera_autoRotate={attributes.camera_autoRotate}
          camera_fieldOfView={attributes.camera_fieldOfView}
          camera_target_x={attributes.camera_target_x}
          camera_target_y={attributes.camera_target_y}
          camera_target_z={attributes.camera_target_z}
          camera_orbit_speed={attributes.camera_orbit_speed}
          camera_orbit_theta={attributes.camera_orbit_theta}
          camera_orbit_phi={attributes.camera_orbit_phi}
          camera_orbit_radius={attributes.camera_orbit_radius}
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
