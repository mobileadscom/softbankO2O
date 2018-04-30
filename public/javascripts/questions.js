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

			if (this.nextBtn) {
				this.nextBtn.disabled = false;
			}
		}
	}
}

class multipleAnswerQuestion {
	constructor(options) {
		this.wrapper = options.wrapper;
		this.selectedAnswerArr = [];
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
      answerBox.dataset.value = options.answers[a].value;
		  answerBox.innerHTML = options.answers[a].text;
		  answerBox.classList.add('m-answer');
		  this.answerWrapper.appendChild(answerBox);
		  var checkmark = document.createElement('div');
		  checkmark.classList.add('checkmark');
		  answerBox.appendChild(checkmark);
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
			if (this.selectedAnswerArr.indexOf(val) > -1) {
			  this.selectedAnswerArr.splice(this.selectedAnswerArr.indexOf(val), 1);
			}
		}
		else {
			target.classList.add('selected');
			if (this.selectedAnswerArr.indexOf(val) < 0) {
				this.selectedAnswerArr.push(val);
			}
		}

		this.selectedAnswer = JSON.stringify(this.selectedAnswerArr);
		if (this.nextBtn) {
			if (this.selectedAnswerArr.length > 0) {
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