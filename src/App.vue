<template>
  <div id="app">
    <div class="input">
      <div>
        What are you excited about? <input v-model="query" placeholder="Dogs">
      </div>
      <button @click="search">Go</button>
    </div>
    <div>
      {{insult}}
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      query: "",
      insult: ""
    }
  },
  methods: {
    search: function(text) {
      if (!text || text.length === 0)
        return;

      console.log('searching')

      // fetch ('https://api.datamuse.com/words?rel_rhy=forgetful')
      //   .then(response => response.json())
      //   .then(json => {
      //     console.log(JSON.stringify(json))
      //   });
      
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
