var winningLogic = {
	winLogic: {
		'6': {
			value: ['ほぼ毎日', '週４〜５回', '週２〜３回'],
			priority: 3
		},
		'8': {
			value: 'セブン-イレブン',
			priority: 4
		}
	},
	loseLogic: {
		'6': {
			value: '月１回未満',
			priority: 1
		},
		'7': {
			value: 'セブン-イレブン',
			priority: 2
		}
	},
	process: function(questions) {
		var winPrio = 20;
		var losePrio = 10;
    for (var w in this.winLogic) {
    	var no = parseInt(w);
    	if (typeof this.winLogic[w].value === 'string') {
				if (questions[no].selectedAnswer.indexOf(this.winLogic[w].value) > -1) {
					winPrio = winPrio > this.winLogic[w].priority ? this.winLogic[w].priority : winPrio;
				}
    	}
    	else {
    		for (var v = 0; v < this.winLogic[w].value.length; v++) {
    			if (questions[no].selectedAnswer.indexOf(this.winLogic[w].value[v]) > -1) {
    				winPrio = winPrio > this.winLogic[w].priority ? this.winLogic[w].priority : winPrio;
    			}
    		}
    	}
    }

    for (var l in this.loseLogic) {
    	var n = parseInt(l);
    	if (typeof this.loseLogic[l].value === 'string') {
    		if (questions[n].selectedAnswer.indexOf(this.loseLogic[l].value) > -1) {
    			losePrio = losePrio > this.loseLogic[l].priority ? this.loseLogic[l].priority : losePrio;
    		}
    	}
    	else {
    		for (var u = 0; u < this.loseLogic[l].value.length; u++) {
    			if (questions[n].selectedAnswer.indexOf(this.loseLogic[l].value[u]) > -1) {
    				losePrio = losePrio > this.loseLogic[l].priority ? this.loseLogic[l].priority : losePrio;
    			}
    		}
    	}
    }

    var result = winPrio < losePrio ? 'win' : 'lose';
    return {
      result: result,
      winPrio: winPrio,
      losePrio: losePrio
    }
	}
}

export default winningLogic; 