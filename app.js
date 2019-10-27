'use strict';

function main() {
  console.log('inside main');
  // Render!
  function renderQuiz() {
    // html elements go here
  }

  // resets score and question # counters
  function resetStats() {
    // will make sure that score and question # counters are empty at the start of the quiz
    $('.start').on('submit', (e) => {
      STORE.score = 0;
      STORE.currentQuestion = 0;
      renderQuiz();
      console.log('render stats is working');
    });
  }

  // updates the score counter each time a question is answered correctly
  function updateScore() {
    // 1++ to STORE.score each time user correctly answers a questions (function correct() called)
  }

  // updates the counter displaying how many questions the user has answered out of the total # of questions
  function updateQuestionNum() {
    // 1++ to STORE.currentQuestion each time user reaches a new question (function nextQuestion())
  }

  // allows user to start the quiz
  function beginQuiz() {
    console.log('Begin quiz');
    // when user hits start button, resetStats is called and quiz is rendered
    $('#quiz').submit('.start', (e) => {
      e.preventDefault();
      $('.start-content').remove();
      renderQuestion();
    });
  }

  function renderQuestion() {
    $('.score').text(`Score: ${STORE.score}`);
    $('.question-number').text(`Question: ${STORE.currentQuestion}/${STORE.allQuestions.length}`);

    let i = STORE.currentQuestion;
    let listElements = '';

    for (let j = 0; j < STORE.allQuestions[i].answers.length; j++) {
      listElements += `<li><input type="radio" class="inputs" name="answers" required ><p class="questionNames">${STORE
        .allQuestions[i].answers[j]}</p></input></li>`;
    }
    $('.question-content').html(` 
      <ul><h2>${STORE.allQuestions[i].question}</h2>
      ${listElements}
      </ul> 
    `);
    $('<button type="submit" class="submitAns">submit answer</button >').appendTo('.button-row');
    $('#quiz').submit('.submitAns', (e) => {
      e.preventDefault();
      submitAnswer();
    });
  }

  // user submits an answer (not -- on.('click') --)
  function submitAnswer() {
    // when user submits an answer, grab input

    $('.question-content').remove();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    console.log(answer);
    let correct = STORE['currentQuestion'].correctAns;
    console.log(correct);
    if (answer === correct) {
      correct();
    } else {
      wrong();
    }
    nextQuestion();
  }

  // the display shown if user answers correctly
  function correct() {
    // after submitAnswer, if correct/check against properties in the STORE/, display message stating so, and flash the box? window? a lighter blue
    // call update score
    console.log('the answer is correct');
  }

  // the display shown if user answers incorrectly; flash silver
  function wrong() {
    // after submitAnswer, if incorrect/check against properties in the STORE/, display message stating so, and flash the box? window? a lighter blue
    console.log('the answer is wrong');
  }

  // generates next question
  function nextQuestion() {
    // when user clicks the Next button, move to the next object in the store
    // add if else statement: if there are no more questions left, call function results()if (questionNumber < STORE.length) {
    if (currentQuestion < `${STORE.allQuestions.length}`) {
      console.log('next question');
      return renderQuestion(currentQuestion);
    } else {
      $('.questionBox').hide();
      console.log('final score is working');
      $('.questionNumber').text(10);
    }
  }

  // generates final screen, including score, and congratulations or defeat message
  function results() {
    // display score and currentQuestion counters
    // display final message based on score?
    // display restart button
  }

  // gives the user the chance to take the quiz again from the beginning, once they have completed the quiz
  function restartQuiz() {
    // clicking restart button resets score and currentQuestion counters
    // re-renders quiz from the beginning
  }

  // function createQuiz() {
  //   beginQuiz();
  //   submitAnswer();
  //   updateQuestionNum();
  //   updateScore();
  // }

  beginQuiz();
}
console.log('first line of js');

$(main);
