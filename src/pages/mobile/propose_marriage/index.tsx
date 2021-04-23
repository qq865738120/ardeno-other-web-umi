import React, { FC, useEffect, useRef } from "react";
import { AppModelState, connect, ConnectProps, Loading } from "umi";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade } from "swiper";

import styles from "./index.less";
import "swiper/swiper.less";
import "swiper/components/effect-fade/effect-fade.less";
import useMojsBg from "./hooks/useMojsBg";

import heroGlowSvg from "@/assets/images/hero_glow.svg";
import useTyped from "./hooks/useTyped";
import moment from "moment";

interface PageProps extends ConnectProps {
  app: AppModelState;
  loading: boolean;
}

SwiperCore.use([EffectFade]);

const ProposeMarriagePage: FC<PageProps> = () => {
  const word2 = useRef<string[]>([]);
  const bgAnimDom = useRef<any>();
  useMojsBg();
  useTyped({
    element: "#word1",
    options: {
      // strings: [
      //   "git push --force ^500 pushed to origin with option force",
      //   "This is a JavaScript library",
      //   "This is an ES6 module",
      // ],
      strings: [
        `

        `,
      ],
      typeSpeed: 80,
      backSpeed: 20,
      startDelay: 1000,
      autoInsertCss: true,
      // cursorChar: "_",
      smartBackspace: true,
    },
  });

  useEffect(() => {
    moment("")
    const currentTime = moment()
    const lastTime = moment('2017-03-20')
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 24 * 60 * 60; index++) {
      currentTime.add(1, 's')
      const tempTime = moment.duration(currentTime.format('x') as any - (lastTime.format('x') as any))
      let str = "";
      str += `在一起：<br />`
      str += `${currentTime.diff(lastTime, 'days')}天<br />`;
      str += `${tempTime.hours()}时`;
      str += `${tempTime.minutes()}分`;
      str += `${tempTime.seconds()}秒`;
      word2.current.push(str);
    }
  }, []);
  const typed2 = useTyped({
    element: "#word2",
    options: {
      strings: word2.current,
      typeSpeed: 80,
      backSpeed: 20,
      startDelay: 1000,
      autoInsertCss: true,
      // cursorChar: "_",
      smartBackspace: true,
    },
  });
  setTimeout(() => {
    typed2.current?.stop()
  }, 100);
  const onTransitionEnd = (swiper: any) => {
    if (swiper.activeIndex === 1) {
      typed2.current?.start()
    }
  }

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
        onTransitionEnd={onTransitionEnd}
      >
        <SwiperSlide>
          <div className={`${styles.page}`}>
            <div className={styles.pageContent}>
              <div className={styles.word}>
                <span id="word1" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.page}`}>
            <div className={styles.pageContent}>
              <div className={styles.word}>
                <span id="word2" />
              </div>
            </div>
          </div>
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
