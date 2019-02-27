let _vm = new Vue({
	el: '#allAroundPanel',
	data() {
		return {
			carNum: 0,
			carQueryIndex: 0,
			faceNum: 0,
			faceQueryIndex: 0,
			wifiNum: 0,
			wifiQueryIndex: 0,

			trafficALLNum: 0,

			allCountNumber: 0,
			allCountQueryKindIndex: 0,
			allCountQueryTypeIndex: 0,

			onLineNum: 0,
			onLineQueryIndex: 0,

			timerTxt: ""
		}
	},
	mounted() {
		setTimeout(() => {
			GlobalMap.init("mapDiv");
			var map = new BMap.Map("allmap");    // 创建Map实例
			map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);

			testOne();
			testTwo();

		}, 500);

		setInterval(() => {
			let date = new Date();
			this.timerTxt =
				date.getFullYear() +
				"." +
				(date.getMonth() + 1) +
				"." +
				date.getDate() +
				" " +
				date.getHours() +
				":" +
				date.getMinutes() +
				":" +
				date.getSeconds();
		}, 1000);
		jQuery(document).ready(function ($) {
			$('.slider1').bxSlider({
				auto: true,
				pause: 5000,
				autoHover: true,
				autoStart: true,
				slideWidth: 118,
				minSlides: 5,
				maxSlides: 5,
				moveSlides: 1,
				slideMargin: 36
			});
		});
	},
	methods: {
		carChangeQuery(_index) {
			//车辆预警
			this.carQueryIndex = _index;
			loadWarnningCar("carPictureInfor", _index, this);
		},
		faceChangeQuery(_index) {
			//人脸预警
			this.faceQueryIndex = _index;
			//loadWarnningFace("facePictureInfor", _index, this);
		},
		wifiChangeQuery(_index) {
			//wifi预警
			this.wifiQueryIndex = _index;
			//loadWarnningWifi("wifiPictureInfor", _index, this);
		},

		onLineChangeQuery(_index) {
			//设备在线率
			this.onLineQueryIndex = _index;
			//loadChartOnLineInfor("devicesPictureInfor", _index, this);
		},
		allCountChnageQueryData(_kindType, _typeIndex) {
			if (_kindType == null) {
				this.allCountQueryTypeIndex = _typeIndex;
			}
			if (_typeIndex == null) {
				this.allCountQueryKindIndex = _kindType;
			}

			// 			switch (this.allCountQueryKindIndex) {
			// 				case 0:
			// 					loadAllCountFace("allCountPictureInfor", this.allCountQueryTypeIndex, this);
			// 					break;
			// 				case 1:
			// 					loadAllCountCar("allCountPictureInfor", this.allCountQueryTypeIndex, this);
			// 					break;
			// 				case 2:
			// 					loadAllCountWifi("allCountPictureInfor", this.allCountQueryTypeIndex, this);
			// 					break;
			// 			}
		}
	}
});
