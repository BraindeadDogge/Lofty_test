<!-- components/SnakeGame.vue -->

<template>
  <div>
    <select name="difficulty" id="difficulty" v-model="difficulty" @change="setDifficulty">
      <option :value="1">Easy</option>
      <option :value="2">Medium</option>
      <option :value="3">Hard</option>
      <option :value="4">Super Hard(don't try)</option>
    </select>

    <div class="game-board">
      <div v-for="(row, y) in gameBoard" :key="y" class="row">
        <div v-for="(cell, x) in row" :key="x" class="cell"
          :class="{ 'snake-cell': isSnake(x, y), 'apple-cell': isApple(x, y) }"></div>
      </div>
    </div>
    <div class="score-board">
      Score: {{ score }}
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['gameBoard', 'snake', 'apple', 'score']),
    difficulty: {
      get() {
        return this.$store.state.difficulty;
      },
      set(value) {
        this.$store.commit('setDifficulty', value);
      },
    },
  },
  methods: {
    ...mapMutations(['moveSnake', 'changeDirection']),
    isSnake(x, y) {
      return this.snake.some(part => part.x === x && part.y === y);
    },
    isApple(x, y) {
      return this.apple.x === x && this.apple.y === y;
    },
    handleKeydown(e) {
      if (e.key.startsWith('Arrow')) {
        this.changeDirection(e.key.toUpperCase());
      }
    },
    stopGame() {
      this.$store.commit('stopGame');
      clearInterval(this.$store.state.gameInterval);
    },
    setDifficulty(event) {
      this.difficulty = event.target.value;
      event.target.blur();
    },
  },
  mounted() {
    this.gameInterval = setInterval(() => {
      this.$store.dispatch('updateGame');
    }, this.$store.state.moveInterval);

    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeDestroy() {
    clearInterval(this.gameInterval);
    window.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}

.row {
  display: flex;
}

.cell {
  width: 20px;
  height: 20px;
  border: 1px solid #000;
}

.snake-cell {
  background: #000;
}

.apple-cell {
  background: #f00;
}

.score-board {
  margin-top: 20px;
  font-size: 20px;
}
</style>

