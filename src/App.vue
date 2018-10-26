<template>
  <div id="app">
    <TextInput v-bind="{search}" />
    <InsultDisplay v-bind="{insult}" />
  </div>
</template>

<script>
import TextInput from "./components/TextInput.vue";
import InsultDisplay from "./components/InsultDisplay.vue";

export default {
  name: 'app',
  components: {
    TextInput,
    InsultDisplay
  },
  data() {
    return {
      insult: ""
    }
  },
  methods: {
    search: function(text) {
      if (!text || text.length === 0)
        return;

      console.log('searching')

      fetch ('https://api.datamuse.com/words?rel_rhy=forgetful')
        .then(response => response.json())
        .then(json => {
          console.log(JSON.stringify(json))
        });
      
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
