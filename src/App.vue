<template>
  <div id="app">
    <div class="focus">
      <div class="input">
        <form @submit.prevent="handleSubmit">
          <label>
            <span class="excited-label">I'm excited about...</span>
            <input class="excited-input" ref="query" type="text" v-model="query" />
          </label>
          <!-- <button type="submit">Go</button> -->
        </form>
      </div>
      <div class="output">
        {{insult}}
      </div>
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
  mounted() {
    this.$refs.query.focus();
  },
  methods: {
    handleSubmit: function() {
      if (!this.query || this.query.length === 0)
        return;

      let words = this.query.split(" ");

      const wordPromises = words.map(word => {
        return new Promise(resolve => {
          fetch(`https://api.datamuse.com/words?sp=${word}&md=s`)
            .then(response => response.json())
            .then(json => {
              resolve({
                word,
                numSyllables: json[0]['numSyllables']
              });
            })
        });
      });

      Promise.all(wordPromises)
        .then(syllableCounts => {
          const rhymePromises = syllableCounts.map(syllableCount => {
            return new Promise(resolve => {
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
        });   
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Open+Sans+Condensed:300');

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  overflow: hidden;
  color: #2c3e50;
  background: radial-gradient(farthest-corner at top left, #afff7c, transparent), 
              radial-gradient(farthest-corner at top right, #e6c8a1, transparent), 
              radial-gradient(farthest-side at bottom, rgb(241, 233, 118), transparent);
  display: flex;
  justify-content: center;
  align-items: center;
}

.excited-label {
  font-family: 'Open Sans Condensed', sans-serif;
  font-size: 1.5em;
}

.excited-input {
  font-family: 'Gloria Hallelujah', cursive;
  text-align: center;
  font-size: 2em;
}

.focus {
  background-color: antiquewhite;
  padding: 100px;
  border: 1px #d0bd8a solid;
  border-radius: 4px;
  box-shadow: 0px 0px 20px 0px #88888885;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.focus input {
  border: none;
  border-bottom: 2px solid black;
  background: none;
  margin: 0 10px;
}

.focus input:focus {
  outline: none;
}

.output {
  padding: 40px;
}

</style>
