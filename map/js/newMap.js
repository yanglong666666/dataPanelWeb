
GlobalMap = {
    mapObj: null,
    provinceLayer: null,
    cityLayer: null,
    prjRef: "EPSG:4326",
    styleCacheZA:{},
    styleCacheKJ:{},
    earthquakeFill:new ol.style.Fill({
        color: 'rgba(255, 153, 0, 0.8)'
    }),
    earthquakeStroke:new ol.style.Stroke({
        color: 'rgba(255, 204, 0, 0.2)',
        width: 1
    }),
    textFill:new ol.style.Fill({
        color: '#fff'
    }),
    textStroke:new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.6)',
        width: 3
    }),
    invisibleFill:new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.01)'
    }),
    maxFeatureCount:0,
    vector:null,

    createEarthquakeStyle:function(feature){
        // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
        // standards-violating <magnitude> tag in each Placemark.  We extract it
        // from the Placemark's name instead.
        var name = feature.get('name');
        var magnitude = parseFloat(name.substr(2));
        var radius = 5 + 20 * (magnitude - 5);

        return new ol.Style({
            geometry: feature.getGeometry(),
            image: new RegularShape({
                radius1: radius,
                radius2: 3,
                points: 5,
                angle: Math.PI,
                fill: GlobalMap.earthquakeFill,
                stroke: GlobalMap.earthquakeStroke
            })
        });
    },

    calculateClusterInfo:function(resolution,vecLayer) {
        GlobalMap.maxFeatureCount = 0;
        var features = vecLayer.getSource().getFeatures();
        var feature, radius;
        for (var i = features.length - 1; i >= 0; --i) {
            feature = features[i];
            var originalFeatures = feature.get('features');
            var extent = createEmpty();
            var j = (void 0), jj = (void 0);
            for (j = 0, jj = originalFeatures.length; j < jj; ++j) {
                extend(extent, originalFeatures[j].getGeometry().getExtent());
            }
            GlobalMap.maxFeatureCount = Math.max(GlobalMap.maxFeatureCount, jj);
            radius = 0.25 * (getWidth(extent) + getHeight(extent)) /
                resolution;
            feature.set('radius', radius);
        }
    },

    currentResolution:0.0,

    KJ_styleFunction:function(feature, resolution) {
        if (resolution != GlobalMap.currentResolution) {
            GlobalMap.calculateClusterInfo(resolution,this.clusterKJ);
            GlobalMap.currentResolution = resolution;
        }
        var style;
        var size = feature.get('features').length;
        if (size > 1) {
            style = new Style({
                image: new ol.Circle({
                    radius: feature.get('radius'),
                    fill: new ol.style.Fill({
                        color: [255, 153, 0, Math.min(0.8, 0.4 + (size / GlobalMap.maxFeatureCount))]
                    })
                }),
                text: new ol.style.Text({
                    text: size.toString(),
                    fill: GlobalMap.textFill,
                    stroke: GlobalMap.textStroke
                })
            });
        } else {
            var originalFeature = feature.get('features')[0];
            style = GlobalMap.createEarthquakeStyle(originalFeature);
        }
        return style;
    },

    ZA_styleFunction:function(feature, resolution) {
        if (resolution != GlobalMap.currentResolution) {
            GlobalMap.calculateClusterInfo(resolution,this.clusterZA);
            GlobalMap.currentResolution = resolution;
        }
        var style;
        var size = feature.get('features').length;
        if (size > 1) {
            style = new Style({
                image: new Circle({
                    radius: feature.get('radius'),
                    fill: new Fill({
                        color: [255, 153, 0, Math.min(0.8, 0.4 + (size / GlobalMap.maxFeatureCount))]
                    })
                }),
                text: new Text({
                    text: size.toString(),
                    fill: GlobalMap.textFill,
                    stroke: GlobalMap.textStroke
                })
            });
        } else {
            var originalFeature = feature.get('features')[0];
            style = GlobalMap.createEarthquakeStyle(originalFeature);
        }
        return style;
    },

    selectStyleFunction:function(feature) {
        var styles = [new Style({
            image: new ol.style.Circle({
                radius: feature.get('radius'),
                fill: GlobalMap.invisibleFill
            })
        })];
        var originalFeatures = feature.get('features');
        var originalFeature;
        for (var i = originalFeatures.length - 1; i >= 0; --i) {
            originalFeature = originalFeatures[i];
            styles.push(GlobalMap.createEarthquakeStyle(originalFeature));
        }
        return styles;
    },

    clusterZA:new ol.layer.Vector({
        source: new ol.source.Cluster({//聚合source
            distance: 100,
            source: new ol.source.Vector({//矢量数据源source
                projection: 'EPSG:4326',
                url: 'http://100.11.44.225:6080/arcgis/rest/services/DeviceData/MapServer/0/query?where=0=0&f=pjson',
                format: new ol.format.EsriJSON({
                    geometryName: 'geometry'
                })
            })
        }),
        style:this.ZA_styleFunction
    }),

    clusterKJ:new ol.layer.Vector({
        source: new ol.source.Cluster({//聚合source
            distance: 100,
            source: new ol.source.Vector({//矢量数据源source
                projection: 'EPSG:4326',
                url: 'http://100.11.44.225:6080/arcgis/rest/services/DeviceData/MapServer/1/query?where=0=0&f=pjson',
                format: new ol.format.EsriJSON({
                    geometryName: 'geometry'
                })
            })
        }),
        style:this.KJ_styleFunction
    }),

    init: function (mapdiv) {
        //arcgis动态图层服务地址
        var url = "http://100.11.44.225:6080/arcgis/rest/services/WH/MapServer";
        var urlData = "http://100.11.44.225:6080/arcgis/rest/services/DeviceData/MapServer";
        //var urlZA = "http://100.11.44.225:6080/arcgis/rest/services/DeviceData/MapServer/0";
        //var urlKJ = "http://100.11.44.225:6080/arcgis/rest/services/DeviceData/MapServer/0";

        var map = new ol.Map({
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.TileArcGISRest({
                        url:url
                    })
                }),
                GlobalMap.clusterZA,
                GlobalMap.clusterKJ
            ],
            interactions: ol.interaction.defaults().extend([new ol.interaction.Select({
                condition: function(evt) {
                    return evt.type == 'pointermove' ||
                        evt.type == 'singleclick';
                },
                style: GlobalMap.selectStyleFunction
            })]),
            target: mapdiv,
            view: new ol.View({
                center: ol.proj.transform([114.344916,30.262397],'EPSG:4326','EPSG:3857'),
                zoom: 12
            })
        });

    }
}