
export class PartData {
  constructor(part, root, features, colors, name) {
    this.name = name;
    this.robj = part; // reference json object
    this.root = root;
    if(features) this.features = features; // skin은 없음
    if(colors) this.colors = colors; // head는 없음
    this.part_feature = function() { return this.features[this.robj.id]; }
    this.get_feature = function() {
      let feature;
      if(this.root.is_set_model()) {
        feature = this.root.get_set_feature(this.features, this.name);
      }
      // set가 없으면 기본 데이터 반환.
      if(!feature) {
        feature = this.part_feature();
      }
      return feature;
      //return root.is_set_model ? root.get_set_feature(this.features, name) : this.part_feature()
    }
  }

  //---------------------------------
  get_dye_color() {
    if(this.root.is_set_model()) {
      return '#' + this.colors[0].name;
    }
    const id = this.robj.colorId;
    if(id < 0 || id >= this.colors.length) {
      console.warn('out of range color index:', this.name, id);
      return ERR_COLOR;
    }
    return '#' + this.colors[id].name;
  }
/*
  //---------------------------------
  edit_feature_id(idx) {
    if(this.features && idx < this.features.length) {
      const minval = this.name == 'sets' ? -1 : 0;
      if(idx >= minval) {
        this.robj.id = idx;
        setAvatar( {...rjsonModel} );
      }
    }
  }
  //---------------------------------
  edit_nose_id(idx) {
    if(idx >= 0 && idx < 5) {
      this.robj.id = idx;
      setAvatar( {...rjsonModel} );
    }
  }
  //---------------------------------
  edit_color_id(idx) {
    if(this.colors && idx >= 0 && idx < this.colors.length) {
      this.robj.colorId = idx;
    }
    setAvatar( {...rjsonModel} );
  }
  //---------------------------------
  edit_skin_id(idx) {
    if(this.colors && idx >= 0 && idx < this.colors.length) {
      this.robj.id = idx;
    }
    setAvatar( {...rjsonModel} );
  }
  //---------------------------------
  // edit_head_id(idx) {
  //   if(this.features && idx < this.features.length) {
  //     const minval = this.name == 'sets' ? -1 : 0;
  //     if(idx >= minval) {
  //       this.robj.id = idx;
  //       this.features.parse(idx);
  //       setAvatar( {...rjsonModel} );
  //     }
  //   }
  // }
*/
}
