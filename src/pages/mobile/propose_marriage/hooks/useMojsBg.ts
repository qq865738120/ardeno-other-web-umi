import { useEffect, useRef } from "react";
import mojs from "@mojs/core";
import Heart from "../animals/Heart";

const CIRCLE_RADIUS = 20;
const RADIUS = 32;
const COUNT = 6;

const randomHeartArr: number[] = [];
const randomHeartXArr: number[] = [];
const randomHeartYArr: number[] = [];

const FIRE_COUNT = 6;
const randomFireArr: number[] = [];
const randomFireXArr: number[] = [];
const randomFireYArr: number[] = [];

function useMojsBg() {
  const heartArr = useRef([] as any[]);
  const fireArr = useRef([] as any[]);

  useEffect(() => {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < COUNT; index++) {
      randomHeartArr.push(Math.random());
      randomHeartXArr.push(Math.random());
      randomHeartYArr.push(Math.random());
    }
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < FIRE_COUNT; index++) {
      randomFireArr.push(Math.random());
      randomFireXArr.push(Math.random());
      randomFireYArr.push(Math.random());
    }

    const timerId = setInterval(() => {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < COUNT; index++) {
        randomHeartArr[index] = Math.random();
        randomHeartXArr[index] = Math.random();
        randomHeartYArr[index] = Math.random();
      }
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < FIRE_COUNT; index++) {
        randomFireArr[index] = Math.random();
        randomFireXArr[index] = Math.random();
        randomFireYArr[index] = Math.random();
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    mojs.addShape("heart", Heart);

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < COUNT; index++) {
      heartArr.current.push({
        circle: new mojs.Shape({
          left: 0,
          top: 0,
          stroke: { "#E5214A": "#CC8EF5" },
          strokeWidth: { [2 * CIRCLE_RADIUS]: 0 },
          fill: "none",
          scale: { 0: 1 },
          radius: CIRCLE_RADIUS,
          duration: 400,
          easing: "cubic.out",
        }),
        burst: new mojs.Burst({
          left: 0,
          top: 0,
          radius: { 4: RADIUS },
          angle: 45,
          count: 14,
          timeline: { delay: 300 },
          children: {
            radius: 2.5,
            fill: [
              { "#9EC9F5": "#9ED8C6" },
              { "#91D3F7": "#9AE4CF" },

              { "#DC93CF": "#E3D36B" },
              { "#CF8EEF": "#CBEB98" },

              { "#87E9C6": "#1FCC93" },
              { "#A7ECD0": "#9AE4CF" },

              { "#87E9C6": "#A635D9" },
              { "#D58EB3": "#E0B6F5" },

              { "#F48BA2": "#CF8EEF" },
              { "#91D3F7": "#A635D9" },

              { "#CF8EEF": "#CBEB98" },
              { "#87E9C6": "#A635D9" },
            ],
            scale: { 1: 0, easing: "quad.in" },
            pathScale: [0.8, null],
            degreeShift: [13, null],
            duration: [500, 700],
            easing: "quint.out",
            // speed: .1
          },
        }),
        heart: new mojs.Shape({
          left: 0,
          top: 2,
          shape: "heart",
          fill: "#ff7473",
          scale: { 0: 1 },
          opacity: { 0: 1 },
          easing: "elastic.out",
          duration: 1000,
          delay: 300,
          radius: 11,
        })
          .then({
            scale: { 1: "rand(1.2, 2)" },
            opacity: { 1: 0.8 },
            easing: "ease.out",
            duration: 100,
            delay: 200,
          })
          .then({
            scale: { "rand(1.2, 2)": 1 },
            opacity: { 0.8: 1 },
            easing: "ease.out",
            duration: 100,
            delay: 0,
          })
          .then({
            scale: { 1: 3 },
            opacity: { 1: 0 },
            easing: "ease.in",
            duration: 200,
            delay: 600,
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            onComplete() {
              setTimeout(() => {
                paly(index);
              }, 200 + randomHeartArr[index] * 8 * 1000);
            },
          }),
      });
      setTimeout(() => {
        paly(index);
      }, randomHeartArr[index] * 10 * 1000);
    }

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < FIRE_COUNT; index++) {
      fireArr.current.push({
        burst: new mojs.Burst({
          left: 0,
          top: 0,
          radius: { 0: 30 },
          angle: "rand(0, 360)",
          children: {
            shape: "line",
            stroke: "white",
            fill: "none",
            scale: 1,
            scaleX: { 1: 0 },
            easing: "cubic.out",
            duration: 1000,
          },
        }),
        bubbles: new mojs.Burst({
          left: 0,
          top: 0,
          radius: 28,
          count: 3,
          timeline: { delay: 100 },
          children: {
            stroke: "white",
            fill: "none",
            scale: 1,
            strokeWidth: { 8: 0 },
            radius: { 0: "rand(6, 10)" },
            degreeShift: "rand(-50, 50)",
            duration: 400,
            delay: "rand(0, 250)",
          },
          onComplete() {
            setTimeout(() => {
              filePaly(index);
            }, 200 + randomFireArr[index] * 6 * 1000);
          },
        }),
      });
      setTimeout(() => {
        filePaly(index);
      }, randomFireArr[index] * 10 * 1000);
    }
  }, []);

  const paly = (index: number, x?: number, y?: number) => {
    let randomY = 0
    if (randomHeartYArr[index] > 0.25 && randomHeartYArr[index] <= 0.5) {
      randomY = randomHeartYArr[index] - 0.25
    } else if (randomHeartYArr[index] > 0.5 && randomHeartYArr[index] <= 0.75) {
      randomY = randomHeartYArr[index] + 0.25
    } else {
      randomY = randomHeartYArr[index]
    }
    const coords = {
      x: `${x || 20 + randomHeartXArr[index] * 80}vw`,
      y: `${y || 10 + randomY * 90}vh`,
    };
    const { burst, circle, heart } = heartArr.current[index];
    burst.tune(coords).generate().replay();
    circle.tune(coords).generate().replay();
    heart.tune(coords).generate().replay();
  };

  const filePaly = (index: number, x?: number, y?: number) => {
    let randomY = 0
    if (randomFireXArr[index] > 0.25 && randomFireXArr[index] <= 0.5) {
      randomY = randomFireXArr[index] - 0.25
    } else if (randomFireXArr[index] > 0.5 && randomFireXArr[index] <= 0.75) {
      randomY = randomFireXArr[index] + 0.25
    } else {
      randomY = randomFireXArr[index]
    }
    const coords = {
      x: `${x || 20 + randomFireXArr[index] * 80}vw`,
      y: `${y || 10 + randomY * 90}vh`,
    };
    const { burst, bubbles } = fireArr.current[index];
    burst.tune(coords).generate().replay();
    bubbles.tune(coords).generate().replay();
  };

  return { paly };
}

export default useMojsBg;
