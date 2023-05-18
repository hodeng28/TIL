import { PartData } from './PartData';
import { PartsTable } from './PartsTable';

const ERR_COLOR = '#ff00ff'; // rgba 포맷 지원 안함 .color 대신 .name 사용

export class ModelData {
  show_skeleton = false;

  constructor(jsn_obj) {
    this.robj = jsn_obj;

    this.sets = new PartData(
      jsn_obj.avatarSetData,
      this,
      PartsTable.sets.set_features,
      undefined,
      'sets'
    );
    this.get_set_id = function () {
      return this.sets.robj.id;
    };
    this.is_set_model = function () {
      return this.sets.robj.id !== -1;
    };

    this.skin = new PartData(
      jsn_obj.avatarSkinData,
      this,
      undefined,
      PartsTable.head.head_color,
      'skin'
    );
    this.get_skin_color = function () {
      const sid = this.skin.robj.id;
      if (sid >= 0 && sid < this.skin.colors.length) {
        //console.log('get skin color:', sid, this.skin.colors, this.skin);
        return '#' + this.skin.colors[sid].name; // webgl에서 rgba 포맷 지원하지 않아 color변수 대신 rgb로 네이밍된 name 변수 참조
      }
      console.warn('skin color id out or range:', sid, this.skin);
      return ERR_COLOR;
    };
    // 사용 안하는 듯!!!
    //this.nose = new CharacterPart(json_model.avatarNoseData, this, PartsTable.nose.nose_features, PartsTable.head.head_color, 'nose');
    this.head = new PartData(
      jsn_obj.avatarHeadData,
      this,
      PartsTable.head.head_features,
      PartsTable.head.head_color,
      'head'
    );
    //this.ref_nose = jsn_model.avatarNoseData;
    this.nose = new PartData(
      jsn_obj.avatarNoseData,
      this,
      undefined,
      undefined,
      'nose'
    ); // 예외 상황...

    // avatarSkinData, avatarNoseData 제외
    this.top = new PartData(
      jsn_obj.avatarBodyData,
      this,
      PartsTable.top.body_features,
      PartsTable.top.body_color,
      'top'
    );
    this.bottom = new PartData(
      jsn_obj.avatarBodyPantsData,
      this,
      PartsTable.bottom.pants_features,
      PartsTable.bottom.pants_color,
      'bottom'
    );
    this.shoes = new PartData(
      jsn_obj.avatarShoesData,
      this,
      PartsTable.shoes.shoes_features,
      PartsTable.shoes.shoes_colors,
      'shoes'
    );

    this.hair = new PartData(
      jsn_obj.avatarHairData,
      this,
      PartsTable.hair.hair_features,
      PartsTable.hair.hair_color,
      'hair'
    );
    this.hair_acc = new PartData(
      jsn_obj.avatarHairAccData,
      this,
      PartsTable.hair_acc.hair_acc_features,
      PartsTable.hair_acc.hair_acc_color,
      'hair_acc'
    );
    this.eye = new PartData(
      jsn_obj.avatarEyeData,
      this,
      PartsTable.eye.eye_features,
      PartsTable.eye.eye_color,
      'eye'
    );
    this.eyebrow = new PartData(
      jsn_obj.avatarEyeBrowData,
      this,
      PartsTable.eyebrow.eyebrow_features,
      PartsTable.eyebrow.eyebrow_color,
      'eyebrow'
    );
    this.glass = new PartData(
      jsn_obj.avatarGlassData,
      this,
      PartsTable.glass.glass_features,
      PartsTable.glass.glass_color,
      'glass'
    ); // 'glass' 프로퍼티 없음
    this.beard = new PartData(
      jsn_obj.avatarBeardData,
      this,
      PartsTable.beard.beard_features,
      PartsTable.beard.beard_color,
      'beard'
    ); // 'beard' 프로퍼티 없음
    this.mustache = new PartData(
      jsn_obj.avatarMustacheData,
      this,
      PartsTable.mustache.mustache_features,
      PartsTable.mustache.mustache_color,
      'mustache'
    ); // 'bemustacheard' 프로퍼티 없음
    this.mouth = new PartData(
      jsn_obj.avatarLipData,
      this,
      PartsTable.mouth.lip_features,
      PartsTable.mouth.lip_color,
      'mouth'
    );

    this.parts = [
      this.top,
      this.bottom,
      this.shoes, // model id, color id
      this.head, // model id only. using skin color
      this.hair,
      this.hair_acc, // 이하 위치 오프셋등 부가정보 추가
      this.eye,
      this.eyebrow,
      this.glass,
      this.beard,
      this.mustache,
      this.mouth
    ];
  }
  //---------------------------------
  get_set_feature(features, propname) {
    let sets_name = undefined;
    const setid = this.get_set_id();
    if (setid >= 0 && setid < PartsTable.sets.set_features.length) {
      sets_name = PartsTable.sets.set_features[setid][propname];
      if (sets_name !== '') {
        for (let i = 0; i < features.length; ++i) {
          if (features[i].name === sets_name) {
            return features[i];
          }
        }
      }
    }
    //console.warn('not found sets id:', setid 'name:', sets_name);
    return undefined;
  }
  //---------------------------------
  create_load_data() {
    const loadata = {};
    const skin_color = this.get_skin_color();
    // type skin/cloth color
    let partslist = [this.top, this.bottom, this.shoes, this.hair_acc];
    for (let parts of partslist) {
      const feature = parts.get_feature();
      const dye_color = parts.get_dye_color();
      if (feature && feature.model !== '') {
        loadata[parts.name] = {
          fbx: feature.model,
          texMain: feature.texture,
          texMask: feature.mask,
          colSkin: skin_color,
          colCloth: dye_color
        };
      }
    }
    partslist = [this.hair, this.hair_acc];
    for (let parts of partslist) {
      const feature = parts.get_feature();
      const dye_color = parts.get_dye_color();
      if (feature && feature.model !== '') {
        loadata[parts.name] = {
          fbx: feature.model,
          texMain: feature.texture,
          texMask: feature.mask,
          colSkin: dye_color,
          colCloth: dye_color
        };
      }
    }
    // head = face + nose combination ㅠㅠ
    // 예외 상황. features[] 인덱스 사용하는 방식이 아님. head id와 nose id와 조합으로 만들어짐.
    // head 5개 x nose 5개 25개?
    for (let i = 0; i < this.head.features.length; ++i) {
      const feature = this.head.features[i];
      if (
        feature.faceid === this.head.robj.id &&
        feature.noseid === this.nose.robj.id
      ) {
        if (feature.model === '') {
          console.warn('invalid feature face:', feature);
        } else {
          loadata.face = {
            fbx: feature.model,
            texMain: feature.texture,
            texMask: feature.mask,
            colSkin: skin_color,
            colCloth: skin_color
          };
        }
        break;
      }
    }

    if (!loadata.face) {
      console.error(
        'Not found head feature! head id:',
        this.head.robj.id,
        this.head.features
      );
    }
    // type skin color, dye color
    partslist = [this.eyebrow, this.glass, this.mustache];
    for (let parts of partslist) {
      const feature = parts.get_feature();
      const dye_color = parts.get_dye_color();
      if (feature && feature.model !== '') {
        loadata[parts.name] = {
          fbx: 'eyebrow/eyebrow_000',
          texMain: feature.model,
          texMask: feature.model2,
          colSkin: dye_color,
          colCloth: dye_color
        };
      }
    }
    {
      const feature = this.eye.get_feature();
      if (feature && feature.model !== '') {
        loadata[this.eye.name] = {
          fbx: 'eye/eye_000',
          texMain: feature.model,
          texMask: feature.model2,
          colSkin: skin_color,
          colCloth: ERR_COLOR
        };
      }
    }
    {
      const feature = this.glass.get_feature();
      if (feature && feature.model !== '') {
        loadata[this.glass.name] = {
          fbx: 'glass/glass_000',
          texMain: feature.model,
          texMask: feature.model2,
          colSkin: skin_color,
          colCloth: ERR_COLOR
        };
      }
    }
    {
      const feature = this.mustache.get_feature();
      if (feature && feature.model !== '') {
        loadata[this.mustache.name] = {
          fbx: 'mustache/mustache_000',
          texMain: feature.model,
          texMask: feature.model2,
          colSkin: skin_color,
          colCloth: ERR_COLOR
        };
      }
    }
    {
      const feature = this.beard.get_feature();
      const dye_color = this.beard.get_dye_color();
      if (feature && feature.model !== '') {
        loadata[this.beard.name] = {
          fbx: feature.model,
          texMain: feature.tex_diffuse,
          texMask: feature.tex_mask,
          colSkin: dye_color,
          colCloth: dye_color
        };
      }
    }
    {
      const feature = this.mouth.get_feature();
      const dye_color = this.mouth.get_dye_color();
      if (feature && feature.model !== '') {
        loadata[this.mouth.name] = {
          fbx: 'mouth/mouth_000',
          texMain: feature.model,
          texMask: feature.model2,
          colSkin: dye_color,
          colCloth: ERR_COLOR
        };
      }
    }
    console.log('LOADATA:', loadata);
    return loadata;
  }
}
