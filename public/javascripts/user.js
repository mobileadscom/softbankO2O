import axios from 'axios';

// var domain = 'https://www.mobileads.com';
var domain = 'http://192.168.99.100';

var campaignId = 'ca8ca8c34a363fa07b2d38d007ca55c6';
var adUserId = '4441';
var rmaId = '1';
var generalUrl = 'https://track.richmediaads.com/a/analytic.htm?rmaId={{rmaId}}&domainId=0&pageLoadId={{cb}}&userId={{adUserId}}&pubUserId=0&campaignId={{campaignId}}&callback=trackSuccess&type={{type}}&value={{value}}&uniqueId={{userId}}';

var trackingUrl = generalUrl.replace('{{rmaId}}', rmaId).replace('{{campaignId}}', campaignId).replace('{{adUserId}}', adUserId).replace('{{cb}}', Date.now().toString());

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
	trackAnswer: function(userId, questionNo, answer) {
		var type = 'q_a';
		var value = questionNo.toString() + '_' + encodeURIComponent(answer);
		console.log(generalUrl, trackingUrl);
		var url = trackingUrl.replace('{{type}}', type).replace('{{value}}', value).replace('{{userId}}', userId);
		console.log(url);
		// return axios.get('')
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
	passResult: function(userId, flag, source, couponLink) { // flag: 1 = win, 0 = lose
		var psForm = new FormData();
		psForm.append('user_id', userId);
		psForm.append('flag', flag);
    psForm.append('campaign_id', 'ca8ca8c34a363fa07b2d38d007ca55c6');
		psForm.append('source', source);
		if (couponLink) {
			psForm.append('coupon_url', couponLink);
		}
		return axios.post(domain + '/api/coupon/softbank/api_call', psForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
	}
};

export default user;