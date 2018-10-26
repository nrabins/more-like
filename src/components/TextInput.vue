<template>
  <div class="input-container">
    <div>
      What are you excited about? <input v-model="excitedThing" placeholder="Dogs">
    </div>
    <button @click="handleSearch">Go</button>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: [
    'search'
  ],
  data() {
    return {
      excitedThing: "test"
    }
  },
  methods: {
    handleSearch: function() {
      this.$props.search(this.excitedThing)
    }
  }
}
</script>

<style>

</style>
