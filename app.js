'use strict';

// this function holds all other functions
function main() {
  console.log('main is working');

  // // updates the score counter each time a question is answered correctly
  function updateScore(newScore) {
    // 1++ to STORE.score and interface score counter each time user correctly answers a questions

    STORE.score = newScore;

    $('.score').text(`Score: ${STORE.score}`);

    console.log('update score works');
  }

  // updates the counter displaying how many questions the user has answered out of the total # of questions
  function updateQuestionNum(questionProgress) {
    // 1++ to STORE.currentQuestion and interface question number counter each time user reaches a new question

    STORE.currentQuestion = questionProgress;

    $('.question-number').text(`Question: ${STORE.currentQuestion}/${STORE.allQuestions.length}`);

    console.log('update question number works');
  }

  // allows user to proceed beyond the initial landing page
  function beginQuiz() {
    console.log('Begin quiz 1 of 2');
    // when user hits start button, score counter is updated to 0, start page content is removed, nextQuestion funtion is called to bring user to the first question

    $('#quiz').on('submit', (e) => {
      e.preventDefault();
      $('#quiz').off('submit');

      updateScore(0);

      $('.start-content').remove();

      nextQuestion();
    });
    console.log('Begin quiz 2 of 2');
  }

  // determines the next display; either next question, or results view
  function nextQuestion() {
    // upon a submit action, user moves to the next question, or if all questions have been answered, moves to results

    console.log('next question 1 of 2');

    if (STORE.currentQuestion < STORE.allQuestions.length) {
      updateQuestionNum(STORE.currentQuestion + 1);
      renderQuestion();
    } else {
      $('.question-content').empty();
      $('.results-content').add(results());
    }

    console.log('next question 2 of 2');
  }

  // displays question, answer options, and submit button
  function renderQuestion() {
    // based on the current index of STORE.allQuestions, will display a question followed by four radio button answer options
    // user can select an answer and submit via the button when ready

    let i = STORE.currentQuestion - 1;
    let listElements = '';

    for (let j = 0; j < STORE.allQuestions[i].answers.length; j++) {
      let answerOption = STORE.allQuestions[i].answers[j];
      if (j === 0) {
        listElements += `
        <li>
          
          <input type="radio" name="answers" value="${answerOption}" checked>
          <span class="answers">${answerOption}</span>
        </li>`;
      } else {
        listElements += `
        <li>
          <input type="radio" name="answers" value="${answerOption}">
           <span class="answers">${answerOption}</span>
        </li>`;
      }
    }

    $('.question-content').html(` 
      <ul><h2>${STORE.allQuestions[i].question}</h2>
        ${listElements}
      </ul> 
      <button type="submit" class="submitAns">Submit answer</button>
    `);

    answerFeedback(i);

    console.log('render question is working');
  }

  // captures the chosen answer and displays feedback on whether the user is correct/incorrect
  function answerFeedback(currentQuestionIndex) {
    // listens for submit, compares selected answer against true answer
    // displays feedback message and image
    // updates score counter if correct answer is chosen

    $('#quiz').on('submit', (e) => {
      e.preventDefault();
      $('#quiz').off('submit');
      let userInput = $('input[name=\'answers\']:checked').val();
      let correctAnswer = STORE.allQuestions[currentQuestionIndex].correctAns;
      $('.question-content').empty();
      if (userInput === correctAnswer) {
        $('.submission-response').html(
          `<h3 class="true">Pass completed! Way to go!</h3>
          <img src="imgs/correct_highfive.jpeg" alt="Colts players high-fiving" class="images" width="300px">
          <br></br>
          <button type='submit' class='next'>Next question</button>`
        );

        updateScore(STORE.score + 1);
      } else {
        $('.submission-response').html(
          `<h3 class="false">Wrong: 10-yard penalty!</h3>
          <img src="imgs/wrong_holding.jpg" alt="referee calling a holding penalty" class="images" width="300px">
          <h4>The correct answer is <span class="correctAns">${STORE.allQuestions[currentQuestionIndex]
    .correctAns}</span>.</h4>
          <button type='submit' class='next'>Next question</button>`
        );
      }
      if (STORE.allQuestions[currentQuestionIndex] === STORE.allQuestions[6]) {
        if (userInput === correctAnswer) {
          $('.submission-response').html(
            `<h3 class="true">Pass completed! Way to go!</h3>
          <img src="imgs/correct_highfive.jpeg" alt="Colts players high-fiving" class="images" width="300px">
          <br></br>
          <button type=\'submit\' class=\'next\'>view your results</button>`
          );
        } else {
          $('.submission-response').html(
            `<h3 class="false">Wrong: 10-yard penalty!</h3>
          <img src="imgs/wrong_holding.jpg" alt="referee calling a holding penalty" class="images" width="300px">
          <h4>The correct answer is ${STORE.allQuestions[currentQuestionIndex].correctAns}.</h4>
          <button type='submit' class='next'>view your results</button>`
          );
        }

        console.log('final question');
      }

      $('#quiz').on('submit', (e) => {
        e.preventDefault();
        $('#quiz').off('submit');
        $('.submission-response').empty();
        nextQuestion();
      });
    });
  }

  // generates final screen where final score and specific message based on how well user did displays
  function results() {
    // display score and currentQuestion counters
    // display final message based on score
    // display restart button

    let resultMessage = '';
    if (STORE.score >= 5) {
      resultMessage = `Great job, sport! You earned <span class="goodScore">${STORE.score}</span>/${STORE
        .allQuestions.length} points!
      <br></br>  
      <img src='imgs/victory_colts.jpg' alt='Colts player celebrates on the field as confetti rains down' class='victory' width='600px'>`;
    } else if (STORE.score < 5 && STORE.score >= 3) {
      resultMessage = `Good effort, rookie! You earned <span class="ehhScore">${STORE.score}</span>/${STORE
        .allQuestions.length} points.
      <br></br> 
      <img src='imgs/nicetry_colts.jpg' alt='two football players in a brief encouraging embrace' class='victory' width='600px'>`;
    } else if (STORE.score < 3) {
      resultMessage = `You've been benched for earning only <span class="badScore">${STORE.score}</span>/${STORE
        .allQuestions.length} points this game!
      <br></br>  
      <img src='imgs/defeat_colts.jpg' alt='a football player sits alone on the field' class='victory' width='600px'>`;
    }
    console.log(`${resultMessage}`);

    $('.results-content').html(
      `    
            <div class="results-msg">
              <h4>${resultMessage}</h4>           
            </div>

            <div class="restart-button">             
              <button type="submit" id="restart"> Restart Quiz </button>    
            </div>
        `
    );
    $('#quiz').on('submit', (e) => {
      e.preventDefault();
      $('quiz').off('submit');
      console.log('WHAT UP');
      restartQuiz();
    });
  }

  // reset score and question number counters when user wants to replay the quiz
  function resetStats() {
    // set both STORE.score and STORE.currentQuestion back to original values
    // reset both score and question number counters in DOM

    STORE.score = 0;
    STORE.currentQuestion = 1;
    $('.score').text(`Score: ${STORE.score}`);
    $('.question-number').text(`Question: ${STORE.currentQuestion}/${STORE.allQuestions.length}`);
  }

  // gives the user the chance to take the quiz again from the beginning, once they have completed the quiz
  function restartQuiz() {
    // clicking restart button resets score and currentQuestion counters
    // re-renders quiz from the first question

    console.log('restartQuiz is working');

    resetStats();

    $('.results-content').empty();
    $('.question-content').html(renderQuestion());
  }
  beginQuiz();
}
console.log('first line of js');

$(main);
