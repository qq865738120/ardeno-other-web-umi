var Fontmin = require("fontmin");

var fontmin = new Fontmin()
  .src("./src/assets/fonts/DottedSongtiCircleRegular.ttf")
  .use(
    Fontmin.glyph({
      text:
        "|1234567890：天时分秒海底月是天上月，眼前人是心上人你问我有多爱你，我想说答案很长我得用很久去回答，一辈子你准备好听我说了吗？在一起已经：1、待定这是我对你承诺的三个心愿。我知道你还没有想好。但，无论是什么，我都会为你实现它。郑文军愿意娶孙苑媛为妻，请答应我好吗？",
    }),
  )
  .use(
    Fontmin.ttf2eot({
      clone: true,
    }),
  )
  .use(
    Fontmin.ttf2woff({
      clone: true,
    }),
  )
  .use(
    Fontmin.ttf2svg({
      clone: true,
    }),
  )
  .dest("./src/assets/min-fonts/");

fontmin.run(function (err, files) {
  if (err) {
    throw err;
  }

  console.log(files[0]);
  // => { contents: <Buffer 00 01 00 ...> }
});
