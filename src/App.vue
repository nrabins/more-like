<template>
  <div id="app">
    <div class="focus">
      <div class="input">
        <form @submit.prevent="handleSubmit">
          <label>
            <span class="excited-label">I'm excited about...</span>
            <input class="excited-input" ref="query" type="text" :placeholder="placeholder" v-model="query" v-on:keyup="onInputChange"/>
          </label>
          <!-- <button type="submit">Go</button> -->
        </form>
      </div>
      <!-- <div class="loading" v-show="isLoading">Loading</div> -->
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
      insult: "",
      placeholder: ""
    }
  },
  mounted() {
    this.$refs.query.focus();
    const placeholderOptions = ["dogs", "cats", "singing in the rain", "my jammies", "hats", "pokemon go", "absolutely nothing", "making bad websites", "falling in love"];
    this.placeholder = placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];
  },
  methods: {
    handleSubmit() {
      if (!this.query || this.query.length === 0)
        return;
        
      function rfc3986EncodeURIComponent (str) {  
        return encodeURIComponent(str).replace(/[!'()*]/g, escape);  
      }

      let words = this.query.split(" ");
      const wordPromises = words.map(word => {
        return new Promise(resolve => {
          var encodedWord = rfc3986EncodeURIComponent(word);
          fetch(`https://api.datamuse.com/words?sp=${encodedWord}&md=s`)
            .then(response => response.json())
            .then(json => {
              resolve({
                sanitizedWord: json[0]['word'],
                numSyllables: json[0]['numSyllables'],
              });
            })
        });
      });

      Promise.all(wordPromises)
        .then(syllableCounts => {
          const rhymePromises = syllableCounts.map(syllableCount => {
            return new Promise(resolve => {
              fetch(`https://api.datamuse.com/words?rel_rhy=${syllableCount.sanitizedWord}`)
                .then(response => response.json())
                .then(json => {
                  let rhymes = json;
                  rhymes.sort((a, b) => {
                    // sort by syllabic delta, then weight
                    const aDistance = Math.abs(syllableCount.numSyllables - a.numSyllables);
                    const bDistance = Math.abs(syllableCount.numSyllables - b.numSyllables);
                    if (aDistance != bDistance) {
                      // the closer the syllable count, the better
                      return aDistance - bDistance;
                    } else if (a.score && b.score) {
                      // otherwise return the best rhyme
                      return b.score - a.score;
                    } else {
                      // if no score, return the shorter word
                      return a.word.length - b.word.length;
                    }
                  });
                  return resolve(rhymes)
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
    },
    onInputChange() {
      if (this.query.length == 0)
        this.insult = "";
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
  background: radial-gradient(farthest-corner at top left, #ff7ccb, transparent), 
              radial-gradient(farthest-corner at top right, #a1cde6, transparent), 
              radial-gradient(farthest-side at bottom, rgb(251, 241, 99), transparent);
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
  background-color: #ffffffa8;
  padding: 100px;
  border-radius: 4px;
  box-shadow: 0px 0px 20px 0px #88888885;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.focus input {
  border: none;
  border-bottom: 1px solid black;
  background: none;
  margin: 0 10px;
}

.focus input:focus {
  outline: none;
}

.output {
  padding: 40px;
  min-height: 30px;
}

</style>
