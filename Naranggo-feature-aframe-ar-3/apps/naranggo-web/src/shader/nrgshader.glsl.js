const NrgShader = {
    vrtxShdrBasic: /* glsl */`
        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
            vUv = uv;
            vNormal = normal;
        
            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        
        }`,

	vrtxShdrSkinning: /* glsl */`
        //#include <common>
        #include <skinning_pars_vertex>
        varying vec2 vUv;
        varying vec3 vNormal;

        void main() {
            vUv = uv;
            vNormal = normal;

            #include <skinbase_vertex>
            #include <begin_vertex>
            #include <skinning_vertex>
            #include <project_vertex>
        }`,

    fragShdrAlpha: /* glsl */`
        uniform sampler2D mapBase;
        uniform sampler2D mapMask;
        uniform vec3 colSkin;
        uniform vec3 colCloth;
        uniform vec3 colDLight;
        uniform vec3 dirDLight;
        uniform vec3 colALight;

        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
            vec4 mainColor = texture2D( mapBase, vUv );
            vec4 mask = texture2D( mapMask, vUv);
            float g = dot(mainColor.rgb, vec3(0.299, 0.587, 0.114));
            vec3 grayColor = vec3(g, g, g);
            vec3 finalColor = (mainColor.rgb * (1.0 - mask.r - mask.g)) + (grayColor * mask.r * colSkin) + (grayColor * mask.g * colCloth);
                    
            vec3 norm = normalize(vNormal);
        
            float nDotL = clamp(dot(-dirDLight, norm), 0.0, 1.0);
            gl_FragColor = vec4(finalColor * (colALight + colDLight * nDotL), mask.b);
        }`,
    fragShdrSkin: /* glsl */`
        uniform sampler2D mapBase;
        uniform sampler2D mapMask;
        uniform vec3 colSkin;
        uniform vec3 colCloth;
        uniform vec3 colDLight;
        uniform vec3 dirDLight;
        uniform vec3 colALight;

        varying vec2 vUv;
        varying vec3 vNormal;
        
        void main() {
            vec4 mainColor = texture2D( mapBase, vUv );
            vec4 mask = texture2D( mapMask, vUv);
            float gray = dot(mainColor.rgb, vec3(0.299, 0.587, 0.114));
            vec3 finalColor = (mainColor.rgb * (1.0 - mask.r - mask.g)) + (colSkin * gray * mask.r) + (colCloth * gray * mask.g);
                    
            vec3 norm = normalize(vNormal);
        
            float nDotL = clamp(dot(-dirDLight, norm), 0.0, 1.0);
            gl_FragColor = vec4(finalColor * (colALight + colDLight * nDotL), 1.0);
        }`
}

export { NrgShader };