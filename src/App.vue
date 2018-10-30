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
      insult: "This is an insult"
    }
  },
  methods: {
    search: function() {
      if (!this.query || this.query.length === 0)
        return;

      let words = this.query.split(" ");

      const wordPromises = words.map(word => {
        return new Promise((resolve, reject) => {
          fetch(`https://api.datamuse.com/words?sp=${word}&md=s`)
            .then(response => response.json())
            .then(json => {
              resolve({
                word,
                numSyllables: json[0]['numSyllables']
              });
            })
        });
      })

      Promise.all(wordPromises)
        .then(syllableCounts => {
          const rhymePromises = syllableCounts.map(syllableCount => {
            return new Promise((resolve, reject) => {
              fetch(`https://api.datamuse.com/words?rel_rhy=${syllableCount.word}`)
                .then(response => response.json())
                .then(json => {
                  resolve(json.filter(potentialRhyme => {
                    return potentialRhyme['numSyllables'] == syllableCount.numSyllables;
                  }));
                })
            })
          });

          Promise.all(rhymePromises)
            .then(potentialInsultWords => {
              
              const insultVersion = potentialInsultWords
                .map(potentialInsultWord => potentialInsultWord[0].word || '???')
                .join(' ');

              this.insult = `'${this.query}'? More like '${insultVersion}'`;
            })
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
