import React, { Suspense, useRef, useState, useEffect } from 'react';

function ModelViewerObject(props) {
    if(props.modelViewerSrc){

        const [url, set] = useState(props.modelViewerSrc);

        useEffect(() => {
            setTimeout(() => set(props.modelViewerSrc), 2000)
        }, []);

        return <model-viewer
          alt={""}
          src={url}
          ar={""}
          ar-modes={props.arMode}
          camera-controls={props.arCameraControls ? "" : null}
          enable-pan={props.arEnablePan ? "" : null}
          auto-rotate={props.arAutoRotate ? "" : null}
          style={{backgroundColor: props.bg_color, height: props.bl_height}}
        />
    } else {
      console.log(props);
      return null
    }
}


export default function ModelViewerEdit(props) {
  return (
      <ModelViewerObject
        alt={""}
        modelViewerSrc={props.modelViewerSrc}
        arMode={props.arMode}
        arCameraControls={props.arCameraControls}
        arEnablePan={props.arEnablePan}
        arAutoRotate={props.arAutoRotate}
        bg_color={props.bg_color}
        bl_height={props.bl_height}
      />
    )
}
