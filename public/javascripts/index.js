import miniPages from './miniPages';
import {singleAnswerQuestion, multipleAnswerQuestion, dropdownQuestion} from './questions';
import miniSelect from './miniSelect';
import winningLogic from './winningLogic'
import '../stylesheets/miniSelect.css';
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

  /* set questions */
  window.q = [];
  window.q[1] = new singleAnswerQuestion({
  	wrapper: document.getElementById('q1'),
    question: '<span class="red">QUESTION 1</span><br>応募にあたり、応募規約に同意します',
    answers: [{
    	value: 'はい',
    	text: 'はい',
    }, {
    	value: 'いいえ',
    	text: 'いいえ'
    }],
    nextBtn: document.getElementById('toQ2')
  });
  
  window.q[2] = new singleAnswerQuestion({
  	wrapper: document.getElementById('q2'),
  	question: '<span class="red">QUESTION 2</span><br>あなたの性別を教えてください',
  	answers: [{
    	value: '男',
    	text: '男',
    }, {
    	value: '女',
    	text: '女'
    }],
    nextBtn: document.getElementById('toQ3')
  });
  
  window.q[3] = new singleAnswerQuestion({
  	wrapper: document.getElementById('q3'),
  	question: '<span class="red">QUESTION 3</span><br>あなたの年代を教えてください',
  	answers: [{
    	value: '19歳未満',
    	text: '19歳未満',
    }, {
    	value: '20歳〜24歳',
    	text: '20歳〜24歳'
    }, {
    	value: '20歳〜24歳',
    	text: '20歳〜24歳'
    }, {
    	value: '25歳〜29歳',
    	text: '25歳〜29歳'
    }, {
    	value: '30歳〜34歳',
    	text: '30歳〜34歳'
    }, {
    	value: '35歳〜39歳',
    	text: '35歳〜39歳'
    }, {
    	value: '40歳〜44歳',
    	text: '40歳〜44歳'
    }, {
    	value: '45歳〜49歳',
    	text: '45歳〜49歳'
    }, {
    	value: '50歳〜54歳',
    	text: '55歳〜59歳'
    }, {
    	value: '60歳以上',
    	text: '60歳以上'
    }],
    nextBtn: document.getElementById('toQ4')
  });

  window.q[4] = new dropdownQuestion({
  	wrapper: document.getElementById('q4'),
  	question: '<span class="red">QUESTION 4</span><br>あなたのお住まいの都道府県を教えてください',
  	answers: [
			{ value:'北海道', text:'北海道'},
			{ value:'青森県', text:'青森県'},
			{ value:'岩手県', text:'岩手県'},
			{ value:'宮城県', text:'宮城県'},
			{ value:'秋田県', text:'秋田県'},
			{ value:'山形県', text:'山形県'},
			{ value:'福島県', text:'福島県'},
			{ value:'茨城県', text:'茨城県'},
			{ value:'栃木県', text:'栃木県'},
			{ value:'群馬県', text:'群馬県'},
			{ value:'埼玉県', text:'埼玉県'},
			{ value:'千葉県', text:'千葉県'},
			{ value:'東京都', text:'東京都'},
			{ value:'神奈川県', text:'神奈川県'},
			{ value:'新潟県', text:'新潟県'},
			{ value:'富山県', text:'富山県'},
			{ value:'石川県', text:'石川県'},
			{ value:'福井県', text:'福井県'},
			{ value:'山梨県', text:'山梨県'},
			{ value:'長野県', text:'長野県'},
			{ value:'岐阜県', text:'岐阜県'},
			{ value:'静岡県', text:'静岡県'},
			{ value:'愛知県', text:'愛知県'},
			{ value:'三重県', text:'三重県'},
			{ value:'滋賀県', text:'滋賀県'},
			{ value:'京都府', text:'京都府'},
			{ value:'大阪府', text:'大阪府'},
			{ value:'兵庫県', text:'兵庫県'},
			{ value:'奈良県', text:'奈良県'},
			{ value:'和歌山県', text:'和歌山県'},
			{ value:'鳥取県', text:'鳥取県'},
			{ value:'島根県', text:'島根県'},
			{ value:'岡山県', text:'岡山県'},
			{ value:'広島県', text:'広島県'},
			{ value:'山口県', text:'山口県'},
			{ value:'徳島県', text:'徳島県'},
			{ value:'香川県', text:'香川県'},
			{ value:'愛媛県', text:'愛媛県'},
			{ value:'高知県', text:'高知県'},
			{ value:'福岡県', text:'福岡県'},
			{ value:'佐賀県', text:'佐賀県'},
			{ value:'長崎県', text:'長崎県'},
			{ value:'熊本県', text:'熊本県'},
			{ value:'大分県', text:'大分県'},
			{ value:'宮崎県', text:'宮崎県'},
			{ value:'鹿児島県', text:'鹿児島県'},
			{ value:'沖縄県', text:'沖縄県'}
  	],
  	nextBtn: document.getElementById('toQ5')
  });

  window.q[5] = new singleAnswerQuestion({
  	wrapper: document.getElementById('q5'),
  	question: '<span class="red">QUESTION 5</span><br>インターネットで応募して、景品（飲料やお菓子など店頭で販売されている商品）をコンビニで受け取るキャンペーンに応募したことがある',
  	answers: [{
    	value: '応募したことがあり、当選して景品を受け取ったことがある',
    	text: '応募したことがあり、当選して景品を受け取ったことがある',
    }, {
    	value: '応募したことはあるが、景品を受け取ったことはない',
    	text: '応募したことはあるが、景品を受け取ったことはない'
    }, {
    	value: '応募したことがない',
    	text: '応募したことがない'
    }],
    nextBtn: document.getElementById('toQ6')
  });

  window.q[6] = new singleAnswerQuestion({
  	wrapper: document.getElementById('q6'),
  	question: '<span class="red">QUESTION 6</span><br>コンビニに行く頻度を教えてください',
  	answers: [{
    	value: 'ほぼ毎日',
    	text: 'ほぼ毎日',
    }, {
    	value: '週４〜５回',
    	text: '週４〜５回'
    }, {
    	value: '週２〜３回',
    	text: '週２〜３回'
    }, {
    	value: '週１〜２回',
    	text: '週１〜２回'
    }, {
    	value: '隔週程度',
    	text: '隔週程度'
    }, {
    	value: '月１回未満',
    	text: '月１回未満'
    }],
    nextBtn: document.getElementById('toQ7')
  });

  window.q[7] = new multipleAnswerQuestion({
  	wrapper: document.getElementById('q7'),
  	question: '<span class="red">QUESTION 7</span><br>過去３ヶ月以内で来店したコンビニを教えてください（複数選択可）',
  	answers: [{
    	value: 'セブン-イレブン',
    	text: 'セブン-イレブン',
    }, {
    	value: 'ファミリーマート',
    	text: 'ファミリーマート'
    }, {
    	value: 'ローソン',
    	text: 'ローソン'
    }, {
    	value: 'ミニストップ',
    	text: 'ミニストップ'
    }, {
    	value: 'サークルKサンクス',
    	text: 'サークルKサンクス'
    }, {
    	text: 'その他',
      type: 'text'
    }],
    nextBtn: document.getElementById('toQ8')
  });

  window.q[8] = new singleAnswerQuestion({
  	wrapper: document.getElementById('q8'),
  	question: '<span class="red">QUESTION 8</span><br>あなたが一番よく使うコンビニを教えてください',
  	answers: [{
    	value: 'セブン-イレブン',
    	text: 'セブン-イレブン',
    }, {
    	value: 'ファミリーマート',
    	text: 'ファミリーマート'
    }, {
    	value: 'ローソン',
    	text: 'ローソン'
    }, {
    	value: 'ミニストップ',
    	text: 'ミニストップ'
    }, {
    	value: 'サークルKサンクス',
    	text: 'サークルKサンクス'
    }, {
    	text: 'その他',
      type: 'text'
    }],
    nextBtn: document.getElementById('toResult')
  });
  
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

  document.getElementById('toResult').addEventListener('click', function() {
    console.log(winningLogic.process(window.q));
  })

  miniSelect.init('miniSelect');
  setTimeout(function() {
    appPages.toPage('termsPage');
  }, 1000);
});
