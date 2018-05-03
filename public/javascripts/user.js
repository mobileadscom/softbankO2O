import axios from 'axios';

// var domain = 'https://www.mobileads.com';
var domain = 'http://192.168.99.100';

var user = {
	isWanderer: false,
	info: {},
	get: function(userId) {
		var _this = this;
    return axios.get(domain + '/api/coupon/softbank/user_info?', {
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
	}
};

export default user;