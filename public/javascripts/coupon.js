import axios from 'axios';

// var domain = 'https://www.mobileads.com';
var domain = 'http://192.168.99.100';

var coupon = {
	count: {
		A: 0,
		B: 0
	},
	get: function() {
		var _this = this;
    axios.get(domain + '/api/coupon/softbank/coupons_check').then(function(response) {
      console.log(response);
      _this.count.A = response.data.A;
      _this.count.B = response.data.B;
    }).catch(function(error) {
      console.log(error);
    });
	}
}

export default coupon;