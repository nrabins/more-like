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
      query: "my test",
      insult: "This is an insult"
    }
  },
  methods: {
    search: function() {
      if (!this.query || this.query.length === 0)
        return;

      let words = this.query.split(" ");

      

      // Get syllables per word
      var syllablePromises = words.map(word => {
        return fetch(`https://api.datamuse.com/words?sp=${word}&md=s`)
          .then(response => response.json())
          .then(json => {
            return {
              word,
              numSyllables: json[0]['numSyllables']
            }
          })
      })

      let syllableCounts = [];
      Promise.all(syllablePromises).then(results => {
        syllableCounts = results;
        debugger;
      })
      debugger;

      var promises = words.map(word => {
        return fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
          .then(response => response.json())
          .then(json => {
            return "blah";
          });
      })

      Promise.all(promises).then(results => {
        console.log(results)
      })


      // let rhymes = words.map(word => {
      //   fetch(`https://api.datamuse.com/words?rel_rhy=${word}`)
      //     .then(response => response.json())
      //     .then(json => {
      //       return "blah";
      //     });
      // });
      //console.log(rhymes)
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
