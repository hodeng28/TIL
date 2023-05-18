import * as THREE from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

export class AsyncLoader {
    //---------------------------------------------
    static LoadTexture(url) {
        return new Promise(resolve => {
            //console.log('req tex:', url);
            new THREE.TextureLoader().load(url, resolve, undefined, function(err) { console.error('fail loading texture:', url ) });
        });
    }

    //---------------------------------------------
 
    static LoadFBX(url) {
        return new Promise( resolve => {
            //console.log('req fbx:', url);
            new FBXLoader().load(url, resolve, undefined, function(err) { console.error('fail loading fbx:', url ) });
        });
    }
   
}