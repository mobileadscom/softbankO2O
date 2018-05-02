import '../stylesheets/questions.css';

class singleAnswerQuestion {
	constructor(options) {
		this.wrapper = options.wrapper;
		this.selectedAnswer = "";
		this.answers = [];
		if (options.nextBtn) {
      this.nextBtn = options.nextBtn;
      this.nextBtn.disabled = true;
		};
		this.questionWrapper = document.createElement('div');
		this.questionWrapper.classList.add('question-wrapper');
		this.questionWrapper.innerHTML = options.question;
		this.wrapper.appendChild(this.questionWrapper);
		this.answerWrapper = document.createElement('div');
		this.answerWrapper.classList.add('answer-wrapper');
    this.wrapper.appendChild(this.answerWrapper);
    for (var a = 0; a < options.answers.length; a++) {
      var answerBox = document.createElement('div');
		  answerBox.innerHTML = options.answers[a].text;
		  answerBox.classList.add('answer');
		  var rad = document.createElement('div');
			rad.classList.add('rad');
			answerBox.appendChild(rad);
		  if (!options.answers[a].type) {
		  	answerBox.dataset.value = options.answers[a].value;
		  }
		  else {
	      this.input = document.createElement('input');
	      this.input.setAttribute('type', 'text');
	      this.input.setAttribute('maxlength', '50');
	      this.input.disabled = true;
	      answerBox.appendChild(this.input);
	      answerBox.classList.add('input');
	      this.input.oninput = () => {
	      	if (this.input.parentNode.classList.contains('selected')) {
	      		if (this.input.value) {
	      			this.selectedAnswer = 'その他: ' + this.input.value;
	      			this.nextBtn.disabled = false;
	      		}
	      		else {
	      			this.nextBtn.disabled = true;
	      		}
	      		
	      	}
	      }
		  }
		  this.answerWrapper.appendChild(answerBox);
		  answerBox.addEventListener('click', (e) => {
				this.selectAnswer(e.target);
		  });
      this.answers.push(answerBox);
    }
	}

	selectAnswer(target) {
		var isOther = false;
		if (!target.classList.contains('selected')) {
			for (var a = 0; a < this.answers.length; a ++) {
				this.answers[a].classList.remove('selected');
			}
			
			target.classList.add('selected');
			if (!target.classList.contains('input')) {
				this.selectedAnswer = target.dataset.value;
				if (this.input) {
					this.input.disabled = true;
				}
			}
			else {
				this.input.disabled = false;
				this.input.focus();
				isOther = true;
			}

			if (this.nextBtn) {
				if (!isOther) {
					this.nextBtn.disabled = false;
				}
				else {
					if (this.input.value) {
						this.nextBtn.disabled = false;
					}
					else {
						this.nextBtn.disabled = true;
					}
				}
			}
		}
	}
}

class multipleAnswerQuestion {
	constructor(options) {
		this.wrapper = options.wrapper;
		this.selectedAnswer = "";
		this.answers = [];
		if (options.nextBtn) {
      this.nextBtn = options.nextBtn;
      this.nextBtn.disabled = true;
		};
		this.questionWrapper = document.createElement('div');
		this.questionWrapper.classList.add('question-wrapper');
		this.questionWrapper.innerHTML = options.question;
		this.wrapper.appendChild(this.questionWrapper);
		this.answerWrapper = document.createElement('div');
		this.answerWrapper.classList.add('answer-wrapper');
    this.wrapper.appendChild(this.answerWrapper);
    for (var a = 0; a < options.answers.length; a++) {
      var answerBox = document.createElement('div');
		  answerBox.innerHTML = options.answers[a].text;
		  answerBox.classList.add('m-answer');
		  var checkmark = document.createElement('div');
		  checkmark.classList.add('checkmark');
		  answerBox.appendChild(checkmark);
		  if (!options.answers[a].type) {
		  	answerBox.dataset.value = options.answers[a].value;
		  }
		  else {
	      this.input = document.createElement('input');
	      this.input.setAttribute('type', 'text');
	      this.input.setAttribute('maxlength', '50');
	      this.input.disabled = true;
	      answerBox.appendChild(this.input);
	      answerBox.classList.add('input');
	      this.input.oninput = () => {
			    this.compileAnswer();
	      }
		  }
		  this.answerWrapper.appendChild(answerBox);
		  answerBox.addEventListener('click', (e) => {
			  this.selectAnswer(e.target);
		  });
      this.answers.push(answerBox);
    }
	}

	selectAnswer(target) {
		var val = target.dataset.value;
		if (target.classList.contains('selected')) {
			target.classList.remove('selected');
		}
		else {
			target.classList.add('selected');
			if (target.classList.contains('input')) {
				this.input.disabled = false;
				this.input.focus();
			}
		}

		this.compileAnswer();
	}

	compileAnswer() {
		var chosenAnswers = [];
		for (var a = 0; a < this.answers.length; a++) {
			if (this.answers[a].classList.contains('selected')) {
				if (!this.answers[a].classList.contains('input')) {
					chosenAnswers.push(this.answers[a].dataset.value);
				}
				else {
					if (this.input.value) {
						chosenAnswers.push('その他: ' + this.input.value);
					}
				}
			}
		}
	  
	  this.selectedAnswer = JSON.stringify(chosenAnswers);
		if (this.nextBtn) {
			if (chosenAnswers.length > 0) {
			  this.nextBtn.disabled = false;
		  }
		  else {
		  	this.nextBtn.disabled = true;
		  }
		}
	}
}

class dropdownQuestion {
	constructor(options) {
		this.wrapper = options.wrapper;
		this.selectedAnswer = "";
		this.answers = [];
		if (options.nextBtn) {
      this.nextBtn = options.nextBtn;
      this.nextBtn.disabled = true;
		};
		this.questionWrapper = document.createElement('div');
		this.questionWrapper.classList.add('question-wrapper');
		this.questionWrapper.innerHTML = options.question;
		this.wrapper.appendChild(this.questionWrapper);
		this.answerWrapper = document.createElement('div');
		this.answerWrapper.classList.add('answer-wrapper');
    this.wrapper.appendChild(this.answerWrapper);
	  var selectContainer = document.createElement('div');
	  selectContainer.classList.add('miniSelect');
	  this.answerWrapper.appendChild(selectContainer);
	  var select = document.createElement('select');
	  selectContainer.appendChild(select);
	  var dumOpt = document.createElement('option');
	  dumOpt.setAttribute('value', '0');
	  dumOpt.innerHTML = '選択してください';
	  dumOpt.selected = true;
	  select.appendChild(dumOpt);
	  for (var a = 0; a < options.answers.length; a++) {
      var answerBox = document.createElement('option');
      answerBox.setAttribute('value', options.answers[a].value);
		  answerBox.innerHTML = options.answers[a].text;
		  select.appendChild(answerBox);
		}
	  select.onchange = (e) => {
	    this.selectedAnswer = select.value;
	    if (this.nextBtn) {
				this.nextBtn.disabled = false;
			}
	  }
	}
}

export {
	singleAnswerQuestion,
	multipleAnswerQuestion,
	dropdownQuestion
}