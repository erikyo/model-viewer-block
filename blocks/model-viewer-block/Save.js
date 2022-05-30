import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import React from "react";

export default function save({ attributes }) {
  return (
  <div {...useBlockProps.save()}>
    <>
      <div className="model-viewer-app" data-modelViewer={JSON.stringify(attributes)}>
        <model-viewer
          alt={""}
          src={attributes.modelViewerSrc}
          poster={attributes.modelViewerPoster}
          ar={""}
          ar-modes={attributes.arMode}
          camera-controls={attributes.arCameraControls ? '' : null}
          enable-pan={attributes.arEnablePan ? '' : null}
          auto-rotate={attributes.camera_autoRotate ? '' : null}
          camera-orbit-speed={attributes.camera_orbit_speed + "deg"}
          min-field-of-view={'10deg'}
          max-field-of-view={'180deg'}
          field-of-view={attributes.camera_fieldOfView ? attributes.camera_fieldOfView + "deg" : "auto"}
          camera-orbit={`${attributes.camera_orbit_theta}deg ${attributes.camera_orbit_phi}deg ${attributes.camera_orbit_radius}%`}
          max-camera-orbit={`-Infinity 180deg ${attributes.camera_orbit_radius}%`}
          camera-target={`${attributes.camera_target_x}m ${attributes.camera_target_y}m ${attributes.camera_target_z}%`}
          style={{backgroundColor: attributes.bg_color, height: attributes.bl_height}}
        />
      </div>
    </>
  </div>);
}
