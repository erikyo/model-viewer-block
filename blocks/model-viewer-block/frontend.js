const { Component, render } = wp.element;

import ModelViewerBlock from "./components/ModelViewerBlock";

const modelViewerBlock = document.querySelectorAll(
  ".model-viewer-app"
);

if ( modelViewerBlock ){
  modelViewerBlock.forEach(block => {
    const modelData = JSON.parse(block.dataset.modelviewer)

    render(
      <ModelViewerBlock
        modelViewerSrc={modelData.modelViewerSrc}
        arMode={modelData.arMode}
        arEnablePan={modelData.arEnablePan}
        arCameraControls={modelData.arCameraControls}
        arAutoRotate={modelData.arAutoRotate}
        bg_color={modelData.bg_color}
        bl_height={modelData.bl_height}
      />,
      block
    );
  })

}
