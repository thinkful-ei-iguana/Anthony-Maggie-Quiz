'use strict';

const STORE = {
  allQuestions: [
    {
      question: 'How many Superbowls have the Colts won?',
      answers: [ '2', '13', '0', '9' ],
      correctAns: '2'
    },
    {
      question: 'When did the Colts last win the Superbowl?',
      answers: [ '2009', '1998', '2007', '2018' ],
      correctAns: '2007'
    },
    {
      question: 'What is the name of the Colts\'s home stadium?',
      answers: [ 'Gillette Stadium', 'Fenway Park', 'TD Garden', 'Lucas Oil Stadium' ],
      correctAns: 'Lucas Oil Stadium'
    },
    {
      question: 'When did the Colts move to Indianapolis?',
      answers: [ '2018', '1984', '1930', '2020' ],
      correctAns: '1984'
    },
    {
      question: 'Who is the Colts offical owner?',
      answers: [ 'Mark Cuban', 'Jeff Bezos', 'Tim Cook', 'Jim Irsay' ],
      correctAns: 'Jim Irsay'
    },
    {
      question: 'What are the Colts offical team colors?',
      answers: [ 'Light blue & Yellow', 'Blue & White', 'Blue & Silver', 'Red & White' ],
      correctAns: 'Blue & White'
    },
    {
      question: 'What is the Colts mascot name?',
      answers: [ 'Blue', 'Horsey', 'Rider', 'Skippy' ],
      correctAns: 'Blue'
    }
  ],

  score: 0,

  currentQuestion: 0
};

console.log(STORE);
