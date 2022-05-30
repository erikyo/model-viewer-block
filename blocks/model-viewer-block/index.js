import { registerBlockType } from "@wordpress/blocks";
import Edit from './Edit';
import Save from './Save';
import { useBlockProps } from '@wordpress/block-editor';
import modelViewer from '@google/model-viewer'
import React from "react";

const icon = (
  <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M9.125 16.292 5.042 13.917Q4.625 13.688 4.396 13.292Q4.167 12.896 4.167 12.417V7.708Q4.167 7.229 4.396 6.833Q4.625 6.438 5.042 6.208L9.125 3.833Q9.542 3.604 10 3.604Q10.458 3.604 10.875 3.833L14.958 6.208Q15.375 6.438 15.604 6.833Q15.833 7.229 15.833 7.708V12.417Q15.833 12.896 15.604 13.292Q15.375 13.688 14.958 13.917L10.875 16.292Q10.458 16.521 10 16.521Q9.542 16.521 9.125 16.292ZM9.125 14.229V10.562L5.917 8.729V12.396Q5.917 12.396 5.917 12.396Q5.917 12.396 5.917 12.396ZM10.875 14.229 14.083 12.396Q14.083 12.396 14.083 12.396Q14.083 12.396 14.083 12.396V8.729L10.875 10.562ZM0.833 5.104V3.354Q0.833 2.312 1.573 1.573Q2.312 0.833 3.354 0.833H5.104V2.583H3.354Q3.021 2.583 2.802 2.802Q2.583 3.021 2.583 3.354V5.104ZM3.354 19.167Q2.312 19.167 1.573 18.417Q0.833 17.667 0.833 16.625V14.875H2.583V16.625Q2.583 16.958 2.802 17.188Q3.021 17.417 3.354 17.417H5.104V19.167ZM14.896 19.167V17.417H16.646Q16.979 17.417 17.198 17.198Q17.417 16.979 17.417 16.646V14.896H19.167V16.646Q19.167 17.688 18.427 18.427Q17.688 19.167 16.646 19.167ZM17.417 5.104V3.354Q17.417 3.021 17.198 2.802Q16.979 2.583 16.646 2.583H14.896V0.833H16.646Q17.688 0.833 18.427 1.573Q19.167 2.312 19.167 3.354V5.104ZM10 9.042 13.208 7.208 10 5.354Q10 5.354 10 5.354Q10 5.354 10 5.354L6.792 7.208ZM10 10.562ZM10 9.042ZM10.875 10.562ZM9.125 10.562Z"/></svg>
);

const blockConfig = require('./block.json');
registerBlockType(blockConfig.name, {
    ...blockConfig,
    icon: icon,
    apiVersion: 2,
    edit: Edit,
    save: Save,
    supports: {
      align: ['wide', 'full']
    },
    deprecated: [
        {
        attributes: {
              modelViewerSrc: {
                  type: "string",
                  default: null
              },
              modelViewerPoster: {
                type: "string",
                default: null
              },
              bg_color: {
                type: "string",
                default: "transparent"
              },
              bl_height: {
                type: "number",
                default: 500
              },
                arMode: {
                    type: "string",
                    default: "webxr"
                },
                arEnablePan: {
                  type: "bool",
                  default: "true"
                },
                arCameraControls: {
                  type: "bool",
                  default: "true"
                },

                camera_fieldOfView: {
                  type: "number",
                  default: 0
                },
                camera_autoRotate: {
                  type: "boolean",
                  default: false
                },
                camera_orbit_speed: {
                  type: "number",
                  default: 32
                },
                camera_orbit_theta: {
                  type: "number",
                  default: 0
                },
                camera_orbit_phi: {
                  type: "number",
                  default: 75
                },
                camera_orbit_radius: {
                  type: "number",
                  default: 105
                },

                camera_target_x: {
                  type: "number",
                  default: 0
                },
                camera_target_y: {
                  type: "number",
                  default: 0
                },
                camera_target_z: {
                  type: "number",
                  default: 0
                }
            },
            save( props ) {
                return (
                    <div {...useBlockProps.save()}>
                        <model-viewer
                          alt={""}
                          src={props.modelViewerSrc}
                          poster={props.modelViewerPoster}
                          ar={""}
                          ar-modes={props.modelViewerSrc}
                          camera-controls={props.arCameraControls ? "" : null}
                          enable-pan={props.arEnablePan ? "" : null}
                          auto-rotate={props.camera_autoRotate ? "" : null}
                          rotation-per-second={props.camera_orbit_speed + "deg"}
                          min-field-of-view={'10deg'}
                          max-field-of-view={'180deg'}
                          field-of-view={props.camera_fieldOfView ? props.camera_fieldOfView + "deg" : "auto"}
                          camera-orbit={`${props.camera_orbit_theta}deg ${props.camera_orbit_phi}deg ${props.camera_orbit_radius}%`}
                          max-camera-orbit={`-Infinity 22.5deg ${props.camera_orbit_radius}%`}
                          camera-target={`${props.camera_target_x}m ${props.camera_target_y}m ${props.camera_target_z}m`}
                          style={{backgroundColor: props.bg_color, height: props.bl_height}}
                        />
                    </div>)
            },
        }
    ]
});
