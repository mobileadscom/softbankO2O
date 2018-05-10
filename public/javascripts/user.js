import axios from 'axios';

var domain = 'https://www.mobileads.com';
// var domain = 'http://192.168.99.100';

var user = {
	isWanderer: false,
	source: '',
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
	win: function(userId, group, source) {
		var markForm = new FormData();
    markForm.append('id', userId);
    markForm.append('state', 'win');
    markForm.append('couponGroup', group);
    markForm.append('source', source);
    return axios.post(domain + '/api/coupon/softbank/mark_user', markForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
	},
	lose: function(userId, source) {
		var markForm = new FormData();
    markForm.append('id', userId);
    markForm.append('state', 'lose');
    markForm.append('source', source);
    return axios.post(domain + '/api/coupon/softbank/mark_user', markForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
	},
	passResult: function(userId, flag, couponLink) { // flag: 1 = win, 0 = lose
		console.log('pss');
		var id = userId.substring(1);
		var apiUrl = '';
	  var acceptId = false;
	  if (userId.charAt(0) == 't') {
			apiUrl = 'https://ad.testee.co/receive/mobile360/';
	    acceptId = true;
	    console.log('Testee');
	  }
	  else if(userId.charAt(0) == 'p') {
		  apiUrl = 'https://public.powl.jp/receive/mobile360/';
	    acceptId = true;
			console.log('Pow');
	  }

	  if (acceptId) {
			if (flag == 1) {
				var psForm = new FormData();
		    psForm.append('user_id', id);
		    psForm.append('flag', '1');
		    psForm.append('campaign_id', 'ca8ca8c34a363fa07b2d38d007ca55c6');
		    psForm.append('secret_key', '5d063805eb4bec810e8cf5a51e4b6245295e423b4d24f929977aa6caa97a8050');
		    psForm.append('coupon_url', couponLink);
				/*axios.post(apiUrl, {
					user_id: id,
					flag: 1,
					campaign_id: 'ca8ca8c34a363fa07b2d38d007ca55c6',
					secret_key: '5d063805eb4bec810e8cf5a51e4b6245295e423b4d24f929977aa6caa97a8050',
					coupon_url: couponLink*/
				axios.post(apiUrl, psForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } 
				}).then(function(response) {
					console.log(response);
				}).catch(function(error) {
					console.log(error);
				});
			}
			else if (flag == 0) {
				var psForm = new FormData();
		    psForm.append('user_id', id);
		    psForm.append('flag', '0');
		    psForm.append('campaign_id', 'ca8ca8c34a363fa07b2d38d007ca55c6');
		    psForm.append('secret_key', '5d063805eb4bec810e8cf5a51e4b6245295e423b4d24f929977aa6caa97a8050');
				/*axios.post(apiUrl, {
					user_id: id,
					campaign_id: 'ca8ca8c34a363fa07b2d38d007ca55c6',
					secret_key: '5d063805eb4bec810e8cf5a51e4b6245295e423b4d24f929977aa6caa97a8050',
					flag: 0*/
				axios.post(apiUrl, psForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } 
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