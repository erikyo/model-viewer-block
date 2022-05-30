import { useState, useEffect } from "@wordpress/element"

function ModelViewerObject(props) {
    if(props.modelViewerSrc){

        const [url, set] = useState(props.modelViewerSrc);

        useEffect(() => {
            setTimeout(() => set(props.modelViewerSrc), 2000)
        }, []);

        return <model-viewer
          alt={""}
          src={url}
          poster={props.modelViewerPoster}
          ar={""}
          // ar-modes={props.arMode}
          // camera-controls={props.arCameraControls ? "" : null}
          // enable-pan={props.arEnablePan ? "" : null}
          auto-rotate={props.camera_autoRotate ? "" : null}
          rotation-per-second={props.camera_orbit_speed + "deg"}
          min-field-of-view={'10deg'}
          max-field-of-view={'180deg'}
          field-of-view={props.camera_fieldOfView ? props.camera_fieldOfView + "deg" : "auto"}
          camera-orbit={`${props.camera_orbit_theta}deg ${props.camera_orbit_phi}deg ${props.camera_orbit_radius}%`}
          max-camera-orbit={`-Infinity 180deg ${props.camera_orbit_radius}%`}
          camera-target={(props.camera_target_x || props.camera_target_y || props.camera_target_z) ? `${props.camera_target_x}m ${props.camera_target_y}m ${props.camera_target_z}m` : null}
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
        modelViewerPoster={props.modelViewerPoster}
        bg_color={props.bg_color}
        bl_height={props.bl_height}
        arMode={props.arMode}
        arCameraControls={props.arCameraControls}
        arEnablePan={props.arEnablePan}
        camera_autoRotate={props.camera_autoRotate}
        camera_fieldOfView={props.camera_fieldOfView}
        camera_target_x={props.camera_target_x}
        camera_target_y={props.camera_target_y}
        camera_target_z={props.camera_target_z}
        camera_orbit_speed={props.camera_orbit_speed}
        camera_orbit_theta={props.camera_orbit_theta}
        camera_orbit_phi={props.camera_orbit_phi}
        camera_orbit_radius={props.camera_orbit_radius}
      />
    )
}
