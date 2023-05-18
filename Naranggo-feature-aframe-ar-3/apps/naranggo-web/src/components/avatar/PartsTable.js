// Avatar Character Parts Tables

export class PartsTable {
    static top = require("../../avatar/data/body_data.json");
    static bottom = require("../../avatar/data/bodypants_data.json");
    static shoes = require("../../avatar/data/shoes_data.json");

    //!!! 세트는 위 3 모델과 아래 머리 파트을 하나로 모아놓은 데이터
    static sets = require("../../avatar/data/set_data.json");
 
    //!!! 헤드 본에 붙여줄 머리 파츠들
    static hair_acc = require("../../avatar/data/hair_acc.json");
    static hair = require("../../avatar/data/hair_data.json");
    static head = require("../../avatar/data/head_data.json");

    // 더이상 사용 안하는 데이터인듯함.
    // PARTABLE.head_part_face = require("../avatar/data/head_part_face.json");
    // PARTABLE.head_part_nose = require("../avatar/data/head_part_nose.json");

    static eye = require("../../avatar/data/eye_data.json");
    static eyebrow = require("../../avatar/data/eyebrow_data.json");
    static glass = require("../../avatar/data/glass_data.json");
    static beard = require("../../avatar/data/beard_data.json");
    static mustache = require("../../avatar/data/mustache_data.json");
    static mouth = require("../../avatar/data/lip_data.json");

    static {
        for (let i = 0; i < this.head.head_features.length; ++i) {
            const head_features = this.head.head_features;
            // 예를 들어 head_04_00_020에서 04는 face의 번호이고 00은 코 번호이다.
            // bad structure. breaks the consistency. 데이터 구조의 일관성 해치는중...
            const name = head_features[i].name;
            const splitedString = name.split('_');
            const faceid = Number(splitedString[1]);
            const noseid = Number(splitedString[2]);
      
            head_features[i].faceid = faceid;
            head_features[i].noseid = noseid;
            //console.log('head = face + nose:', name, i, faceid, noseid);
        }
        console.log('character parts table initialized!');
    }
}