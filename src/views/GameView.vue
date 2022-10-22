<script setup>
import {ref} from "vue";
import games from "@/db/games";
import similarity from "string-similarity";

let gameState = ref("pregame");
let gameScore = ref(0);
let gameRound = ref(0);
let gameTimer = ref(null);
let gameTimerCurrent = ref(0);
let gameSettingsTime = ref(60);
let gameRoundGuess = ref({});
let gameRoundGuessInputField = ref();
let gameRoundGuessInput = ref('');
let gameSimilarityAcceptance = 0.75;

function gameStart() {
  console.log("Game Start");

  gameTimerCurrent.value = gameSettingsTime.value;
  gameTimer.value = setInterval(gameTick, 1000);
  gameState.value = "ingame";
  gameNextRound();
};

let gameTick = () => {
  if(gameTimerCurrent.value === 0) {
    gameOver();
  } else {
    gameTimerCurrent.value--;
  }
};

let gameNextRound = () => {
  gameRoundGuessInput.value = "";
  gameRound.value++;
  gameRoundGuess.value = games.getRandomGame();
};

let gameTryGuess = () => {
  console.log(gameRoundGuessInput.value);

  let bestSimilarity = 0;
  let guessText = gameRoundGuessInput.value.trim().toLocaleLowerCase();

  gameRoundGuess.value.titles.forEach(title => {
    let titleText = title.trim().toLowerCase();
    let similarityToInput = similarity.compareTwoStrings(guessText, titleText);

    console.log(similarityToInput);

    if(similarityToInput > bestSimilarity) {
      bestSimilarity = similarityToInput;
    }
  });

  if(bestSimilarity > gameSimilarityAcceptance) {
    console.log("Accepted");

    gameScore.value++;
    gameNextRound();
  } else {
    console.log("Not Accepted");
  }
};

let gameOver = () => {
  if(gameTimer.value !== null) {
    clearInterval(gameTimer.value);
  }

  gameState.value = "results";

  console.log("Game Over");
};

window.addEventListener('keypress', (event) => {
  if(gameState.value === "ingame") {
    gameRoundGuessInputField.value.focus();

    if (event.key === 'Enter') {
      gameTryGuess();
    }
  }
});
</script>

<template>
  <main>
    <div class="box">
      <div class="timer">
        <div>
          <div v-if="['pregame', 'results'].includes(gameState)">
            Time: <input v-model="gameSettingsTime" type="range" step="5" min="10" max="120" /> {{ gameSettingsTime}}<br>
          </div>
          <div v-if="gameState === 'ingame'">
            Time Current: {{ gameTimerCurrent }}<br>
            Score: {{ gameScore }}<br>
            Round: {{ gameRound }}
          </div>
        </div>
        <button
            v-if="gameState !== 'ingame'"
            @click="gameStart"
        >
          Start
        </button>
      </div>

      <div
          v-if="['ingame', 'results'].includes(gameState)"
          class="image-holder"
      >
        <img
            v-if="gameState === 'ingame'"
            :src="'/public/screenshots/' + gameRoundGuess.imageUrl"
        />
        <div
            v-if="gameState === 'results'"
        >
          Game over<br><br>
          Score: {{ gameScore }}
        </div>
      </div>

      <div
          v-if="['ingame', 'results'].includes(gameState)"
          class="input"
      >
        <input
            :disabled="gameState !== 'ingame'"
            type="text"
            v-model="gameRoundGuessInput"
            ref="gameRoundGuessInputField"
        />
      </div>
    </div>
  </main>
</template>

<style lang="scss">
main {
  display: flex;
  justify-content: center;
  align-items: center;

  & .box {
    border: 1px solid rgba(255,255,255,0.14);
    width: 90%;
    max-width: 600px;
    border-radius: 6px;

    & .timer {
      display: grid;
      gap: 15px;
      grid-template-columns: 1fr auto;
      border-bottom: 1px solid rgba(255, 255, 255, 0.14);
      padding: 20px;
      align-items: center;

      & button {
        color: #fff;
        padding: 7px 20px;
        background: rgba(255,255,255,0.14);
        border-radius: 100px;
        font-family: 'Poppins', sans-serif;
        font-size: 16px;

        &:hover {
          background: rgba(255,255,255,0.21);
          cursor: pointer;
        }
      }
    }

    & .image-holder {
      min-height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;

      & img {
        max-width: 90%;
        max-height: 90%;
      }
    }

    & .input {
      border-top: 1px solid rgba(255, 255, 255, 0.14);
      padding: 20px;
      display: grid;

      & input {
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        border-radius: 5px;
        color: #fff;
        padding: 7px 14px;
        background: rgba(255,255,255,0.14);
        border: 0;
      }
    }
  }
}
</style>