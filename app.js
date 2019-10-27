'use strict';

function main() {
  console.log('main is working');

  // // updates the score counter each time a question is answered correctly
  function updateScore(newScore) {
    // 1++ to STORE.score each time user correctly answers a questions (function correct() called)
    STORE.score = newScore;

    $('.score').text(`Score: ${STORE.score}`);

    console.log('update score works');
  }

  // updates the counter displaying how many questions the user has answered out of the total # of questions
  function updateQuestionNum() {
    // 1++ to STORE.currentQuestion each time user reaches a new question (function nextQuestion())
    STORE.currentQuestion++;
  }

  // allows user to start the quiz
  function beginQuiz() {
    console.log('Begin quiz 1 of 2');
    // when user hits start button, resetStats is called and quiz is rendered

    $('#quiz').on('submit', (e) => {
      e.preventDefault();
      $('#quiz').off('submit');

      updateScore(0);
      $('.start-content').remove();

      renderQuestion();
    });
    console.log('Begin quiz 2 of 2');
  }

  function renderQuestion() {
    $('.question-content').show();
    $('.question-number').text(`Question: ${STORE.currentQuestion}/${STORE.allQuestions.length}`);

    let i = STORE.currentQuestion - 1;
    let listElements = '';

    for (let j = 0; j < STORE.allQuestions[i].answers.length; j++) {
      let answerOption = STORE.allQuestions[i].answers[j];
      if (j === 0) {
        listElements += `
        <li>
          <input type="radio" name="answers" value="${answerOption}" checked>
          ${answerOption}
        </li>`;
      } else {
        listElements += `
        <li>
          <input type="radio" name="answers" value="${answerOption}">
          ${answerOption}
        </li>`;
      }
    }

    $('.question-content').html(` 
      <ul>${STORE.allQuestions[i].question}
        ${listElements}
      </ul> 
      <button type="submit" class="submitAns">submit answer</button>
    `);

    submitAnswer(i);

    console.log('render question is working');
  }

  // user submits an answer (not -- on.('click') --)
  function submitAnswer(currentQuestionIndex) {
    // when user submits an answer, grab input
    console.log('submit answer 1 of');

    $('#quiz').submit('.submitAns', (e) => {
      e.preventDefault();
      let userInput = $('input[name=\'answers\']:checked').val();
      let correctAnswer = STORE.allQuestions[currentQuestionIndex].correctAns;
      console.log(userInput);

      if (userInput === correctAnswer) {
        console.log('you are right!');
        rightAns();
      } else {
        console.log('wrong');
        wrongAns();
      }
    });
  }

  function rightAns() {
    // after submitAnswer, if correct/check against properties in the STORE/, display message stating so, and flash the box? window? a lighter blue
    // call update score
    console.log('right answer 1 of 2');
    $('.submission-response').show();
    $('.question-content').hide();
    $('.submission-response').html(
      `<h4>Way to go!</h4>
      <button type='button' class='next'>Next question</button>`
    );
    nextQuestion();
    updateScore(STORE.score + 1);
    console.log('right answer 2 of 2');
  }

  // the display shown if user answers incorrectly; flash silver
  function wrongAns() {
    // after submitAnswer, if incorrect/check against properties in the STORE/, display message stating so, and flash the box? window? a lighter blue
    $('.submission-response').show();
    $('.question-content').hide();
    $('.submission-response').html(
      `<h4>CMON MAN!</h4>
      <button type='button' class='next'>Next question</button>`
    );
    nextQuestion();
  }

  // generates next question
  function nextQuestion() {
    // when user clicks the Next button, move to the next object in the store
    // add if else statement: if there are no more questions left, call function results()
    $('.submission-response').click('.next', (e) => {
      $('.submission-response').hide();
      e.preventDefault();
      console.log('next question 1 of 2');
      if (STORE.currentQuestion < STORE.allQuestions.length) {
        renderQuestion();
        updateQuestionNum();
      } else {
        $('.question-content').remove();
        $('.results-content').add(results());
      }

      console.log('next question 2 of 2');
    });
  }

  // generates final screen, including score, and congratulations or defeat message
  function results() {
    // display score and currentQuestion counters
    // display final message based on score?
    // display restart button
    $('.question-content').remove();
    let resultMessage = '';
    if (STORE.score >= 5) {
      resultMessage = `Great job, sport! You earned ${STORE.score}/${STORE.allQuestions.length} points!`;
    } else if (STORE.score < 5 && STORE.score >= 3) {
      resultMessage = `Good effort, rookie! You earned ${STORE.score}/${STORE.allQuestions.length} points.`;
    } else if (STORE.score < 3) {
      resultMessage = `You've been benched for earning only ${STORE.score}/${STORE.allQuestions
        .length} points this game!`;
    }
    console.log(`${resultMessage}`);

    $('.results-content').html(
      `<div class="results">
        <form id="js-restart-quiz">      
            <div class="results-msg">
              <legend>${resultMessage}</legend>           
            </div>
            <div class="restart-button">             
              <button type="button" id="restart"> Restart Quiz </button>    
            </div>
        </form>
       </div>`
    );
    restartQuiz();
  }

  // resets score and question # counters
  function resetStats() {
    // will make sure that score and question # counters are empty at the start of the quiz
    console.log('reset stats 1 of 2');
    $('#start').on('submit', (e) => {
      e.preventDefault();
      STORE.score = 0;
      STORE.currentQuestion = 0;
      console.log('reset stats 2 of 2');
    });
  }

  // gives the user the chance to take the quiz again from the beginning, once they have completed the quiz
  function restartQuiz() {
    // clicking restart button resets score and currentQuestion counters
    // re-renders quiz from the beginning
    console.log('restart 1 of');
    $('#quiz').on('submit', (e) => {
      e.preventDefault();
      resetStats();
      location.reload(true);
    });

    console.log('restart 2 of');
  }

  beginQuiz();
}
console.log('first line of js');

$(main);
