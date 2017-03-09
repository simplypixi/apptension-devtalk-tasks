import React from 'react';
import * as THREE from 'three';

const updateIndices = (mesh, soundData) => {
  mesh.geometry.vertices[ 0 ].x = Math.random() * 1000;
  mesh.geometry.vertices[ 0 ].y = Math.random() * 1000;
  mesh.geometry.vertices[ 0 ].z = Math.random() * 1000;

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

    this.state = {
      soundData: props.soundData
    };

    this.initScene = this.initScene.bind(this);
    this.animate = this.animate.bind(this);
    this.initScene();
  }

  initScene() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    this.camera.position.z = 100;

    //MESH
    this.geometry = new THREE.SphereGeometry( 20, 64, 64 );
    this.material = new THREE.MeshPhongMaterial({color: 0xE78CBE});
    
    this.mesh = new THREE.Mesh( this.geometry,this.material );
    this.mesh.geometry.dynamic = true;
    this.mesh.geometry.__dirtyVertices = true;
    this.mesh.geometry.__dirtyNormals = true;

    //LIGHTS
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    directionalLight.position.set(100, 100, 100);

    this.scene.add( directionalLight );
    this.scene.add(this.mesh);
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.animate();
  }



  animate() {
    requestAnimationFrame(this.animate);

    //console.log(this.props.soundData);

/*    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;*/
    updateIndices(this.mesh, this.props.soundData);

    this.renderer.render(this.scene, this.camera);
  }

  componentDidMount() {
    document.body
      .getElementsByClassName('audio-scene')[0]
      .appendChild(this.renderer.domElement);
  }

  render() {
    return (
      <div className="audio-scene"></div>
    );
  }
}

export default AudioScene;
