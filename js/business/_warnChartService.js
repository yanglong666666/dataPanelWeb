

  /**
 * 车辆预警
 * @param {*} _containerId 
 */
let loadWarnningCar = async function (_containerId, _queryType, _vm) {
    let dataSingle = [];
    switch (_queryType) {
      case 0:
        {
          let result = await httpGetData("/101?type=0", {});
          let _total = 0;
          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              const element = result[key];
              _total += element;
              dataSingle.push([key, element]);
            }
          }
          _vm.carNum = _total;
        }
        break;
      case 1:
        {
          let result = await httpGetData("/101?type=1", {});
          let _total = 0;
          for (const iterator of result) {
            _total += iterator.val;
            dataSingle.push([iterator.day, iterator.val]);
          }
          _vm.carNum = _total;
        }
        break;
      case 2:
        {
          let result = await httpGetData("/101?type=2", {});
          let _total = 0;
          for (const iterator of result) {
            _total += iterator.val;
            dataSingle.push([iterator.index, iterator.val]);
          }
          _vm.carNum = _total;
        }
        break;
    }
    Highcharts.chart(_containerId, {
      credits: {
        enabled: false
      }, //隐藏highcharts的站点标志
      exporting: {
        enabled: false
      },
      chart: {
        type: 'column'
      },
      title: null,
      colors: ['#FC5252'],
      xAxis: {
        labels: {
          style: {
            fontSize: '12px',
            color: '#e3e3e3'
          }
        },
        type: 'category',
        gridLineColor: 'rgba(69,93,122,0.35)',
      },
      yAxis: {
        min: 0,
        title: null,
        labels: {
          style: {
            fontSize: '12px',
            color: '#e3e3e3'
          }
        },
        gridLineColor: 'rgba(0,126,205,1)',
        minorGridLineColor: 'rgba(69,93,122,0.1)'
      },
      series: [{
        name: '数量',
        data: dataSingle,
        showInLegend: false,
        dataLabels: {
          enabled: true,
          align: "center",
          color: 'white',
          style: {
            "fontSize": "12px",
            "fontWeight": "normal"
          }
        }
      }]
    });
}

/**
 * 人脸预警
 * @param {*} _containerId 
 * @param {*} _queryType 
 * @param {*} _vm 
 */
let loadWarnningFace = async function (_containerId, _queryType, _vm) {
    let dataSingle = [];
    switch (_queryType) {
      case 0:
        {
          let result = await httpGetData("/102?type=0", {});
          let _total = 0;
          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              const element = result[key];
              _total += element;
              dataSingle.push([key, element]);
            }
          }
          _vm.faceNum = _total;
        }
        break;
      case 1:
        {
          let result = await httpGetData("/102?type=1", {});
          let _total = 0;
          for (const iterator of result) {
            _total += iterator.val;
            dataSingle.push([iterator.day, iterator.val]);
          }
          _vm.faceNum = _total;
        }
        break;
      case 2:
        {
          let result = await httpGetData("/102?type=2", {});
          let _total = 0;
          for (const iterator of result) {
            _total += iterator.val;
            dataSingle.push([iterator.index, iterator.val]);
          }
          _vm.faceNum = _total;
        }
        break;
    }
    Highcharts.chart(_containerId, {
      credits: {
        enabled: false
      }, //隐藏highcharts的站点标志
      exporting: {
        enabled: false
      },
      title: null,
      colors: ["#E15E5A"],
      xAxis: {
        type: 'category',
        labels: {
          style: {
            fontSize: '12px',
            color: '#e3e3e3'
          }
        },
        gridLineColor: 'rgba(69,93,122,0.35)',
      },
      yAxis: {
        title: null,
        labels: {
          style: {
            fontSize: '12px',
            color: '#e3e3e3'
          }
        },
        gridLineColor: 'rgba(0,126,205,1)',
        minorGridLineColor: 'rgba(69,93,122,0.1)'
      },
      legend: {
        enabled: false
      },
      series: [{
        name: '预警数量',
        data: dataSingle
      }]
    });


}

/**
 * WiFi 预警
 * @param {*} _containerId 
 * @param {*} _queryType 
 * @param {*} _vm 
 */
let loadWarnningWifi = async function (_containerId, _queryType, _vm) {
    let dataSingle = [];
    switch (_queryType) {
      case 0:
        {
          let result = await httpGetData("/103?type=0", {});
          let _total = 0;
          for (const key in result) {
            if (result.hasOwnProperty(key)) {
              const element = result[key];
              _total += element;
              dataSingle.push([key, element]);
            }
          }
          _vm.wifiNum = _total;
        }
        break;
      case 1:
        {
          let result = await httpGetData("/103?type=1", {});
          let _total = 0;
          for (const iterator of result) {
            _total += iterator.val;
            dataSingle.push([iterator.day, iterator.val]);
          }
          _vm.wifiNum = _total;
        }
        break;
      case 2:
        {
          let result = await httpGetData("/103?type=2", {});
          let _total = 0;
          for (const iterator of result) {
            _total += iterator.val;
            dataSingle.push([iterator.index, iterator.val]);
          }
          _vm.wifiNum = _total;
        }
        break;
    }
		console.log("---- dataSingle ----",dataSingle);
    Highcharts.chart(_containerId, {
      credits: {
        enabled: false
      }, //隐藏highcharts的站点标志
      exporting: {
        enabled: false
      },
      chart: {
        type: 'column'
      },
      title: null,
      colors: ["#584bd6"],
      xAxis: {
        labels: {
          style: {
            fontSize: '12px',
            color: '#e3e3e3'
          }
        },
        type: 'category',
        gridLineColor: 'rgba(69,93,122,0.35)',
      },
      yAxis: {
        min: 0,
        title: null,
        labels: {
          style: {
            fontSize: '12px',
            color: '#e3e3e3'
          }
        },
        gridLineColor: 'rgba(0,126,205,1)',
        minorGridLineColor: 'rgba(69,93,122,0.1)'
      },
      series: [{
        name: '数量',
        data: dataSingle,
        showInLegend: false,
        dataLabels: {
          enabled: true,
          align: "center",
          color: 'white',
          style: {
            "fontSize": "12px",
            "fontWeight": "normal"
          }
        }
      }]
    });
}
