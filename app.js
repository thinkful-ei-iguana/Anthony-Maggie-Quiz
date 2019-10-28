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
  

  // // updates the counter displaying how many questions the user has answered out of the total # of questions
  function updateQuestionNum(questionProgress) {
  //   // 1++ to STORE.currentQuestion each time user reaches a new question (function nextQuestion())
  
    STORE.currentQuestion = questionProgress;

    $('.question-number').text(`Question: ${STORE.currentQuestion}/${STORE.allQuestions.length}`);
    
    console.log('update question number works');
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
      
      nextQuestion();      
    });
    console.log('Begin quiz 2 of 2');
  }




  function renderQuestion() {
    
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
      <button type="submit" class="submitAns">Submit answer</button>
    `);
    
    answerFeedback(i);

    console.log('render question is working');
  }

  


  function answerFeedback(currentQuestionIndex) {
    $('#quiz').on('submit', (e) => {
      e.preventDefault();
      $('#quiz').off('submit');
      let userInput = $('input[name=\'answers\']:checked').val();
      let correctAnswer = STORE.allQuestions[currentQuestionIndex].correctAns;
      $('.question-content').empty();
      if (userInput === correctAnswer) {
        
        $('.submission-response').html(
          `<h3>Pass completed! Way to go!</h3>
          <img src="imgs/correct_highfive.jpeg" alt="Colts players high-fiving" title="Colts players high-fiving" class="images" width="300px">
          <br></br>
          <button type='submit' class='next'>Next question</button>`
        );
      
        updateScore(STORE.score + 1);
      } else {
        $('.submission-response').html(
          `<h3>Wrong: 10-yard penalty!</h3>
          <img src="imgs/wrong_holding.jpg" alt="referee calling a holding penalty" class="images" width="300px">
          <h4>The correct answer is ${STORE.allQuestions[currentQuestionIndex].correctAns}.</h4>
          <button type='submit' class='next'>Next question</button>`
        );
      }
      if (STORE.allQuestions[currentQuestionIndex] === STORE.allQuestions[6]) {
        if (userInput === correctAnswer) {
          $('.submission-response').html(
            `<h3>Pass completed! Way to go!</h3>
          <img src="imgs/correct_highfive.jpeg" alt="Colts players high-fiving" class="images" width="300px">
          <br></br>
          <button type=\'submit\' class=\'next\'>view your results</button>`
          );
        } else {
          $('.submission-response').html(
            `<h3>Wrong: 10-yard penalty!</h3>
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


  // generates next question
  function nextQuestion() {
    // when user clicks the Next button, move to the next object in the store
    // add if else statement: if there are no more questions left, call function results()
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

  // generates final screen, including score, and congratulations or defeat message
  function results() {
    // display score and currentQuestion counters
    // display final message based on score?
    // display restart button
    // $('.question-content').empty();
    let resultMessage = '';
    if (STORE.score >= 5) {
      resultMessage = `Great job, sport! You earned ${STORE.score}/${STORE.allQuestions.length} points!
      <br></br>  
      <img src='imgs/victory_colts.jpg' alt='Colts player celebrates on the field as confetti rains down' class='victory' width='600px'>`;
    } else if (STORE.score < 5 && STORE.score >= 3) {
      resultMessage = `Good effort, rookie! You earned ${STORE.score}/${STORE.allQuestions.length} points.
      <br></br> 
      <img src='imgs/nicetry_colts.jpg' alt='two football players in a brief encouraging embrace' class='victory' width='600px'>`;
    } else if (STORE.score < 3) {
      resultMessage = `You've been benched for earning only ${STORE.score}/${STORE.allQuestions.length} points this game!
      <br></br>  
      <img src='imgs/defeat_colts.jpg' alt='a football player sits alone on the field' class='victory' width='600px'>`;
    }
    console.log(`${resultMessage}`);

    $('.results-content').html(
      `    
            <div class="results-msg">
              <legend>${resultMessage}</legend>           
            </div>

            <div class="restart-button">             
              <button type="submit" id="restart"> Restart Quiz </button>    
            </div>
        `
    );
    $('#quiz').on('submit', (e) => {
      e.preventDefault();
      $('quiz').off('submit');
      console.log("WHAT UP")
      restartQuiz();
    });

  }

  function resetStats() {

    STORE.score = 0;
    STORE.currentQuestion = 1;
    $('.score').text(`Score: ${STORE.score}`);
    $('.question-number').text(`Question: ${STORE.currentQuestion}/${STORE.allQuestions.length}`);
  }

  // gives the user the chance to take the quiz again from the beginning, once they have completed the quiz
  function restartQuiz() {
  // // clicking restart button resets score and currentQuestion counters
  // // re-renders quiz from the beginning
  //   console.log('restart 1 of');
    
    resetStats();
      
    $('.results-content').empty();
    $('.question-content').html(renderQuestion());   

  }
  beginQuiz();
  
}
console.log('first line of js');

$(main);
