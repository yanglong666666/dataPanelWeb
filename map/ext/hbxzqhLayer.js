 var provinceLayer;
 var cityLayer;

 $.getJSON("data/province_wgs84_topo.json", function (province) {
     if (province) {
         var provinceSource = new ol.source.Vector({
             features: []
         });

         var arrFeature = (new ol.format.TopoJSON()).readFeatures(province);
         var n = arrFeature.length;

         var minRes = 0.000005364418029785156;
         var maxRes = 1.40625;

         for (var i = 0; i < n; i++) {
             var feature = arrFeature[i];
             if(g_curBaseMapType==BaseMapType.BAIDUMAP) {
                 var geo = feature.getGeometry().transform('EPSG:4326', 'bd09mc');
                 feature.setGeometry(geo);
             }
             if(g_curBaseMapType==BaseMapType.GAODE)
             {
                 var geo = feature.getGeometry().transform('EPSG:4326','EPSG:3857');
                 feature.setGeometry(geo);
             }
             provinceSource.addFeature(feature);
         }

         if(g_curBaseMapType==BaseMapType.BAIDUMAP)
         {
             minRes = 225.759164940408456;
             maxRes = 3612.14663904653525;
         }

         if(g_curBaseMapType==BaseMapType.GAODE)
         {
             minRes = 0.298582141647617;
             maxRes = 156543.033928;
         }

         provinceLayer = new ol.layer.Vector({
             source: provinceSource,
             style: styleFunction
             //minResolution:minRes,
             //maxResolution:maxRes
         });
     }
 });

 $.getJSON("data/city_wgs84_topo.json", function (city) {
     if (city) {
         var citySource = new ol.source.Vector({
             features: []
         });
         var arrFeature = (new ol.format.TopoJSON()).readFeatures(city);
         var n = arrFeature.length;

         var minRes = 0.000005364418029785156;
         var maxRes = 1.40625;

         for (var i = 0; i < n; i++) {
             var feature = arrFeature[i];
             if(g_curBaseMapType==BaseMapType.BAIDUMAP) {
                 var geo = feature.getGeometry().transform('EPSG:4326', 'bd09mc');
                 feature.setGeometry(geo);
             }
             if(g_curBaseMapType==BaseMapType.GAODE)
             {
                 var geo = feature.getGeometry().transform('EPSG:4326','EPSG:3857');
                 feature.setGeometry(geo);
             }
             citySource.addFeature(feature);
         }

         if(g_curBaseMapType==BaseMapType.BAIDUMAP)
         {
             minRes = 225.759164940408456;
             maxRes = 3612.14663904653525;
         }

         if(g_curBaseMapType==BaseMapType.GAODE)
         {
             minRes = 0.298582141647617;
             maxRes = 156543.033928;
         }

         cityLayer = new ol.layer.Vector({
             source: citySource,
             style: styleFunction
             //minResolution:minRes,
             //maxResolution:maxRes
         });
     }
 });
