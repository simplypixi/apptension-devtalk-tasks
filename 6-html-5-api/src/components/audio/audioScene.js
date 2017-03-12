import React from 'react';
import * as THREE from 'three';
import {find, sum} from 'lodash';

import fragmentShader from '../../assets/shaders/fragment/audio.frag';
import vertexShader from '../../assets/shaders/vertex/audio.vert';

const updateIndices = (start, mesh, soundData) => {
  mesh.material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
  if (!soundData) {
    return;
  }
  const newAverage = sum(soundData) * 100 / soundData.length;
  mesh.average = newAverage - mesh.average;
  mesh.material.uniforms['intensity'].value = mesh.average;
  mesh.geometry.computeFaceNormals();
  mesh.geometry.computeVertexNormals();
  mesh.geometry.normalsNeedUpdate = true;
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.dynamic = true;

  mesh.geometry.verticesNeedUpdate = true;
};

class AudioScene extends React.Component {
  constructor(props) {
    super(props);

    this.initScene = this.initScene.bind(this);
    this.animate = this.animate.bind(this);
    this.initScene();
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 100;

    //LIGHTS
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1, 100);
    directionalLight.position.set(0, 0, 200);
    directionalLight.castShadow = true;
    this.scene.add( directionalLight );
    directionalLight.shadow.camera.near = this.camera.near;
    directionalLight.shadow.camera.far = this.camera.far;

    //BACKGROUND MESH
    const bgGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    const bgMaterial = new THREE.MeshPhongMaterial({color: 0xF2AAD2});
    const plane = new THREE.Mesh( bgGeometry, bgMaterial );
    plane.position.set(0, 0, 0);
    plane.receiveShadow = true;

    this.scene.add( plane );

    //CUSTOM MESH
    this.geometry = new THREE.IcosahedronBufferGeometry( 20, 5 );
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: {type: 'f', value: 0.0},
        lightPosition: {type: 'v3', value: directionalLight.position},
        color: {type: 'v3', value: new THREE.Color(0xED7CBA)},
        intensity: {type: 'f', value: 0.0}
      },
      vertexShader,
      fragmentShader
    });

    this.mesh = new THREE.Mesh( this.geometry,this.material );
    this.mesh.average = 0.0;
    this.mesh.position.set(0, 0, 30);
    this.mesh.geometry.dynamic = true;
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.start = Date.now();
    this.animate();
  }



  animate() {
    this.requestId = requestAnimationFrame(this.animate);
    updateIndices(this.start, this.mesh, this.props.soundData);
    this.renderer.render(this.scene, this.camera);
  }

  componentDidMount() {
    document.body
      .getElementsByClassName('audio-scene')[0]
      .appendChild(this.renderer.domElement);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.requestId);
  }

  render() {
    return (
      <div className="audio-scene"></div>
    );
  }
}

export default AudioScene;
