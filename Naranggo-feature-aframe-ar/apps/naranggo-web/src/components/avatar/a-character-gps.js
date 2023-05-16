//! https://aframe.io/docs/1.4.0/introduction/writing-a-component.html
import { LoadCharacter } from "./CharacterLoader";
import { ModelData } from "./ModelData";

AFRAME.registerComponent('character-gps', {
    schema: {
        type: 'string', default: ''
    },
    load_character: function() {
        const omodel = JSON.parse(this.data);
        const cmodel = new ModelData(omodel);
        LoadCharacter(omodel, cmodel).then(r => {
            const obj3d = new THREE.Object3D();
            obj3d.add(r.o3d);
            obj3d.add(r.skl);
            this.animixer = new THREE.AnimationMixer(r.o3d);
            this.animixer.clipAction(r.o3d.animations[0]).play();
            this.el.setObject3D('character-gps', obj3d);
            //-!this.el.setAttribute('gps-new-entity-place', { longitude: 127.1220, latitude: 37.4950 });
        });
    },
    test_create_gps_position: function() {
        const el = document.querySelector("[gps-new-camera]");
        let testEntityAdded = false;
        el.addEventListener("gps-camera-update-position", e => {
            if(!testEntityAdded) {
                console.log(`Update GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
                //-! test 
                this.el.setAttribute('gps-new-entity-place', {
                    latitude: e.detail.position.latitude + 0.00002,
                    longitude: e.detail.position.longitude - 0.00001
                });

                testEntityAdded = true;
            }
            console.log('scene:', this.el.sceneEl.object3D);
        });
    },
    init: function () {
        this.load_character();
        console.log(this.el);
        this.test_create_gps_position();
    },

    tick: function (time, timeDelta) {
        if(this.animixer) this.animixer.update(timeDelta*0.001);
    }, 
    remove: function () {
        this.el.removeObject3D('character-gps');
    }
});
