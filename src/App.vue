<template>
  <div class="bg-azshara-200 dark:bg-azshara-900 text-void-900 dark:text-void-100 min-h-screen text-center transition duration-1000 ease-in-out">
    <div class="w-full h-screen grid grid-cols-3">
      <div class="pt-20 pb-6 pl-6 pr-24">
        <!-- LEFT SIDEBAR -->
        <div class="bg-void-600 dark:bg-void-800 border-0 shadow-lg border-void-600 h-full rounded">
          <corner></corner>
        </div>
      </div>
      <div>
        <!-- CENTER -->
        <div class="mt-20"></div>
        <ascii @themeUpdate="themeUpdate" class="mt-5"></ascii>
      </div>
      <div class="pt-20 pb-6 pr-6 pl-24 grid grid-rows-3 gap-5">
        <!-- RIGHT SIDEBAR -->
        <div class="bg-void-300 dark:bg-void-700 rounded">
          <corner></corner>
        </div>
        <div class="bg-void-600 dark:bg-void-800 border-0 shadow-lg border-void-600 h-full rounded row-span-2">
          <corner></corner>
        </div>
        
      </div>
    </div>
    <div class="absolute top-0 left-0 m-5">
      <span v-if='theme == "dark"' class=" text-azshara-200 text-3xl px-2 py-1 rounded" >𝖓𝖔𝖝 𝖒𝖆𝖝𝖎𝖒𝖆</span>
      <span v-else class=" text-azshara-800 text-3xl px-2 py-1 rounded" >𝖑𝖚𝖝 𝖒𝖎𝖓𝖎𝖒𝖆</span>
    </div>
    <div class="absolute top-0 right-0 m-6">
      <div class="bg-void-200 dark:bg-void-800 px-2 pt-2 pb-1 shadow-lg rounded-lg inline">
        <div class="relative inline">
          <span class="text-xl inline hover:opacity-70 cursor-pointer">⠷</span>
          <!-- <svg class="w-8 h-8 inline hover:opacity-70 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> -->
          <span class="w-1 h-1 absolute top-0 right-0 bg-red-500 z-10 animate-ping rounded-full"></span>
          <span class="w-1 h-1 absolute top-0 right-0 bg-red-500 z-20 rounded-full"></span>
        </div>
        <span class="text-xl inline hover:opacity-70 cursor-pointer ml-2">⠞</span>
        <!-- <svg class="w-8 h-8 inline mx-2 hover:opacity-70 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z" clip-rule="evenodd"></path></svg> -->
        <!-- <svg class="w-8 h-8 inline hover:opacity-70 cursor-pointer" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path></svg> -->
      </div> 
      <span class="text-xl inline mx-4 text-red-500 cursor-pointer hover:opacity-70">⠃</span>
      <!-- <svg class="w-6 h-6 inline mx-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3.707 2.293a1 1 0 00-1.414 1.414l6.921 6.922c.05.062.105.118.168.167l6.91 6.911a1 1 0 001.415-1.414l-.675-.675a9.001 9.001 0 00-.668-11.982A1 1 0 1014.95 5.05a7.002 7.002 0 01.657 9.143l-1.435-1.435a5.002 5.002 0 00-.636-6.294A1 1 0 0012.12 7.88c.924.923 1.12 2.3.587 3.415l-1.992-1.992a.922.922 0 00-.018-.018l-6.99-6.991zM3.238 8.187a1 1 0 00-1.933-.516c-.8 3-.025 6.336 2.331 8.693a1 1 0 001.414-1.415 6.997 6.997 0 01-1.812-6.762zM7.4 11.5a1 1 0 10-1.73 1c.214.371.48.72.795 1.035a1 1 0 001.414-1.414c-.191-.191-.35-.4-.478-.622z"></path></svg> -->
    </div>
    
    
    <pre id="asciimorph" ></pre>
    
    
    
     
    <!-- <router-view></router-view> -->
    <!-- <h1 class="mt-16">Made with ❤ by nonobstant</h1> -->
  </div>
  
</template>

<script>
import ascii from '@/components/ascii.vue'
import corner from '@/components/corner.vue'

export default {
  components : {ascii,corner},
  data() {
    
    return {
      theme: ""
    }
  },
  methods : {
    themeUpdate(value) {
      this.theme = value
    }
    
  },
  mounted() {
    //theme setup
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      this.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      this.theme = "light";
    }
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap');

.ascii {
  width: max-content;
  height: max-content;
  font-family: monospace;
  font-size: 12px;
  line-height: 1!important;
}
/* hello */
.border-3 {
  border-width: 3px;
}
</style>
