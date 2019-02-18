<template>
  <div id="app">
    <div class="focus">
      <div class="input">
        <form @submit.prevent="handleSubmit">
          <label for="query">
            <span class="excited-label">I'm excited about...</span>
            <input
              id="query"
              class="excited-input"
              ref="query"
              type="text"
              :placeholder="placeholder"
              v-model="query"
              v-on:keyup="onInputChange"
            >
          </label>
          <button class="submit-btn" v-if="showSubmit" type="submit">Go</button>
        </form>
      </div>
      <!-- <div class="loading" v-show="isLoading">Loading</div> -->
      <div class="output" v-if="showInsult">{{insult}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";

export default {
  name: "app",
  data() {
    return {
      query: "",
      previousQuery: null,
      placeholder: null,
    };
  },
  created() {
    this.placeholder = this.$store.getters.newPlaceholder(null);
  },
  mounted() {
    this.$refs.query.focus();
  },
  computed: {
    ...mapState(["placeholder", "insult"]),
    showInsult() {
      return this.insult !== "" && this.insult.length > 0;
    },
    showSubmit() {
      return !this.showInsult;
    }
  },
  methods: {
    handleSubmit() {
      if (!this.query || this.query.length === 0) {
        return;
      }

      this.$store.dispatch("generateInsult", this.query).catch(err => {
        alert(err);
      });
    },
    onInputChange() {
      const queryChanged = this.query !== this.previousQuery
      this.previousQuery = this.query;
      if (this.query.length == 0 && queryChanged) {
        this.$store
          .dispatch("clearInsult")
          .then(response => {
            this.placeholder = this.$store.getters.newPlaceholder(this.placeholder);
          })
          .catch(err => {
            alert(err);
          })
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Open+Sans+Condensed:300");

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
  font-family: "Open Sans Condensed", sans-serif;
  font-size: 1.5em;
  display: block;
  margin-left: 40px;
}

.excited-input {
  font-family: "Gloria Hallelujah", cursive;
  text-align: center;
  font-size: 2em;
}

.submit-btn {
  display: block;
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
