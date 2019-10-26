'use strict';

// const questionStorage = [
//   {
//     question: 'Who is the Colts offical owner?',
//     answers: [ 'Mark Cuban', 'Jeff Bezos', 'Tim Cook' ],
//     correctAnswer: 'Jim Irsay'
//   },
//   {
//     question: 'What are the Colts offical team colors?',
//     answers: [ 'Light blue & Yellow', 'Red & Silver', 'Blue & Silver' ],
//     correctAnswer: 'Blue & White'
//   },
//   {
//     question: 'What is the Colts mascot name?',
//     answers: [ 'Horsey', 'Skippy', 'Rider' ],
//     correctAnswer: 'Blue'
//   }
// ];

function main() {
  console.log('inside main');
  // Render!
  // function renderQuiz() {
  //   // html elements go here
  // }


  // // resets score and question # counters
  // function resetStats() {
  //   // will make sure that score and question # counters are empty at the start of the quiz
  //   $('#start').on('submit', (e) => {
  //     // STORE.score = 0;
  //     // STORE.currentQuestion = 0;
  //     // renderQuiz();
  //     console.log('render stats is working');
  //   });
  // }

  // // updates the score counter each time a question is answered correctly
  // function updateScore() {
  //   // 1++ to STORE.score each time user correctly answers a questions (function correct() called)
  // }

  // // updates the counter displaying how many questions the user has answered out of the total # of questions
  // function updateQuestionNum() {
  //   // 1++ to STORE.currentQuestion each time user reaches a new question (function nextQuestion())
  // }

  // allows user to start the quiz
  function beginQuiz() {
    console.log('Begin quiz');
    // when user hits start button, resetStats is called and quiz is rendered
    
    $('#quiz').on('submit', (e) => {
      e.preventDefault();

      $('.start-content').remove();
      renderQuestion();

      console.log('start button pushed');
    });
  }

  function renderQuestion() {
    $('.score').text(`Score: ${STORE.score}`);
    $('.question-number').text(`Question: ${STORE.currentQuestion}/${STORE.allQuestions.length}`);

    let i = STORE.currentQuestion - 1;
    let listElements = '';

    for(let j = 0; j < STORE.allQuestions[i].answers.length; j++) {
      listElements += `<li>${STORE.allQuestions[i].answers[j]}</li>`;
    }

    $('.question-content').html(` 
      <ul>${STORE.allQuestions[i].question}
      ${listElements}
      </ul> 
    `);

 

    
    //
  }

  // // user submits an answer (not -- on.('click') --)
  // function submitAnswer() {
  //   // when user submits an answer, grab input
  // }

  // // the display shown if user answers correctly
  // function correct() {
  //   // after submitAnswer, if correct/check against properties in the STORE/, display message stating so, and flash the box? window? a lighter blue
  //   // call update score

  // }

  // // the display shown if user answers incorrectly; flash silver
  // function wrong() {
  //   // after submitAnswer, if incorrect/check against properties in the STORE/, display message stating so, and flash the box? window? a lighter blue
  // }

  // // generates next question
  // function nextQuestion() {
  //   // when user clicks the Next button, move to the next object in the store
  //   // add if else statement: if there are no more questions left, call function results()
  // }

  // // generates final screen, including score, and congratulations or defeat message
  // function results() {
  //   // display score and currentQuestion counters
  //   // display final message based on score?
  //   // display restart button
  // }


  // // // gives the user the chance to take the quiz again from the beginning, once they have completed the quiz
  // function restartQuiz() {
  // //   // clicking restart button resets score and currentQuestion counters
  // //   // re-renders quiz from the beginning
  // }



  beginQuiz();



}
console.log('first line of js');


$(main);

