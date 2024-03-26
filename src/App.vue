<template>
  <div class="main-container">
    <div class="title">
      <img class="jug-img jug-a" src="https://cdn-icons-png.flaticon.com/512/3100/3100566.png">
      <h1 class="jug-title">The Water Jug Puzzle</h1>
      <img class="jug-img jug-b" src="https://cdn-icons-png.flaticon.com/512/3100/3100566.png">
    </div>


    <div class="content">
      <div class="jug-inputs">
        <div class="water-input-container">
          <label for="jugA">Jug A Capacity</label>
          <input 
            type="number" 
            name="jugA" 
            class="water-input"
            :v-model="jugsA" 
            @input="jugsA = parseInt($event.target.value);$event.target.value == ''? $event.target.value = 1 : '' ;"
            min="1"
            max="10000"
          > 
        </div>

        <div class="water-input-container">
          <label for="jugB">Jug B Capacity</label>
          <input 
            type="number" 
            name="jugB" 
            class="water-input"
            :v-model="jugsB" 
            @input="jugsB = parseInt($event.target.value);$event.target.value == ''? $event.target.value = 1 : '' ;"
            min="1"
            max="10000"
          >
        </div>
        <div class="water-input-container">
          <label for="target">Target Amount</label>
          <input 
            type="number" 
            name="target" 
            class="water-input"
            :v-model="targets"
            @input="targets = parseInt($event.target.value);$event.target.value == ''? $event.target.value = 0 : '' ;"
            min="1"
              max="10000"
          >
        </div>
      </div>


    </div>

    <WaterJugAlgorithm :jugA="jugsA" :jugB="jugsB" :target="targets"/>
  </div>

</template>

<script>
import WaterJugAlgorithm from './components/WaterJugAlgorithm.vue'

export default {
  name: 'App',
  components: {
    WaterJugAlgorithm
  },
  data() {
    return {
      jugsA: 1,
      jugsB: 1,
      targets: 1,
    }
  },
  methods: {
    checkInputs(value){
      console.log(value);
    }
  },
}
</script>

<style>

@import './styles/AppStyles.css'
</style>
