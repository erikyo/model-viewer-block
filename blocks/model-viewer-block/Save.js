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
          ar={""}
          ar-modes={attributes.arMode}
          camera-controls={attributes.arCameraControls ? '' : null}
          enable-pan={attributes.arEnablePan ? '' : null}
          auto-rotate={attributes.arAutoRotate ? '' : null}
          style={{backgroundColor: attributes.bg_color, height: attributes.bl_height}}
        />
      </div>
    </>
  </div>);
}
