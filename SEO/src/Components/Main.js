import React from "react";
import "./style/Main.scss"

const Main = () => {
  return (
    <div>
      <div className="mainBg">
        <main class="main">
          <section class="mainEventWrap">
            <div class="mainEvent">
              <div class="mainTitle">
                <img
                  src="https://image.istarbucks.co.kr/upload/common/img/main/2020/20_summer3_emblem.png"
                  alt=""
                />
                <button>자세히보기</button>
              </div>
              <ul class="mainNewMenu">
                <li class="newMenu1">
                  <img
                    src="https://image.istarbucks.co.kr/upload/common/img/main/2020/summer3_bev1.png"
                    alt="블론드 서머 라떼 이미지"
                  />
                  <img
                    src="https://image.istarbucks.co.kr/upload/common/img/main/2020/summer3_bev1_txt.png"
                    alt="블론드 서머 라떼 텍스트"
                    className="newMenuText1"
                  />
                </li>
                <li class="newMenu2">
                  <img
                    src="https://image.istarbucks.co.kr/upload/common/img/main/2020/summer3_bev2.png"
                    alt="스위티 자몽 라임 블렌디드 이미지"
                  />
                  <img
                    src="https://image.istarbucks.co.kr/upload/common/img/main/2020/summer3_bev2_txt.png"
                    alt="스위티 자몽 라임 블렌디드 텍스트"
                    className="newMenuText2"
                  />
                </li>
                <li class="newMenu3">
                  <img
                    src="https://image.istarbucks.co.kr/upload/common/img/main/2020/summer3_bev3.png"
                    alt="블론드 서머 라떼 이미지"
                  />
                  <img
                    src="https://image.istarbucks.co.kr/upload/common/img/main/2020/summer3_bev3_txt.png"
                    alt="블론드 서머 라떼 텍스트"
                    className="newMenuText3"
                  />
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Main;

