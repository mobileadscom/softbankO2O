import axios from 'axios';

var domain = 'https://www.mobileads.com';
// var domain = 'http://192.168.99.100';

var user = {
	isWanderer: false,
	info: {},
	get: function(userId) {
		var _this = this;
    return axios.get(domain + '/api/coupon/softbank/user_info', {
      params: {
        id: userId
      }
    });
	},
	register: function(userId) {
		var _this = this;
		var regForm = new FormData();
    regForm.append('id', userId);
    return axios.post(domain + '/api/coupon/softbank/register', regForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
	},
	saveAnswer: function(userId, questionNo, answer) {
		var ansForm = new FormData();
    ansForm.append('id', userId);
    ansForm.append('questionNo', questionNo);
    ansForm.append('answer', answer)
    return axios.post(domain + '/api/coupon/softbank/user_answer_save', ansForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
	},
	win: function(userId, group) {
		var markForm = new FormData();
    markForm.append('id', userId);
    markForm.append('state', 'win');
    markForm.append('couponGroup', group);
    return axios.post(domain + '/api/coupon/softbank/mark_user', markForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
	},
	lose: function(userId) {
		var markForm = new FormData();
    markForm.append('id', userId);
    markForm.append('state', 'lose');
    return axios.post(domain + '/api/coupon/softbank/mark_user', markForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
	},
	passResult: function(userId, flag, couponLink) { // flag: 1 = win, 0 = lose
		var id = userId.substring(1);
		var apiUrl = '';
	  var acceptId = false;
	  if (userId.charAt(0) == 't') {
			apiUrl = 'https://ad.testee.co/receive/mobile360/';
	    acceptId = true;
	  }
	  else if(userId.charAt(0) == 'p') {
		 apiUrl = 'https://public.powl.jp/receive/mobile360/';
	   acceptId = true;
	  }

	  if (acceptId) {
			if (flag == 1) {
				axios.post(apiUrl, {
					userId: id,
					flag: 1,
					couponUrl: couponLink
				}).then(function(response) {
					console.log(response);
				}).catch(function(error) {
					console.log(error);
				});
			}
			else if (flag == 0) {
				axios.post(apiUrl, {
					userId: id,
					flag: 0
				}).then(function(response) {
					console.log(response);
				}).catch(function(error) {
					console.log(error);
				})
			}
	  }

	}
};

export default user;