import '../stylesheets/singleAnswerQuestion.css';

class singleAnswerQuestion {
	constructor(options) {
		this.wrapper = options.wrapper;
		this.selectedAnswer = "";
		this.answers = [];
		this.questionWrapper = document.createElement('div');
		this.questionWrapper.classList.add('question-wrapper');
		this.questionWrapper.innerHTML = options.question;
		this.wrapper.appendChild(this.questionWrapper);
		this.answerWrapper = document.createElement('div');
		this.answerWrapper.classList.add('answer-wrapper');
    this.wrapper.appendChild(this.answerWrapper);
    for (var a = 0; a < options.answers.length; a++) {
      var answerBox = document.createElement('div');
      answerBox.dataset.value = options.answers[a].value;
		  answerBox.innerHTML = options.answers[a].text;
		  answerBox.classList.add('answer');
		  this.answerWrapper.appendChild(answerBox);
		  var rad = document.createElement('div');
		  rad.classList.add('rad');
		  answerBox.appendChild(rad);
		  answerBox.addEventListener('click', (e) => {
			  this.selectAnswer(e.target);
		  });
      this.answers.push(answerBox);
    }
	}

	selectAnswer(target) {
		if (!target.classList.contains('selected')) {
			for (var a = 0; a < this.answers.length; a ++) {
				this.answers[a].classList.remove('selected');
			}
			
			target.classList.add('selected');
			this.selectedAnswer = target.dataset.value;
		}
	}
}

export default singleAnswerQuestion;