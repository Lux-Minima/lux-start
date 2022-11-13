<script setup>
import { ref, onMounted, reactive } from 'vue'

const $ascii = ref(0)
const state = reactive({theme: ""})
const emit = defineEmits(['themeUpdate'])

console.log(localStorage,document)
function themeLight() {
  //ASCII Morph
  var element = $ascii.value
  AsciiMorph(element, {x: 16,y: 7});
  AsciiMorph.morph(lux);
  //TailwindCSS Theme update
  document.documentElement.classList.remove("dark");
  //local storage update
  localStorage.theme = "light";
  //state var update
  state.theme = "light";
  //emit update to parent
  emit('themeUpdate', 'light')
};
function themeDark() {
  //mirror
  var element = $ascii.value
  AsciiMorph(element, {x: 16,y: 7});
  AsciiMorph.morph(nox);
  document.documentElement.classList.add("dark");
  localStorage.theme = "dark";
  state.theme = "dark";
  emit('themeUpdate', 'dark')
};

var nox = [
"   :+##%%##+:   ",
" :%*:  *#  :*%- ",
"-@:    *#    :@-",
"%+     *#     +%",
"%+     *#     +%",
"-@:    *#    :@=",
" -%+:  *#  :+%- ",
"   :+##%%##+-   ",
]
var lux = [
"      .#.       ",
"     .%-        ",
"    .%-         ",
"   .%-     :.   ",
"  .%-      -%.  ",
" .%-        :%. ",
".%=..........-%.",
]
var AsciiMorph = (function() {

'use strict';
var element = null ;
var canvasDimensions = {};

var renderedData = [];
var framesToAnimate = [];
var myTimeout = null;

/**
 * Utils
 */

function extend(target, source) {
  for (var key in source) {
    if (!(key in target)) {
      target[key] = source[key];              
    }
  }
  return target;
}

function repeat(pattern, count) {
    if (count < 1) return '';
    var result = '';
    while (count > 1) {
        if (count & 1) result += pattern;
        count >>= 1, pattern += pattern;
    }
    return result + pattern;
}

function replaceAt(string, index, character ) {
  return string.substr(0, index) + character + string.substr(index+character.length);
}

/**
 * AsciiMorph
 */

function init(el, canvasSize) {

  // Save the element
  element = el;
  canvasDimensions = canvasSize;
}

function squareOutData(data) {
  var i;
  var renderDimensions = {
    x: 0,
    y: data.length
  };

  // Calculate centering numbers
  for( i = 0; i < data.length; i++ ) {
    if( data[i].length > renderDimensions.x) {
      renderDimensions.x = data[i].length
    }
  }

  // Pad out right side of data to square it out
  for( i = 0; i < data.length; i++ ) {
    if( data[i].length < renderDimensions.x) {
      data[i] = (data[i] + repeat(' ', renderDimensions.x - data[i].length ));
    }
  }

  var paddings = {
    x: Math.floor((canvasDimensions.x - renderDimensions.x) / 2),
    y: Math.floor((canvasDimensions.y - renderDimensions.y) / 2)
  }

  // Left Padding
  for( var i = 0; i < data.length; i++ ) {
    data[i] = repeat(' ', paddings.x) + data[i] + repeat(' ', paddings.x);
  }

  // Pad out the rest of everything
  for( var i = 0; i < canvasDimensions.y; i++ ) {
    if( i < paddings.y) {
      data.unshift( repeat(' ', canvasDimensions.x));
    } else if (i > (paddings.y + renderDimensions.y)) {
      data.push( repeat(' ', canvasDimensions.x));
    }
  }

  return data;
}

// Crushes the frame data by 1 unit.
function getMorphedFrame(data) {

  var firstInLine, lastInLine = null;
  var found = false;
  for( var i = 0; i < data.length; i++) {

    var line = data[i];
    firstInLine = line.search(/\S/);
    if( firstInLine === -1) {
      firstInLine = null;
    }

    for( var j = 0; j < line.length; j++) {
      if( line[j] != ' ') {
        lastInLine = j;
      }
    }

    if( firstInLine !== null && lastInLine !== null) {
      data = crushLine(data, i, firstInLine, lastInLine)
      found = true;
    }
  
    firstInLine = null, lastInLine = null;
  }

  if( found ) {
    return data;
  } else {
    return false;
  }
}

function crushLine(data, line, start, end) {

  var centers = {
    x: Math.floor(canvasDimensions.x / 2),
    y: Math.floor(canvasDimensions.y / 2)
  }

  var crushDirection = 1;
  if( line > centers.y ) {
    crushDirection = -1;
  }

  var charA = data[line][start];
  var charB = data[line][end];

  data[line] = replaceAt(data[line], start, " ");
  data[line] = replaceAt(data[line], end, " ");

  if( !((end - 1) == (start + 1)) && !(start === end) && !((start + 1) === end)) {
    data[line + crushDirection] = replaceAt(data[line + crushDirection], (start + 1), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
    data[line + crushDirection] = replaceAt(data[line + crushDirection], (end - 1), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
  } else if ((((start === end) || (start + 1) === end)) && ((line + 1) !== centers.y && (line - 1) !== centers.y && line !== centers.y)) {
    data[line + crushDirection] = replaceAt(data[line + crushDirection], (start), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
    data[line + crushDirection] = replaceAt(data[line + crushDirection], (end), '+*/\\'.substr(Math.floor(Math.random()*'+*/\\'.length), 1));
  }

  return data;
}

function render(data) {
  var ourData = squareOutData(data.slice());
  renderSquareData(ourData);
}

function renderSquareData(data) {
  element.innerHTML = '';
  for( var i = 0; i < data.length; i++ ) {
    element.innerHTML = element.innerHTML + data[i] + '\n';
  }

  renderedData = data;
}

// Morph between whatever is current, to the new frame
function morph(data) {

  clearTimeout(myTimeout);
  var frameData = prepareFrames(data.slice());
  animateFrames(frameData);
}

function prepareFrames(data) {

  var deconstructionFrames = [];
  var constructionFrames = [];

  var clonedData = renderedData

  // If its taking more than 100 frames, its probably somehow broken
  // Get the deconscrution frames
  for(var i = 0; i < 100; i++) {
    var newData = getMorphedFrame(clonedData);
    if( newData === false) {
      break;
    }
    deconstructionFrames.push(newData.slice(0)); 
    clonedData = newData;
  }

  // Get the constuction frames for the new data
  var squareData = squareOutData(data);
  constructionFrames.unshift(squareData.slice(0));
  for( var i = 0; i < 100; i++ ) {
    var newData = getMorphedFrame(squareData);
    if( newData === false) {
      break;
    }
    constructionFrames.unshift(newData.slice(0));
    squareData = newData;
  }

  return deconstructionFrames.concat(constructionFrames)
}

function animateFrames(frameData) {
  framesToAnimate = frameData;
  animateFrame();
}

function animateFrame() {
  myTimeout = setTimeout(function() {

    renderSquareData(framesToAnimate[0]);
    framesToAnimate.shift();
    if( framesToAnimate.length > 0 ) {
      animateFrame();
    }
  }, 20)

  // framesToAnimate
}

function main(element, canvasSize) {

  if( !element || !canvasSize ) {
    console.log("sorry, I need an element and a canvas size");
    return;   
  }

  init(element, canvasSize);
}

return extend(main, {
  render: render,
  morph: morph
});

})();

onMounted(() => {
  if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      state.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      state.theme = "light";
    }

  var element = $ascii.value
  AsciiMorph(element, {x: 16,y: 7});
  if (state.theme == "light") {
    AsciiMorph.render(lux)
  } else {
    AsciiMorph.render(nox)
  }
});

</script>

<template>
  <div>
    <span class="text-white absolute top-0 right-0 m-5 z-10 cursor-pointer hover:opacity-70 " v-if='state.theme == "dark"' @click="themeLight">⠶</span>
    <span class="text-black absolute top-0 right-0 m-5 z-10 cursor-pointer hover:opacity-70 " v-else @click="themeDark">⠢</span>
    <!-- <svg v-if='state.theme == "dark"' @click="themeLight" class="w-6 h-6 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg> -->
    <!-- <svg v-else @click="themeDark" class="w-6 h-6 inline" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg> -->
    <pre ref="$ascii" class="ascii mx-auto mt-5">

    </pre>
  </div>
</template>

<style scoped>

</style>
