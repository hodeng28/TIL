//! https://aframe.io/docs/1.4.0/introduction/writing-a-component.html
import { LoadCharacter } from './CharacterLoader';
import { ModelData } from './ModelData';

AFRAME.registerComponent('character-gps', {
  schema: {
    type: 'string',
    default: ''
  },
  load_character: function () {
    const omodel = JSON.parse(this.data);
    const cmodel = new ModelData(omodel);
    LoadCharacter(omodel, cmodel).then((r) => {
      const obj3d = new THREE.Object3D();
      obj3d.add(r.o3d);
      obj3d.add(r.skl);
      this.animixer = new THREE.AnimationMixer(r.o3d);
      this.animixer.clipAction(r.o3d.animations[0]).play();
      this.el.setObject3D('character-gps', obj3d);
      //console.log("done. load_character");
    });
  },
  test_create_gps_position: function () {
    const el_gpscam = document.querySelector('[gps-new-camera]');
    let testEntityAdded = false;
    el_gpscam.addEventListener('gps-camera-update-position', (e) => {
      if (!testEntityAdded) {
        console.log(
          `Update GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`
        );

        //-! test
        // this.el.setAttribute('gps-new-entity-place', {
        //     latitude: e.detail.position.latitude + 0.00002,
        //     longitude: e.detail.position.longitude - 0.00001
        // });

        testEntityAdded = true;
        console.log('init 3d model gps position:', this.el.sceneEl.object3D);
      }
      console.log('gps-camera-update-position callback', e.detail.position);
    });
  },
  init: function () {
    this.load_character();
    console.log('init load', this.el);
    //this.test_create_gps_position();
    //console.log("exit init", this.el);
  },

  tick: function (time, timeDelta) {
    if (this.animixer) this.animixer.update(timeDelta * 0.001);
  },
  remove: function () {
    this.el.removeObject3D('character-gps');
  }
});
