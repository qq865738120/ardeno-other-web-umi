import React, { FC, useEffect, useRef } from "react";
import { AppModelState, connect, ConnectProps, Loading } from "umi";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade } from "swiper";

import styles from "./index.less";
import "swiper/swiper.less";
import "swiper/components/effect-fade/effect-fade.less";
// import useMojsBg from "./hooks/useMojsBg";

import heroGlowSvg from "@/assets/images/hero_glow.svg";
// import useTyped from "./hooks/useTyped";
import moment from "moment";
import TypeIt from "typeit-react";
import ReactFullpage from '@fullpage/react-fullpage';

interface PageProps extends ConnectProps {
  app: AppModelState;
  loading: boolean;
}

SwiperCore.use([EffectFade]);

const word2: any[] = [];
moment("");
const currentTime = moment();
const lastTime = moment("2017-03-21");
// eslint-disable-next-line no-plusplus
for (let index = 0; index < 60 * 60; index++) {
  currentTime.add(1, "s");
  const tempTime = moment.duration(
    (currentTime.format("x") as any) - (lastTime.format("x") as any),
  );
  let str = "";
  // str += `在一起：<br />`;
  // str += `${currentTime.diff(lastTime, "days")}天<br />`;
  str += `${tempTime.hours()}时`;
  str += `${tempTime.minutes()}分`;
  str += `${tempTime.seconds()}秒`;
  word2.push(str);
}

const ProposeMarriagePage: FC<PageProps> = () => {
  // const bgAnimDom = useRef<any>();
  // const onTransitionEnd = (swiper: any) => {
  //   if (swiper.activeIndex === 1) {
  //     // typed2.current?.start();
  //   }
  // };

  return (
    <ReactFullpage
    licenseKey = {'YOUR_KEY_HERE'}
    scrollingSpeed = {1000}
    render={({ state, fullpageApi }: any) => {
      return (
        <ReactFullpage.Wrapper>
          <div className="section">
            <p>Section 1 (welcome to fullpage.js)</p>
            <button onClick={() => fullpageApi.moveSectionDown()}>
              Click me to move down
            </button>
          </div>
          <div className="section">
            <p>Section 2</p>
          </div>
        </ReactFullpage.Wrapper>
      );
    }}
  />
  )

  // return (
  //   <main className={styles.content}>
  //     <div ref={bgAnimDom} className={styles.bg}>
  //       <img src={heroGlowSvg} className={styles.bgImage} />
  //     </div>
  //     <Swiper
  //       height={window.innerHeight}
  //       // effect="fade"
  //       direction="vertical"
  //       className={styles.swiperContainer}
  //       onTransitionEnd={onTransitionEnd}
  //     >
  //       <SwiperSlide>
  //         <div className={`${styles.page}`}>
  //           <div className={styles.pageContent}>
  //             <div className={styles.word} style={{ fontSize: "20px" }}>
  //               <TypeIt
  //                 options={{
  //                   startDelay: 1000,
  //                   speed: 160,
  //                   afterComplete: (instance: any) => {
  //                     instance.destroy();
  //                   },
  //                 }}
  //                 getBeforeInit={(instance) => {
  //                   instance
  //                     .type("海底月是天上月")
  //                     .pause(800)
  //                     .type("，眼前人")
  //                     .pause(800)
  //                     .type("是<span style='font-size: 24px'>心上人</span>。")
  //                     .pause(1000)
  //                     .break()
  //                     .pause(1500)
  //                     .type("你问我有多爱你，我想说答案很长")
  //                     .pause(1000)
  //                     .type("，")
  //                     .break()
  //                     .pause(1000)
  //                     .type("我得用很久去回答，")
  //                     .pause(500)
  //                     .move(-4)
  //                     .delete(2)
  //                     .pause(500)
  //                     .type("一辈子")
  //                     .pause(500)
  //                     .move(5)
  //                     .pause(500)
  //                     .type("你准备好听我说了吗？");
  //                   return instance;
  //                 }}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </SwiperSlide>
  //       <SwiperSlide>
  //         <div className={`${styles.page}`}>
  //           <div className={styles.pageContent}>
  //             <div className={styles.word}>
  //               <TypeIt
  //                 options={{
  //                   strings: ['在一起：', `${currentTime.diff(lastTime, "days")}天`, ''],
  //                   startDelay: 1000,
  //                   speed: 160,
  //                   waitUntilVisible: true,
  //                   afterComplete: (instance: any) => {
  //                     instance.destroy();
  //                   },
  //                 }}
  //                 getBeforeInit={(instance) => {
  //                   return instance;
  //                 }}
  //               />
  //               <TypeIt
  //                 options={{
  //                   strings: word2,
  //                   startDelay: 4100,
  //                   speed: 100,
  //                   breakLines: false,
  //                   waitUntilVisible: true,
  //                   afterComplete: (instance: any) => {
  //                     instance.destroy();
  //                   },
  //                 }}
  //                 getBeforeInit={(instance) => {
  //                   return instance;
  //                 }}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </SwiperSlide>
  //       <SwiperSlide>
  //         <div className={`${styles.page}`}>page 3</div>
  //       </SwiperSlide>
  //     </Swiper>
  //   </main>
  // );
};

export default connect(
  ({ app, loading }: { app: AppModelState; loading: Loading }) => ({
    app,
    loading: loading.models.app,
  }),
)(ProposeMarriagePage);
