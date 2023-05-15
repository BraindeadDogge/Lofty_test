import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = () =>
  new Vuex.Store({
    state: {
      gameBoard: Array(20).fill(Array(20).fill(null)),
      snake: [{ x: 10, y: 10 }],
      direction: "",
      gameInProgress: false,
      apple: { x: 0, y: 0 },
      score: 0,
      hasMoved: false,
    },
    mutations: {
      moveSnake(state) {
        let head = { ...state.snake[0] }; // copy head

        switch (state.direction) {
          case "UP":
            head.y = head.y <= 0 ? 19 : head.y - 1;
            break;
          case "DOWN":
            head.y = head.y >= 19 ? 0 : head.y + 1;
            break;
          case "LEFT":
            head.x = head.x <= 0 ? 19 : head.x - 1;
            break;
          case "RIGHT":
            head.x = head.x >= 19 ? 0 : head.x + 1;
            break;
        }

        // anti collision with self
        if (
          state.snake.some(
            (segment, index) =>
              index !== 0 && segment.x === head.x && segment.y === head.y
          )
        ) {
          alert(`Game Over! Your score is ${state.score}`);
          state.gameInProgress = false;
          state.score = 0;
          state.snake = [{ x: 10, y: 10 }];
          state.direction = "ARROWUP";
          return;
        }

        if (head.x === state.apple.x && head.y === state.apple.y) {
          // snake ate the apple
          state.apple = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20),
          };
          state.score++;
        } else {
          state.snake.pop(); // remove tail if no apple was eaten
        }

        state.snake.unshift(head);
        // reset the flag
        state.hasMoved = false;
      },

      changeDirection(state, newDirection) {
        newDirection = newDirection.replace("ARROW", "");

        const opposites = {
          UP: "DOWN",
          DOWN: "UP",
          LEFT: "RIGHT",
          RIGHT: "LEFT",
        };

        // prevent the snake from reversing its direction if it has more than one segment
        if ((state.snake.length > 1 && opposites[newDirection] === state.direction) || state.hasMoved) {
          return;
        }

        state.direction = newDirection;

        // after changing direction, set the flag
        state.hasMoved = true;
      },

      startGame(state) {
        state.gameInProgress = true;
      },

      stopGame(state) {
        state.gameInProgress = false;
      },
    },
  });

export default store;
