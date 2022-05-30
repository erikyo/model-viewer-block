import { render } from "@wordpress/element";

import ModelViewerBlock from "./components/ModelViewerBlock";

const modelViewerBlock = document.querySelectorAll(
  ".model-viewer-app"
);

if ( modelViewerBlock ){
  modelViewerBlock.forEach(block => {
    const modelData = JSON.parse(block.dataset.modelviewer)

    render(
      <ModelViewerBlock
        alt={""}
        modelViewerSrc={modelData.modelViewerSrc}
        modelViewerPoster={modelData.modelViewerPoster}
        bg_color={modelData.bg_color}
        bl_height={modelData.bl_height}
        arMode={modelData.arMode}
        arCameraControls={modelData.arCameraControls}
        arEnablePan={modelData.arEnablePan}
        camera_autoRotate={modelData.camera_autoRotate}
        camera_fieldOfView={modelData.camera_fieldOfView}
        camera_target_x={modelData.camera_target_x}
        camera_target_y={modelData.camera_target_y}
        camera_target_z={modelData.camera_target_z}
        camera_orbit_speed={modelData.camera_orbit_speed}
        camera_orbit_theta={modelData.camera_orbit_theta}
        camera_orbit_phi={modelData.camera_orbit_phi}
        camera_orbit_radius={modelData.camera_orbit_radius}
      />,
      block
    );
  })

}
