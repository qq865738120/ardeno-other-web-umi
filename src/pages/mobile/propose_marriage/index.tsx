import React, { FC, useEffect, useRef } from "react";
import { AppModelState, connect, ConnectProps, Loading } from "umi";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade } from "swiper";
import Typed from "typed.js";
import mojs from "@mojs/core";

import styles from "./index.less";
import "swiper/swiper.less";
import "swiper/components/effect-fade/effect-fade.less";
import useMojsBg from "./hooks/useMojsBg";

import heroGlowSvg from "@/assets/images/hero_glow.svg";

interface PageProps extends ConnectProps {
  app: AppModelState;
  loading: boolean;
}

SwiperCore.use([EffectFade]);

const ProposeMarriagePage: FC<PageProps> = () => {
  const bgAnimDom = useRef<any>();
  useMojsBg();

  useEffect(() => {
    const typed = new Typed("#word1", {
      // strings: [
      //   "git push --force ^500 pushed to origin with option force",
      //   "This is a JavaScript library",
      //   "This is an ES6 module",
      // ],
      strings: [
        `
        你好吗你好吗你好吗你。
        <br />
        士大夫士大夫士大夫士大夫。
        <br />
        哈哈哈哈哈哈哈。
        <br />
        六六六。
        `,
      ],
      typeSpeed: 80,
      backSpeed: 20,
      startDelay: 1000,
      autoInsertCss: true,
      // cursorChar: "_",
      smartBackspace: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     mojsBg.onPaly()
  //   }, 1000);
  // }, [mojsBg])

  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   bgAnimObj = new mojs.Shape({
  //     parent: bgAnimDom.current,
  //     shape: "circle",
  //     scale: { 0: 1 },
  //     duration: 1000,
  //     // delay: 1000,
  //     easing: "cubic.inout",
  //     onComplete() {
  //       console.log('完成', bgAnimObj);
  //       bgAnimObj.replay()
  //     }
  //   }).play();

  //   console.log(bgAnimObj);

  //   // return () => {
  //   //   bgAnimObj.current.
  //   // }
  // }, []);

  return (
    <main className={styles.content}>
      <div ref={bgAnimDom} className={styles.bg}>
        <img src={heroGlowSvg} className={styles.bgImage} />
      </div>
      <Swiper
        height={window.innerHeight}
        // effect="fade"
        direction="vertical"
        className={styles.swiperContainer}
      >
        <SwiperSlide>
          <div className={`${styles.page}`}>
            <div className={styles.pageContent}>
              <div className={styles.word1}>
                <span id="word1" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.page}`}>page 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.page}`}>page 3</div>
        </SwiperSlide>
      </Swiper>
    </main>
  );
};

export default connect(
  ({ app, loading }: { app: AppModelState; loading: Loading }) => ({
    app,
    loading: loading.models.app,
  }),
)(ProposeMarriagePage);
