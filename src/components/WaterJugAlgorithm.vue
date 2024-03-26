<template>
  <div class="algorithm-display">

    <button v-if="showButton" type="button" id="solve-button" @click="checkSolvableFirst()">Solve Puzzle</button>

    <h2 v-if="solutionPath.length > 1">Solution Path</h2>
    <div v-if="msg" class="msg">
      {{ msg }}
    </div>
    <div v-if="solutionPath.length > 1" class="solution-path">
      <template v-for="step in solutionPath" :key="step">
        <div class="step">
          {{ step }}
        </div>
      </template>

    </div>
  </div>
</template>

<script>
export default {
  name: 'WaterJugAlgorithm',
  props:{
    jugA:{
      type: Number,
      default: 1
    },
    jugB:{
      type: Number,
      default: 1
    },
    target:{
      type: Number,
      default: 1
    },
  },
  data() {
    return {
      msg: null,
      jugState:[0,0],
      isSolved:false,
      queue:[
        {
          state: [0,0],
          parent: null,
          action: 'Initial State',
        }
      ],
      qIndex:0,
      optionsDone:{
        'fillA':false,
        'fillB':false,
        'emptyA':false,
        'emptyB':false,
        'transferA':false,
        'transferB':false,
      },
      finalStep:null,
      solutionPath:[],
      showButton:false
    }
  },
  methods: {
    gcd(a,b){
      if (b == 0)
        return a;
      return this.gcd(b, a % b);

    },
    checkSolvableFirst(){
      this.isSolved = false
      if(
        (this.target % this.gcd(this.jugA, this.jugB)) != 0 
        || (this.target > this.jugA && this.target > this.jugB)
      ){
        this.msg = 'There is no solution for this values'
        this.solutionPath = []
      }else{
        this.msg = null
        this.solvePuzzle()
      }
    },
    restartQ(){
      this.queue = [
        {
          state: [0,0],
          parent: null,
          action: 'Initial State',
        }
      ]
      this.qIndex = 0
      this.jugState = [0,0]
      this.solutionPath = []
      this.finalStep = null
      this.optionsDone = {
        'fillA':false,
        'fillB':false,
        'emptyA':false,
        'emptyB':false,
        'transferA':false,
        'transferB':false,
      }
    },
    solvePuzzle(){
      this.restartQ()
      while(this.qIndex < this.queue.length){

        let currentState = structuredClone(this.queue[this.qIndex])

        this.optionsDone = {
          'fillA':false,
          'fillB':false,
          'emptyA':false,
          'emptyB':false,
          'transferA':false,
          'transferB':false,
        }

        for (let i = 0; i < 5; i++) {
          this.doOption(currentState, i)
        }
      
        this.qIndex++

        if (this.isSolved) {
          this.solutionPath = [...new Set(this.solutionPath)].reverse()
          break;
        }
      }
    },
    doOption(jugState,option){
      switch (option) {
        case 0:
          this.fillJugA(jugState)
          break;
        case 1:
          this.fillJugB(jugState)
          break;
        case 2:
          this.emptyJugA(jugState,0)
          break;
        case 3:
          this.emptyJugB(jugState,1)
          break;
        case 4:
          this.transferJugA(jugState,0)
          break;
        case 5:
          this.transferJugB(jugState,1)
          break;
      }
    },
    checkFound(step){
      let foundState = false
      for (let i = 0; i < this.queue.length; i++) {
        if(!foundState){
          let qState = structuredClone(Array.from(this.queue[i].state))
          if(qState.toString() === (step.state).toString()){
            foundState = true
            break
          };
        }
      }
      if(!foundState){
        if (step.state[0] == this.target || step.state[1] == this.target) {
          this.finalStep = step
          this.getSolutionPath(this.finalStep)
          this.isSolved = true
        }
        this.queue.push(step)
      }
    },
    getSolutionPath(step){
      for (const parent in step) {
        if (typeof step[parent] == "object" && step[parent] !== null){
          this.solutionPath.push(`${step.action} (${step.state})`)
          this.getSolutionPath(step[parent]);
        }
      }
    },
    fillJugA(jugCurrent){
      if(jugCurrent.state[0] != this.jugA && this.optionsDone.fillA == false){
        let tempParent = structuredClone(jugCurrent)

        let newState = [structuredClone(this.jugA),structuredClone(jugCurrent.state[1])]

        let step = {
          state: newState,
          parent: tempParent,
          action: 'Fill Jug A'
        }
        this.optionsDone.fillA = true
        this.checkFound(step)
      }
    },
    fillJugB(jugCurrent){
      if(jugCurrent.state[1] != this.jugB && this.optionsDone.fillB == false){
        let tempParent = structuredClone(jugCurrent)

        let newState = [structuredClone(jugCurrent.state[0]),structuredClone(this.jugB)]

        let step = {
          state: newState,
          parent: tempParent,
          action: 'Fill Jug B'
        }
        this.optionsDone.fillB = true
        this.checkFound(step)
      }
    },
    emptyJugA(jugCurrent){
      if(jugCurrent.state[0] != 0 && this.optionsDone.emptyA == false){
        let tempParent = structuredClone(jugCurrent)

        let newState = [0,structuredClone(jugCurrent.state[1])]

        let step = {
          state: newState,
          parent: tempParent,
          action: 'Empty Jug A'
        }
        this.optionsDone.emptyA = true
        this.checkFound(step)
      }
    },
    emptyJugB(jugCurrent){
      if(jugCurrent.state[1] != 0 && this.optionsDone.emptyB == false){
        let tempParent = structuredClone(jugCurrent)

        let newState = [structuredClone(jugCurrent.state[0]),0]

        let step = {
          state: newState,
          parent: tempParent,
          action: 'Empty Jug B'
        }
        this.optionsDone.emptyB = true
        this.checkFound(step)
      }
    },
    transferJugA(jugCurrent){

      if(jugCurrent.state[0] > 0 && jugCurrent.state[1] != this.jugB && this.optionsDone.transferA == false){
        
        let space = this.getSpaceOnJug(jugCurrent.state[0], jugCurrent.state[1], this.jugB)

        if(jugCurrent.state[0] - space < 0 || jugCurrent.state[1] + space > this.jugB ) return

        let tempParent = structuredClone(jugCurrent)

        let jugB = jugCurrent.state[1] += space
        let jugA = jugCurrent.state[0] -= space


        let newState = [jugA,jugB]

        let step = {
          state: newState,
          parent: tempParent,
          action: 'Transfer A to B'
        }
        this.optionsDone.transferA = true
        this.checkFound(step)
      }

    },
    transferJugB(jugCurrent){
      if(jugCurrent.state[1] > 0 && jugCurrent.state[0] != this.jugA && this.optionsDone.transferB == false){
        let space = this.getSpaceOnJug(jugCurrent.state[0], jugCurrent.state[1], this.jugA)
        if(jugCurrent.state[1] - space < 0 || jugCurrent.state[0] + space > this.jugA) return

        let tempParent = structuredClone(jugCurrent)

        let jugA = jugCurrent.state[0] += space
        let jugB = jugCurrent.state[1] -= space


        let newState = [jugA,jugB]

        let step = {
          state: newState,
          parent: tempParent,
          action: 'Transfer B to A'
        }
        this.optionsDone.transferB = true
        this.checkFound(step)
      }
    },
    getSpaceOnJug(from, to, toCap ){
      return Math.min(from,toCap - to)
    },
    checkButton(){
      let checkA = false
      let checkB = false
      let checkTarget = false
      if(this.jugA != 0 && this.jugA > 0 && this.jugA != null && this.jugA != undefined) checkA = true
      if(this.jugB != 0 && this.jugB > 0 && this.jugB != null && this.jugB != undefined) checkB = true
      if(this.target != 0 && this.target != 0 && this.target != null && this.target != undefined) checkTarget = true

      if(checkA && checkB && checkTarget) this. showButton = true
    }
  },
  watch:{
    jugA(){
      this.checkButton()
    },
    jugA(){
      this.checkButton()
    },
    target(){
      this.checkButton()
    },
  }
}
</script>