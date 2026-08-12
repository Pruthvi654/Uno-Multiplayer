import backCard from "./back/uno.png";

import wild from "./wild/Wild.png";
import wild4 from "./wild/Wild_Draw_4.png";

/* BLUE */

import blue0 from "./blue/0.png";
import blue1 from "./blue/1.png";
import blue2 from "./blue/2.png";
import blue3 from "./blue/3.png";
import blue4 from "./blue/4.png";
import blue5 from "./blue/5.png";
import blue6 from "./blue/6.png";
import blue7 from "./blue/7.png";
import blue8 from "./blue/8.png";
import blue9 from "./blue/9.png";

import blueSkip from "./blue/Skip.png";
import blueReverse from "./blue/Reverse.png";
import blueDraw2 from "./blue/Draw_2.png";

/* RED */

import red0 from "./red/0.png";
import red1 from "./red/1.png";
import red2 from "./red/2.png";
import red3 from "./red/3.png";
import red4 from "./red/4.png";
import red5 from "./red/5.png";
import red6 from "./red/6.png";
import red7 from "./red/7.png";
import red8 from "./red/8.png";
import red9 from "./red/9.png";

import redSkip from "./red/Skip.png";
import redReverse from "./red/Reverse.png";
import redDraw2 from "./red/Draw_2.png";

/* GREEN */

import green0 from "./green/0.png";
import green1 from "./green/1.png";
import green2 from "./green/2.png";
import green3 from "./green/3.png";
import green4 from "./green/4.png";
import green5 from "./green/5.png";
import green6 from "./green/6.png";
import green7 from "./green/7.png";
import green8 from "./green/8.png";
import green9 from "./green/9.png";

import greenSkip from "./green/Skip.png";
import greenReverse from "./green/Reverse.png";
import greenDraw2 from "./green/Draw_2.png";

/* YELLOW */

import yellow0 from "./yellow/0.png";
import yellow1 from "./yellow/1.png";
import yellow2 from "./yellow/2.png";
import yellow3 from "./yellow/3.png";
import yellow4 from "./yellow/4.png";
import yellow5 from "./yellow/5.png";
import yellow6 from "./yellow/6.png";
import yellow7 from "./yellow/7.png";
import yellow8 from "./yellow/8.png";
import yellow9 from "./yellow/9.png";

import yellowSkip from "./yellow/Skip.png";
import yellowReverse from "./yellow/Reverse.png";
import yellowDraw2 from "./yellow/Draw_2.png";

const createColorSet = (
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  skip,
  reverse,
  draw2
) => ({

  0: zero,
  1: one,
  2: two,
  3: three,
  4: four,
  5: five,
  6: six,
  7: seven,
  8: eight,
  9: nine,

  skip,
  reverse,
  draw2

});

const cardImages = {

  blue: createColorSet(
    blue0,
    blue1,
    blue2,
    blue3,
    blue4,
    blue5,
    blue6,
    blue7,
    blue8,
    blue9,
    blueSkip,
    blueReverse,
    blueDraw2
  ),

  red: createColorSet(
    red0,
    red1,
    red2,
    red3,
    red4,
    red5,
    red6,
    red7,
    red8,
    red9,
    redSkip,
    redReverse,
    redDraw2
  ),

  green: createColorSet(
    green0,
    green1,
    green2,
    green3,
    green4,
    green5,
    green6,
    green7,
    green8,
    green9,
    greenSkip,
    greenReverse,
    greenDraw2
  ),

  yellow: createColorSet(
    yellow0,
    yellow1,
    yellow2,
    yellow3,
    yellow4,
    yellow5,
    yellow6,
    yellow7,
    yellow8,
    yellow9,
    yellowSkip,
    yellowReverse,
    yellowDraw2
  ),

  wild: {

    wild,

    wild4

  },

  back: {

    back: backCard

  }

};

export default cardImages;