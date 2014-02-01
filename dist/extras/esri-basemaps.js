/*! Esri-Leaflet - v0.0.1-beta.3 - 2014-02-01
*   Copyright (c) 2014 Environmental Systems Research Institute, Inc.
*   Apache License*/
!function(a){var b="https:"!==window.location.protocol?"http:":"https:",c="line-height:9px; text-overflow:ellipsis; white-space:nowrap;overflow:hidden; display:inline-block;",d="position:absolute; top:-38px; right:2px;",e="<img src='https://serverapi.arcgisonline.com/jsapi/arcgis/3.5/js/esri/images/map/logo-med.png' alt='Powered by Esri' class='esri-attribution-logo' style='"+d+"'>",f=function(a){return"<span class='esri-attributions' style='"+c+"'>"+a+"</span>"};a.esri.BasemapLayer=a.TileLayer.extend({statics:{TILES:{Streets:{urlTemplate:b+"//{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",attributionUrl:"https://static.arcgis.com/attribution/World_Street_Map",options:{minZoom:1,maxZoom:19,subdomains:["server","services"],attribution:f("Esri")+e}},Topographic:{urlTemplate:b+"//{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",attributionUrl:"https://static.arcgis.com/attribution/World_Topo_Map",options:{minZoom:1,maxZoom:19,subdomains:["server","services"],attribution:f("Esri")+e}},Oceans:{urlTemplate:b+"//server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}",attributionUrl:"https://static.arcgis.com/attribution/Ocean_Basemap",options:{minZoom:1,maxZoom:16,subdomains:["server","services"],attribution:f("Esri")+e}},NationalGeographic:{urlTemplate:"https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",options:{minZoom:1,maxZoom:16,subdomains:["server","services"],attribution:f("Esri")+e}},DarkGray:{urlTemplate:b+"//tiles{s}.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Dark_Gray_Base_Beta/MapServer/tile/{z}/{y}/{x}",options:{minZoom:1,maxZoom:10,subdomains:[1,2],attribution:f("Esri, DeLorme, HERE")+e}},DarkGrayLabels:{urlTemplate:b+"//tiles{s}.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Dark_Gray_Reference_Beta/MapServer/tile/{z}/{y}/{x}",options:{minZoom:1,maxZoom:10,subdomains:[1,2]}},Gray:{urlTemplate:b+"//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",options:{minZoom:1,maxZoom:16,subdomains:["server","services"],attribution:f("Esri, NAVTEQ, DeLorme")+e}},GrayLabels:{urlTemplate:b+"//{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",options:{minZoom:1,maxZoom:16,subdomains:["server","services"]}},Imagery:{urlTemplate:b+"//{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",options:{minZoom:1,maxZoom:19,subdomains:["server","services"],attribution:f("Esri, DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community")+e}},ImageryLabels:{urlTemplate:b+"//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",options:{minZoom:1,maxZoom:19,subdomains:["server","services"]}},ImageryTransportation:{urlTemplate:b+"//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",options:{minZoom:1,maxZoom:19,subdomains:["server","services"]}},ShadedRelief:{urlTemplate:b+"//{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}",options:{minZoom:1,maxZoom:13,subdomains:["server","services"],attribution:f("ESRI, NAVTEQ, DeLorme")+e}},ShadedReliefLabels:{urlTemplate:b+"//{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}",options:{minZoom:1,maxZoom:12,subdomains:["server","services"]}}}},initialize:function(b,c){var d;if("object"==typeof b&&b.urlTemplate&&b.options)d=b;else{if("string"!=typeof b||!a.esri.BasemapLayer.TILES[b])throw new Error("L.esri.BasemapLayer: Invalid parameter. Use one of 'Streets', 'Topographic', 'Oceans', 'NationalGeographic', 'Gray', 'GrayLabels', 'DarkGray', 'DarkGrayLabels', 'Imagery', 'ImageryLabels', 'ImageryTransportation', 'ShadedRelief' or 'ShadedReliefLabels'");d=a.esri.BasemapLayer.TILES[b]}var e=a.Util.extend(d.options,c);if(a.TileLayer.prototype.initialize.call(this,d.urlTemplate,a.Util.setOptions(this,e)),d.attributionUrl){var f=d.attributionUrl;this._dynamicAttribution=!0,this._getAttributionData(f)}},_dynamicAttribution:!1,bounds:null,zoom:null,onAdd:function(b){return!b.attributionControl&&console?(console.warn("L.esri.BasemapLayer requires attribution. Please set attributionControl to true on your map"),void 0):(a.TileLayer.prototype.onAdd.call(this,b),this._dynamicAttribution&&(this.on("load",this._handleTileUpdates,this),this._map.on("viewreset zoomend dragend",this._handleTileUpdates,this)),this._map.on("resize",this._resizeAttribution,this),void 0)},onRemove:function(b){this._dynamicAttribution&&(this.off("load",this._handleTileUpdates,this),this._map.off("viewreset zoomend dragend",this._handleTileUpdates,this)),this._map.off("resize",this._resizeAttribution,this),a.TileLayer.prototype.onRemove.call(this,b)},_handleTileUpdates:function(a){var b,c;"load"===a.type&&(b=this._map.getBounds(),c=this._map.getZoom()),("viewreset"===a.type||"dragend"===a.type||"zoomend"===a.type)&&(b=a.target.getBounds(),c=a.target.getZoom()),this.attributionBoundingBoxes&&b&&c&&(b.equals(this.bounds)&&c===this.zoom||(this.bounds=b,this.zoom=c,this._updateMapAttribution()))},_resizeAttribution:function(){var a=this._map.getSize().x;this._getAttributionLogo().style.display=600>a?"none":"block",this._getAttributionSpan().style.maxWidth=.75*a+"px"},_getAttributionData:function(b){this.attributionBoundingBoxes=[],a.esri.RequestHandlers.JSONP(b,{},this._processAttributionData,this)},_processAttributionData:function(b){for(var c=0;c<b.contributors.length;c++)for(var d=b.contributors[c],e=0;e<d.coverageAreas.length;e++){var f=d.coverageAreas[e],g=new a.LatLng(f.bbox[0],f.bbox[1]),h=new a.LatLng(f.bbox[2],f.bbox[3]);this.attributionBoundingBoxes.push({attribution:d.attribution,score:f.score,bounds:new a.LatLngBounds(g,h),minZoom:f.zoomMin,maxZoom:f.zoomMax})}this.attributionBoundingBoxes.sort(function(a,b){return a.score<b.score?-1:a.score>b.score?1:0}),this.bounds&&this._updateMapAttribution()},_getAttributionSpan:function(){return this._map._container.querySelectorAll(".esri-attributions")[0]},_getAttributionLogo:function(){return this._map._container.querySelectorAll(".esri-attribution-logo")[0]},_updateMapAttribution:function(){for(var a="",b=0;b<this.attributionBoundingBoxes.length;b++){var c=this.attributionBoundingBoxes[b];if(this.bounds.intersects(c.bounds)&&this.zoom>=c.minZoom&&this.zoom<=c.maxZoom){var d=this.attributionBoundingBoxes[b].attribution;-1===a.indexOf(d)&&(a.length>0&&(a+=", "),a+=d)}}this._getAttributionSpan().innerHTML=a,this._resizeAttribution()}}),a.esri.basemapLayer=function(b,c){return new a.esri.BasemapLayer(b,c)}}(L);