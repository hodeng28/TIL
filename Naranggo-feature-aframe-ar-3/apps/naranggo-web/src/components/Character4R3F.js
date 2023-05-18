import React, { useEffect, useState } from "react";
import { useFrame } from '@react-three/fiber';
import * as THREE from "three";
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { LoadCharacter } from "./avatar/CharacterLoader.js";
import { PartsTable } from "./avatar/PartsTable.js";
import { ModelData } from "./avatar/ModelData.js";
//import { TestLoad } from "./avatar/TestLoad.js";

let animMixers = [];
let skelHelper;

//-----------------------------------



function Character4R3F(props) {

  //-----------------------------------
  function init_dbg_gui(rCModel) {
    console.log('dbgprint: rCModel', rCModel);
    //---------------------------------
    PartsTable.edit_feature_id = function(idx) {
      if(this.features && idx < this.features.length) {
        const minval = this.name == 'sets' ? -1 : 0;
        if(idx >= minval) {
          this.robj.id = idx;
          setAvatar( {...rjsonModel} );
        }
      }
    }
    PartsTable.edit_nose_id = function(idx) {
      if(idx >= 0 && idx < 5) {
        this.robj.id = idx;
        setAvatar( {...rjsonModel} );
      }
    }
    //---------------------------------
    PartsTable.edit_color_id = function(idx) {
      if(this.colors && idx >= 0 && idx < this.colors.length) {
        this.robj.colorId = idx;
      }
      setAvatar( {...rjsonModel} );
    }
    //---------------------------------
    PartsTable.edit_skin_id = function(idx) {
      if(this.colors && idx >= 0 && idx < this.colors.length) {
        this.robj.id = idx;
      }
      setAvatar( {...rjsonModel} );
    }

    //-----------------------------------
    const menu = new GUI( { width: 210 } )

    menu.add(rCModel, 'show_skeleton').name('show skeleton').onChange( visb => rCModel.show_skeleton = skelHelper.visible = visb );
    menu.add(rCModel.sets.robj, 'id', -1, rCModel.sets.features.length - 1, 1).name('set id').onChange( val => rCModel.sets.edit_feature_id(val) );
    menu.add(rCModel.skin.robj, 'id', 0, rCModel.skin.colors.length - 1, 1).name('skin color').onChange( val => rCModel.skin.edit_skin_id(val) );

    let tmp_folder;
    // body parts -> top, bottom, shoes, last head
    const body_folder = menu.addFolder('body parts');
    for(let i = 0; i < 3; ++i) {
      const parts = rCModel.parts[i];
      tmp_folder = body_folder.addFolder(parts.name);
      tmp_folder.add(parts.robj, 'id', 0, parts.features.length - 1, 1).name('model id').onChange( val => parts.edit_feature_id(val) );
      tmp_folder.add(parts.robj, 'colorId', 0, parts.colors.length - 1, 1).name('color id').onChange( val => parts.edit_color_id(val) );
    }
    // head parts
    const head_folder = menu.addFolder('head parts');
    {
      const parts = rCModel.head;
      // 예외 상황 .. features 인덱스 사용하지 않음. head 5개 x nose 5개 조합.
      head_folder.add(rCModel.head.robj, 'id', 0, 4, 1).name('model id').onChange( val => rCModel.head.edit_feature_id(val) );
      head_folder.add(rCModel.nose.robj, 'id', 0, 4, 1).name('nose id').onChange( val => rCModel.nose.edit_nose_id(val) );
      head_folder.add(rCModel.skin.robj, 'id', 0, rCModel.head.colors.length - 1, 1).name('color id').onChange( val => rCModel.skin.edit_color_id(val) );
    }
    for(let i = 4; i < rCModel.parts.length; ++i) {
      const parts = rCModel.parts[i];
      tmp_folder = head_folder.addFolder(parts.name);
      tmp_folder.add(parts.robj, 'id', 0, parts.features.length - 1, 1).name('model id').onChange( val => parts.edit_feature_id(val) );
      tmp_folder.add(parts.robj, 'colorId', 0, parts.colors.length - 1, 1).name('color id').onChange( val => parts.edit_color_id(val) );
    }
  }

  //-----------------------------------
  const rjsonModel = props.json_model;

  const [avatar, setAvatar] = useState(); // avatar json data
  const [char3d, setChar3D] = useState(); // avatar 3d char
  const [cmodel, setCModel] = useState(); // class avatar data model

  useEffect(() => {
    if(!cmodel) {
      setAvatar(rjsonModel);
      const cm = new ModelData(rjsonModel);
      //init_dbg_gui(cm);
      setCModel(cm);
    } else {
      const loadata = cmodel.create_load_data();
      LoadCharacter(rjsonModel, cmodel).then(r => {
        const group = new THREE.Group();
        group.add(r.o3d);
        group.add(r.skl);
        const animixer = new THREE.AnimationMixer(r.o3d);
        animixer.clipAction(r.o3d.animations[0]).play();
        animMixers.push(animixer);
        console.log("Character Object:", group);
        setChar3D(group);
        skelHelper = r.skl;
      });

      // TestLoad().then( r=> {
      //   r.name = "test object";
      //   setChar3D(r);
      // });
    }
  }, [avatar]);
  useFrame((state, delta) => {
    animMixers.forEach(element => { element.update(delta); });
  });

  if(char3d) {
    return (
      <primitive object={char3d} scale={ 1 }/>
    );
  } else {
    return ( <></>);
  }
}

export default Character4R3F;