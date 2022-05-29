import React, { Suspense, useRef, useState, useEffect } from 'react'
import '../style.scss';
import modelViewer from '@google/model-viewer'

function ModelViewerSaved(props) {
  if(props.modelViewerSrc){
    const [modelViewerSrc, setmodelViewerSrc] = useState(props.modelViewerSrc);

    useEffect(() => {
      setTimeout(() => setmodelViewerSrc(props.modelViewerSrc), 2000)
    }, []);

    return <model-viewer
      alt={""}
      src={modelViewerSrc}
      ar={""}
      ar-modes={props.arMode}
      camera-controls={props.arCameraControls ? '' : null}
      enable-pan={props.arEnablePan ? '' : null}
      auto-rotate={props.arAutoRotate ? '' : null}
      style={{backgroundColor: props.bg_color, height: props.bl_height}}
    />
  } else {
    console.log('3d model missing or not found', props)
    return null
  }
}

export default function ModelViewerBlock(props) {
  return (
    <ModelViewerSaved
      alt={""}
      modelViewerSrc={props.modelViewerSrc}
      ar={""}
      arMode={props.arMode}
      arCameraControls={props.arCameraControls}
      arEnablePan={props.arEnablePan}
      arAutoRotate={props.arAutoRotate}
      bg_color={props.bg_color}
      bl_height={props.bl_height}
    />
  )
}
