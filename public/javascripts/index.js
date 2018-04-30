import miniPages from './miniPages';
import singleAnswerQuestion from './singleAnswerQuestion';
import '../stylesheets/style.css';
import '../stylesheets/miniCheckbox.css';


var getParams = function() {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      // If first entry with this name
      if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = pair[1];
      // If second entry with this name
      } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]], pair[1] ];
          query_string[pair[0]] = arr;
      // If third or later entry with this name
      } else {
          query_string[pair[0]].push(pair[1]);
      }
  } 
  return query_string;
}

document.addEventListener('DOMContentLoaded', function() {
	/* init pagination */
  window.appPages = new miniPages({
  	pageWrapperClass: document.getElementById('page-wrapper'),
  	pageClass: 'page',
  	initialPage: document.getElementById('loadingPage'),
  	pageButtonClass: 'pageBtn'
  });

  window.q1 = new singleAnswerQuestion({
  	wrapper: document.getElementById('q1'),
    question: '<span class="red">QUESTION 1</span><br>応募にあたり、応募規約に同意します',
    answers: [{
    	value: 'はい',
    	text: 'はい',
    }, {
    	value: 'いいえ',
    	text: 'いいえ'
    }]
  });
  
  setTimeout(function() {
    appPages.toPage('termsPage');
  }, 1000);
  
  /* event listeners */
  /* enabled terms agree checkbox when scrolled tnc to bottom */
  var enableAgreeCheckbox = false;
  document.getElementById('tnc').addEventListener('scroll', function(event) {
  	if (!enableAgreeCheckbox) {
  		var element = event.target;
	    if (element.scrollHeight - element.scrollTop < element.clientHeight + 50) {
	      document.getElementById('agreeCheck').disabled = false;
	      enableAgreeCheckbox = true;
	    }
  	}
  });
  
  /* enable start survey button when terms agree checkbox is checked */
  document.getElementById('agreeCheck').onchange = function() {
    if (this.checked) {
			document.getElementById('startSurvey').disabled = false;
    }
    else {
    	document.getElementById('startSurvey').disabled = true;
    }
  }
});
