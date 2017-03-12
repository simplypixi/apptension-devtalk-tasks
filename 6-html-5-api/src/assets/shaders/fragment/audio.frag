varying vec3 vNormal;
uniform vec3 color;
uniform vec3 lightPosition;


void main() {
  float dProd = max(0.0, dot(vNormal, normalize(lightPosition))) * 0.5 + 0.5;

  gl_FragColor = vec4(vec3(dProd) *  vec3(color), 1.0 );

}
    
