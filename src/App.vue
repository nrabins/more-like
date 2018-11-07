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
    const placeholderOptions = ["3D printing", "Acrobatics", "Acting", "Amateur radio", "Animation", "Aquascaping", "Baking", "Baton twirling", "Beatboxing", "Board/tabletop games", "Book restoration", "Cabaret", "Calligraphy", "Candle making", "Coffee roasting", "Collecting", "Coloring", "Computer programming", "Cooking", "Cosplaying", "Couponing", "Creative writing", "Crocheting", "Cross-stitch", "Crossword puzzles", "Cryptography", "Dance", "Digital arts", "Do it yourself", "Drama", "Drawing", "Electronics", "Embroidery", "Fantasy sports", "Fashion", "Fishkeeping", "Flower arranging", "Foreign language learning", "Gaming (tabletop games and role-playing games)", "Genealogy", "Glassblowing", "Graphic design", "Gunsmithing", "Herp keeping", "Homebrewing", "Hydroponics", "Ice skating", "Jewelry making", "Jigsaw puzzles", "Juggling", "Knife making", "Knitting", "Kombucha brewing", "Lace making", "Lapidary", "Leather crafting", "Lego building", "Listening to music", "Machining", "Macrame", "Magic", "Metalworking", "Model building", "Model engineering", "Needlepoint", "Origami", "Painting", "Philately", "Photography", "Playing musical instruments", "Poi", "Pottery", "Puzzles", "Quilling", "Quilting", "Reading", "Robot combat", "Scrapbooking", "Sculpting", "Sewing", "Singing", "Sketching", "Soapmaking", "Stand-up comedy", "Table tennis", "Taxidermy", "Video game developing", "Video gaming", "Video editing", "Watching movies", "Watching television", "Whittling", "Wood carving", "Woodworking", "Worldbuilding", "Writing", "Yo-yoing", "Yoga", "Air sports", "Archery", "Astronomy", "BASE jumping", "Baseball", "Basketball", "Beekeeping", "Bird watching", "Blacksmithing", "BMX", "Board sports", "Bodybuilding", "Brazilian jiu-jitsu", "Camping", "Canoeing", "Canyoning", "Dowsing", "Driving", "Fishing", "Flag football", "Flying", "Flying disc", "Foraging", "Freestyle football", "Gardening", "Geocaching", "Ghost hunting", "Graffiti", "Handball", "High-power rocketry", "Hiking", "Hooping", "Horseback riding", "Hunting", "Inline skating", "Jogging", "Kayaking", "Kite flying", "Kitesurfing", "LARPing", "Letterboxing", "Longboarding", "Martial arts", "Metal detecting", "Motor sports", "Mountain biking", "Mountaineering", "Mushroom hunting/mycology", "Netball", "Nordic skating", "Orienteering", "Paintball", "Parkour", "Photography", "Polo", "Powerlifting", "Rafting", "Rappelling", "Road biking", "Rock climbing", "Roller skating", "Rugby", "Running", "Sailing", "Sand art", "Scouting", "Scuba diving", "Sculling or rowing", "Shooting", "Shopping", "Skateboarding", "Skiing", "Skimboarding", "Skydiving", "Slacklining", "Snowboarding", "Stone skipping", "Sun bathing", "Surfing", "Swimming", "Taekwondo", "Tai chi", "Topiary", "Travel", "Urban exploration", "Vacation", "Vehicle restoration", "Walking", "Water sports", "Action figure", "Antiquing", "Art collecting", "Book collecting", "Card collecting", "Coin collecting", "Comic book collecting", "Deltiology (postcard collecting)", "Die-cast toy", "Dolls", "Element collecting", "Movie and movie memorabilia collecting", "Perfume", "Phillumeny", "Rail transport modelling", "Record collecting", "Shoes", "Stamp collecting", "Video game collecting", "Vintage cars", "Antiquities", "Auto audiophilia", "Flower collecting and pressing", "Fossil hunting", "Insect collecting", "Magnet fishing", "Metal detecting", "Mineral collecting", "Rock balancing", "Sea glass collecting", "Seashell collecting", "Stone collecting", "Animal fancy", "Badminton", "Baton twirling", "Billiards", "Bowling", "Boxing", "Bridge", "Cheerleading", "Chess", "Color guard", "Curling", "Dancing", "Darts", "Debate", "Eating", "ESports", "Fencing", "Go", "Gymnastics", "Ice skating", "Kabaddi", "Laser tag", "Longboarding", "Mahjong", "Marbles", "Martial arts", "Poker", "Slot car racing", "Speedcubing", "Sport stacking", "Table football", "Volleyball", "Weightlifting", "Wrestling", "Airsoft", "American football", "Archery", "Association football", "Astrology", "Australian rules football", "Auto racing", "Baseball", "Beach volleyball", "Breakdancing", "Climbing", "Cricket", "Cycling", "Disc golf", "Dog sport", "Equestrianism", "Exhibition drill", "Field hockey", "Figure skating", "Fishing", "Footbag", "Golfing", "Handball", "Horseback riding", "Ice hockey", "Judo", "Jukskei", "Kart racing", "Knife throwing", "Lacrosse", "Longboarding", "Marching band", "Model aircraft", "Racquetball", "Radio-controlled car racing", "Roller derby", "Rugby league football", "Sculling or rowing", "Shooting sport", "Skateboarding", "Speed skating", "Squash", "Surfing", "Swimming", "Table tennis", "Tennis", "Tennis polo", "Tether car", "Tour skating", "Triathlon", "Ultimate frisbee", "Volleyball", "Water polo", "Fishkeeping", "Learning", "Meditation", "Microscopy", "Reading", "Shortwave listening", "Videophilia", "Aircraft spotting", "Amateur astronomy", "Birdwatching", "Bus spotting", "Geocaching", "Gongoozling", "Herping", "Hiking/backpacking", "Meteorology", "Photography", "Satellite watching", "Trainspotting", "Traveling", "Whale watching"];
    this.placeholder = placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)].toLowerCase();
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
