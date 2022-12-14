<template>
    <div>
      <h1>Fav App</h1>
        <input class="text-black" type="text" v-model="newFav.name"  placeholder="name">
        <input v-model="newFav.url" type="text" placeholder="url" @keyup.enter="addFav">
        <div class="grid grid-cols-2 mx-auto px-2 gap-3 mt-4 px-2">  
            <div v-for="fav in favs" class="relative bg-azshara-600 rounded-lg hover:opacity-75 border-4 border-azshara-700 hover:border-azshara-800">
                <a target="_blank" class="block my-2" :href="fav.url">
                <img class="w-8 h-8 mx-auto mt-3 mb-3 pixalated" :src="fav.img" alt="favicon">
                <span class="font-bold">{{ fav.name }}</span>
            </a>
            <span class = "cursor-pointer hover:text-red-500 absolute top-0 right-0 mx-2 my-1 text-xl" @click="remFav">⠶</span>
            </div> 
        </div>
        
    </div>
</template>
  
<script>
export default {
  name: 'Fav',
  data() {
    return {
      newFav: {
        name: '',
        img: '',
        url: ''
      },
      favs: []
    }
  },
  methods: {
    remFav() {
        this.favs.pop()
    },
    addFav() {
        //retrieve the favicon of newFav.url ans store it in newFav.img 
        //this.newFav.img = "https://www.google.com/s2/favicons?domain=" + this.newFav.url 
        
        //retrieve the favicon in good resolution and store it in newFav.img
        this.newFav.img = "https://www.google.com/s2/favicons?domain=" + this.newFav.url + "&sz=64"

        this.favs.push(this.newFav)

        this.newFav = {}
    }
  }
}
</script>

<style scoped>
pixelated {
  image-rendering: pixelated;
}
</style>