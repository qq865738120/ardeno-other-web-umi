import React, { FC, useEffect } from "react";
import { AppModelState, connect, ConnectProps, Loading } from "umi";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade } from "swiper";
import Typed from "typed.js";

import styles from "./propose_marriage.less";
import "swiper/swiper.less";
import "swiper/components/effect-fade/effect-fade.less";

interface PageProps extends ConnectProps {
  app: AppModelState;
  loading: boolean;
}

SwiperCore.use([EffectFade]);

const ProposeMarriagePage: FC<PageProps> = () => {
  useEffect(() => {
    const typed = new Typed(".element", {
      strings: [
        "git push --force ^500 pushed to origin with option force",
        "This is a JavaScript library",
        "This is an ES6 module",
      ],
      typeSpeed: 60,
      backSpeed: 20,
      smartBackspace: true,
    });
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <main className={styles.content}>
      <Swiper
        height={window.innerHeight}
        effect="fade"
        direction="vertical"
        className={styles.swiperContainer}
      >
        <SwiperSlide>
          <div className={`${styles.page} ${styles.page1}`}>
            <span className="element" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.page} ${styles.page2}`}>page 2</div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={`${styles.page} ${styles.page1}`}>page 3</div>
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
