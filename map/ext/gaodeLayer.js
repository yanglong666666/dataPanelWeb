/**
 * 扩展ol高德
 * 使用ES5语法书写
 * @Date 2017-3-27
 */

ol.source.AMap = function(options){
	var options = options ? options : {};

  	var url;
  	if(options.mapType == "sat"){
        url ="http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
  	}else{
        url = "http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}";
  	}
    
    ol.source.XYZ.call(this, {
  		crossOrigin: 'anonymous',   //跨域
	    cacheSize: options.cacheSize,
        projection: ol.proj.get('EPSG:3857'),
        // urls:urls,
        url:url,
    	wrapX: options.wrapX !== undefined ? options.wrapX : true

  	});

}

ol.inherits(ol.source.AMap,ol.source.XYZ);

//高德线划图
var aMapVecLayer = new ol.layer.Tile({
    title: "高德地图",
    source: new ol.source.AMap()
});

//高德线划图
var aMapVecAnoLayer = new ol.layer.Tile({
    title: "高德地图",
    source: new ol.source.AMap({mapType:"sat"})
});
