import '../style.scss';
import modelViewer from '@google/model-viewer'
import { useRef, useState, createElement } from "@wordpress/element";
import icon from "../../../assets/images/ar.svg"

function ModelViewerSaved(props) {

  if(props.modelViewerSrc){

    const modelRef = useRef();

    const [progress, setProgress] = useState(0);
    const [arCapable, setArCapable] = useState(0);
    const [annots, setAnnots] = useState([]);

    const handleClick = (event) => {
      const { clientX, clientY } = event;

      if (modelRef.current) {
        let hit = modelRef.current.positionAndNormalFromPoint(clientX, clientY);
        if (hit) {
          setAnnots((annots) => {
            return [...annots, hit];
          });
        }
      }
    };

    const getDataPosition = (annot) => {
      return `${annot.position.x} ${annot.position.y} ${annot.position.z}`;
    };

    const getDataNormal = (annot) => {
      return `${annot.normal.x} ${annot.normal.y} ${annot.normal.z}`;
    };

    const Progress = ({ progress }) => (
      <div
        className={progress === 1 ? 'progress-bar hide' : 'progress-bar'}
        slot="progress-bar">
        <progress
          max={100}
          value={progress * 100}
        />
      </div>
    );

    const ArButton = () => (
      <button
        slot="ar-button"
        className={arCapable ? "ar-button has-background" : "ar-button hide"}
        onClick={() => handleAR}
      ><img src={icon} alt={"model viewer AR icon"}/></button>
    );

    const handleAR = (e) => {
      if (arCapable) {
        e.activateAR()
      } else {
        console.log('This device is unable to start an AR session');
      }
    }

    const handleProgress = (event) => {
      setProgress(event.nativeEvent.detail.totalProgress)
      if (event.nativeEvent.detail.totalProgress === 1) {
        onLoadedEnableAR(event.nativeEvent.target)
      } else {
        console.log(event.nativeEvent.detail.totalProgress);
      }
    }

    const onLoadedEnableAR = (target) => {
      console.log("model-viewer ready 🎉");
      target.status = 'session-started';
      target.dismissPoster();
      if (target.canActivateAR) {
        setArCapable(1)
      }
    }

    const logModelError = errorMessage => {
      const errorContainer = document.querySelector("#model-error-wrap");
      if (!errorContainer) return;
      errorContainer.classList.remove('hide');
      errorContainer.querySelector("#error-message").innerHTML = errorMessage;
    }

    const LogErrors = event => {
      console.log(event);
      if(event.nativeEvent.detail.status === 'failed'){
        logModelError("An error occurred activating VR, please check your browser permissions then clean cookies!<br/>To verify that the device is correctly configured to run WebXR, browse to <a href=\"https://immersive-web.github.io/webxr-samples/immersive-ar-session.html\">a sample WebXR page</a> in <a href=\"https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API#browser_compatibility\">a compatible browser</a>.");
      }
    }

    let modelViewerEl = createElement("model-viewer", {
      alt:"",
      src:props.modelViewerSrc,
      poster:props.modelViewerPoster || null,
      ar:"",
      "ar-modes":props.arMode,
      "camera-controls":props.arCameraControls ? '' : null,
      "enable-pan":props.arEnablePan ? '' : null,
      "auto-rotate":props.camera_autoRotate ? '' : null,
      "rotation-per-second": props.camera_orbit_speed + "deg",
      "field-of-view": props.camera_fieldOfView ? props.camera_fieldOfView + "deg" : "auto",
      "min-field-of-view":'10deg',
      "max-field-of-view":'180deg',
      "max-camera-orbit":`-Infinity 180deg ${props.camera_orbit_radius}%`,
      "camera-orbit":`${props.camera_orbit_theta}deg ${props.camera_orbit_phi}deg ${props.camera_orbit_radius}%`,
      "camera-target":(props.camera_target_x || props.camera_target_y || props.camera_target_z) ? `${props.camera_target_x}m ${props.camera_target_y}m ${props.camera_target_z}m` : null,
      style:{backgroundColor: props.bg_color, height: props.bl_height},
      onProgressCapture: (ev) => handleProgress(ev),
      onError: LogErrors,
      // onClick: handleClick,
      ref : (ref) => modelRef.current = ref,
    }, (<>
        {annots.map((annot, idx) => (
          <span
            key={`hotspot-${idx}`}
            className="annotation"
            slot={`hotspot-${idx}`}
            data-position={getDataPosition(annot)}
            data-normal={getDataNormal(annot)}
          ></span>
        ))}
        <div className={'model-error-wrap'}></div>
        <ArButton />
        <Progress progress={progress} />
      </>)
    );

    return modelViewerEl;
  } else {
    console.log('3d model missing or not found', props)
    return null
  }
}

export default function ModelViewerBlock(props) {
  return (
    <>
      <ModelViewerSaved
        alt={""}
        modelViewerSrc={props.modelViewerSrc}
        modelViewerPoster={props.modelViewerPoster}
        ar={""}
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
    </>
  )
}
