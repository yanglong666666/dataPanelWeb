var projection = ol.proj.get('EPSG:4326');//设置坐标系
var projectionExtent = projection.getExtent();
//分辨率
var resolutions = [
    1.40625,
    0.703125,
    0.3515625,
    0.17578125,
    0.087890625,
    0.0439453125,
    0.02197265625,
    0.010986328125,
    0.0054931640625,
    0.00274658203125,
    0.001373291015625,
    0.0006866455078125,
    0.00034332275390625,
    0.000171661376953125,
    0.0000858306884765625,
    0.00004291534423828125,
    0.000021457672119140625,
    0.000010728836059570312,
    0.000005364418029785156,
    0.000002682209014892578,
    0.000001341104507446289
];
//瓦片矩阵
var matrixIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

var tdtVecLayer = new ol.layer.Tile({
    source: new ol.source.WMTS({
        name: "中国矢量1-18级",
        url: "http://t{0-6}.tianditu.com/vec_c/wmts",
        layer: "vec",
        style: "default",
        matrixSet: "c",
        format: "tiles",
        wrapX: true,//地图缩小后，防止在一个页面出现多个一样的地图
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions.slice(0, 19),//slice方法不清楚的请百度
            matrixIds: matrixIds.slice(0, 19)
        })
    }),
    maxResolution: resolutions[0],
    minResolution: resolutions[18]
});

var tdtAnoLayer = new ol.layer.Tile({
    source: new ol.source.WMTS({
        name: "中国矢量注记1-18级",
        url: "http://t{0-6}.tianditu.com/cva_c/wmts",
        layer: "cva",
        style: "default",
        matrixSet: "c",
        format: "tiles",
        wrapX: true,
        tileGrid: new ol.tilegrid.WMTS({
            origin: ol.extent.getTopLeft(projectionExtent),
            resolutions: resolutions.slice(0, 19),
            matrixIds: matrixIds.slice(0, 19)
        })
    }),
    maxResolution: resolutions[0],
    minResolution: resolutions[18]
});