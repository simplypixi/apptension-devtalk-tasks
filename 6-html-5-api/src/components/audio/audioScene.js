import React from 'react';
import * as THREE from 'three';
import {find} from 'lodash';

import fragmentShader from '../../assets/shaders/fragment/audio.frag';
import vertexShader from '../../assets/shaders/vertex/audio.vert';

const updateIndices = (mesh, soundData) => {
  if (!soundData) {
    return;
  }

  mesh.geometry.vertices.forEach((vertex, index) => {
    vertex.x = 100 * soundData[index];
    vertex.y = 100 * soundData[index * 2];
    vertex.z = 100 * soundData[index *3];
  });

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

    //BACKGROUND MESH
    const bgGeometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    const bgMaterial = new THREE.MeshPhongMaterial({color: 0xE78CBE});
    const plane = new THREE.Mesh( bgGeometry, bgMaterial );
    plane.position.set(0, 0, 0);
    plane.receiveShadow = true;

    this.scene.add( plane );

    //CUSTOM MESH
    this.geometry = new THREE.IcosahedronGeometry( 20, 5 );
    //this.material = new THREE.MeshPhongMaterial({color: 0xE78CBE});
    this.material = new THREE.ShaderMaterial({
      uniforms: {
        time: {type: 'f', value: 0.0}//,
        //color: {type: ''}
      },
      attributes: {
        displacement: {
          type: 'f',
          value: []
        }
      },
      vertexShader,
      fragmentShader
    });

    this.mesh = new THREE.Mesh( this.geometry,this.material );
    this.mesh.position.set(0, 0, 20);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;
    this.mesh.geometry.dynamic = true;
    this.scene.add(this.mesh);

    //LIGHTS
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.9, 100);
    directionalLight.position.set(0, 0, 150);
    directionalLight.castShadow = true;
    this.scene.add( directionalLight );
    directionalLight.shadow.camera.near = this.camera.near;
    directionalLight.shadow.camera.far = this.camera.far;

    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.start = Date.now();
    this.animate();
  }



  animate() {
    this.requestId = requestAnimationFrame(this.animate);

/*    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;*/
    this.material.uniforms[ 'time' ].value = .00025 * ( Date.now() - this.start );
    //updateIndices(this.mesh, this.props.soundData);
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
