
varying vec2 vUv;
varying float noise;
varying vec3 vNormal;

float random( vec3 scale, float seed ){
  return fract( sin( dot( gl_FragCoord.xyz + seed, scale ) ) * 43758.5453 + seed ) ;
}

void main() {
  vec3 light = vec3(0.0, 0.0, 150.0);
  light = normalize(light);
  float dProd = max(0.0, dot(vNormal, light));


  float r = .01 * random( vec3( 12.9898, 78.233, 151.7182 ), 0.0 );
  vec2 tPos = vec2( 0, 1.0 - 1.3 * noise + r );
  vec3 color = vec3(0.5, 0.3, 1);
  gl_FragColor = vec4(Lerp(color, vec3(dProd, dProd, dProd)), 1.0 );

}
    
