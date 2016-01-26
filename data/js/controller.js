window.addEventListener('click', function (event) {
	
	console.log('h');

	if (event.target.id.indexOf('startButton') === 0) {

		TimeKeeper.startTimer();

	} else if (event.target.id.indexOf('stopButton') === 0) {

		TimeKeeper.stopTimer();

	} else if (event.target.id.indexOf('resetButton') === 0) {

		TimeKeeper.reset();
	}
}, false);

var TimeKeeper = {

	durationTimerIntervalId: 0,
	notifyTimerIntervalId: 0,
	startTime: null,
	notificationSound: new Audio("../audio/notification.mp3"),

	startTimer: function () {
		TimeKeeper.startTime = new Date();

		if (TimeKeeper.durationTimerIntervalId) {
			clearInterval(TimeKeeper.durationTimerIntervalId);

			if (document.getElementById('notifyFreq').selectedIndex !== 0) {
				clearInterval(TimeKeeper.notifyTimerIntervalId);
			}
		}

		TimeKeeper.durationTimerIntervalId = setInterval(TimeKeeper.durationTimerUpdateUI, 1000);
		if (document.getElementById('notifyFreq').selectedIndex !== 0) {
			TimeKeeper.notifyTimerIntervalId = setInterval(TimeKeeper.notify, document.getElementById('notifyFreq')[document.getElementById('notifyFreq').selectedIndex].value);
		}
	},

	stopTimer: function () {

		clearInterval(TimeKeeper.durationTimerIntervalId);
		if (document.getElementById('notifyFreq').selectedIndex !== 0) {
			clearInterval(TimeKeeper.notifyTimerIntervalId);
		}
	},

	reset: function () {

		TimeKeeper.stopTimer();
		document.getElementById('duration').value = '00:00:00';
	},

	durationTimerUpdateUI: function () {

		var duration = TimeKeeper.diffBetweenTimes(
			TimeKeeper.startTime,
			new Date());

		document.getElementById('duration').value = duration;
	},

	diffBetweenTimes: function (beginTime, endTime) {

		var timeTaken = new Date(endTime.getTime() - beginTime.getTime());
		var timeTakenString = "";

		// calc hours
		if ((timeTaken.getHours() - 1) < 1) {
			timeTakenString += '00:';
		} else if ((timeTaken.getHours() - 1) >= 0 && (timeTaken.getHours() - 1) < 10) {
			timeTakenString += '0' + (timeTaken.getHours() - 1).toString() + ':';
		} else {
			timeTakenString += (timeTaken.getHours() - 1).toString() + ':';
		}

		// calc minutes
		if (timeTaken.getMinutes() < 1) {
			timeTakenString += '00:';
		} else if (timeTaken.getMinutes() >= 0 && timeTaken.getMinutes() < 10) {
			timeTakenString += '0' + timeTaken.getMinutes().toString() + ':';
		} else {
			timeTakenString += timeTaken.getMinutes().toString() + ':';
		}

		//calc seconds
		if (timeTaken.getSeconds() < 1) {
			timeTakenString += '00.';
		} else if (timeTaken.getSeconds() >= 0 && timeTaken.getSeconds() < 10) {
			timeTakenString += '0' + timeTaken.getSeconds().toString();
		} else {
			timeTakenString += timeTaken.getSeconds().toString();
		}

		return timeTakenString;
	},

	notify: function () {

		var duration = TimeKeeper.diffBetweenTimes(
			TimeKeeper.startTime,
			new Date());

		//self.port.emit("notify", duration); // TODO re-implement for chrome

		if (document.getElementById('audioCheckbox').checked) {
			TimeKeeper.notificationSound.play();
		}
	}
};
