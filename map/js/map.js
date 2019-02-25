
GlobalMap = {
    mapObj: null,
    prjRef: "EPSG:4326",
    styleCacheZA:{},
    styleCacheKJ:{},
    styleCacheWIFI:{},

    init: function (mapdiv) {
        var clusterZA = new ol.layer.Vector({
            source: new ol.source.Cluster({//聚合source
                distance: 200,
                source: new ol.source.Vector({//矢量数据源source
                    projection: 'EPSG:4326',
                    url:urlZA,
                    format: new ol.format.EsriJSON({
                        geometryName: 'geometry'
                    })
                })
            }),
            style: function (feature) {
                //聚合的样式可以根据属性自定义
                var features = feature.get('features');//当前聚合的所有feature
                var size = feature.get('features').length;
                var style = GlobalMap.styleCacheZA[size];
                //自动保存数量相同的样式，防止重新初始化，提高效率
                if (!style) {
                    style = new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 30,
                            stroke: new ol.style.Stroke({
                                color: '#ff46ee'
                            }),
                            fill: new ol.style.Fill({
                                color:  '#ff46ee'
                            })
                        }),
                        text: new ol.style.Text({
                            text: size.toString(),
                            fill: new ol.style.Fill({
                                color: '#3d23ff'
                            })
                        })
                    });

                    if(size==1)
                    {
                        style = new ol.style.Style({
                            image: new ol.style.Icon(({
                                anchor: [0.5, 46],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'pixels',
                                src: '/static/js/map/images/video.png'
                            }))
                        });
                    }

                    GlobalMap.styleCacheZA[size] = style;
                }
                return style;
            }
        });

        var clusterKJ = new ol.layer.Vector({
            source: new ol.source.Cluster({//聚合source
                distance: 200,
                source: new ol.source.Vector({//矢量数据源source
                    projection: 'EPSG:4326',
                    url: urlKJ,
                    format: new ol.format.EsriJSON({
                        geometryName: 'geometry'
                    })
                })
            }),
            style: function (feature) {
                //聚合的样式可以根据属性自定义
                var features = feature.get('features');
                var size = feature.get('features').length;
                var style = GlobalMap.styleCacheKJ[size];
                if (!style) {
                        style = new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 30,
                            stroke: new ol.style.Stroke({
                                color: '#1ee4ff'
                            }),
                            fill: new ol.style.Fill({
                                color:'#1ee4ff'
                            })
                        }),
                        text: new ol.style.Text({
                            text: size.toString(),
                            fill: new ol.style.Fill({
                                color: '#3d23ff'
                            })
                        })
                    });

                    if(size==1)
                    {
                        style = new ol.style.Style({
                            image: new ol.style.Icon(({
                                anchor: [0.5, 46],
                                anchorXUnits: 'fraction',
                                anchorYUnits: 'pixels',
                                src: '/static/js/map/images/snap.png'
                            }))
                        });
                    }

                    GlobalMap.styleCacheKJ[size] = style;
                }
                return style;
            }
        });

        var clusterWIFI = new ol.layer.Vector(
            {
                source: new ol.source.Cluster({//聚合source
                    distance: 200,
                    source: new ol.source.Vector({//矢量数据源source
                        projection: 'EPSG:4326',
                        url: urlWIFI,
                        format: new ol.format.EsriJSON({
                            geometryName: 'geometry'
                        })
                    })
                }),
                style: function (feature) {
                    //聚合的样式可以根据属性自定义
                    var features = feature.get('features');
                    var size = feature.get('features').length;
                    var style = GlobalMap.styleCacheKJ[size];
                    if (!style) {
                        style = new ol.style.Style({
                            image: new ol.style.Circle({
                                radius: 30,
                                stroke: new ol.style.Stroke({
                                    color: '#38ff50'
                                }),
                                fill: new ol.style.Fill({
                                    color:'#38ff50'
                                })
                            }),
                            text: new ol.style.Text({
                                text: size.toString(),
                                fill: new ol.style.Fill({
                                    color: '#3d23ff'
                                })
                            })
                        });

                        if(size==1)
                        {
                            style = new ol.style.Style({
                                image: new ol.style.Icon(({
                                    anchor: [0.5, 46],
                                    anchorXUnits: 'fraction',
                                    anchorYUnits: 'pixels',
                                    src: '/static/js/map/images/wifi.png'
                                }))
                            });
                        }

                        GlobalMap.styleCacheKJ[size] = style;
                    }
                    return style;
                }
            }
        )

        //初始化地图
        var map = new ol.Map({
            layers:[
                new ol.layer.Tile({
                    source: new ol.source.TileArcGISRest({
                        url:url
                    })
                }),
                clusterZA,
                clusterKJ,
                clusterWIFI
            ],
            target: mapdiv,
            view: new ol.View({
                center: ol.proj.transform([114.344916,30.262397],'EPSG:4326','EPSG:3857'),
                zoom:12
            })
        });
    }
}
