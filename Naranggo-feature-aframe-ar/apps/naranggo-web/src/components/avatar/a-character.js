// 참조: A-Frame Component
// - https://aframe.io/docs/1.4.0/introduction/writing-a-component.html
import { LoadCharacter } from './CharacterLoader';
import { ModelData } from './ModelData';
import AFRAME from 'aframe';

AFRAME.registerComponent('character', {
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
      this.el.setObject3D('character', obj3d);
      console.log('Character Object:', obj3d);
    });
  },
  init: function () {
    this.load_character();
  },

  tick: function (time, timeDelta) {
    if (this.animixer) this.animixer.update(timeDelta * 0.001);
  },
  remove: function () {
    this.el.removeObject3D('character');
  }
});
