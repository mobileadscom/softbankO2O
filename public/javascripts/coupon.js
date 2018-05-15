import axios from 'axios';

var domain = 'https://www.mobileads.com';
// var domain = 'http://192.168.99.100';

var coupon = {
	count: {
		A: 0,
		B: 0,
		C: 0,
		D: 0
	},
	get: function() {
		var _this = this;
    axios.get(domain + '/api/coupon/softbank/coupons_check').then(function(response) {
      console.log(response);
      _this.count.A = response.data.A;
      _this.count.B = response.data.B;
      _this.count.C = response.data.C;
      _this.count.D = response.data.D;
    }).catch(function(error) {
      console.log(error);
    });
	}
}

export default coupon;