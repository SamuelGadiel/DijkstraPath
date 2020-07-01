// https://editor.p5js.org/Sorrel/sketches/ryJ0Wwr5Q

var centerLng = -18.8530184;
var centerLat = -48.5322813;
var zoom = 9;

var map = L.map('map').setView([centerLng, centerLat], zoom);
var buffer = 0.04;
var collection = [];
var geojsonlist = [];

L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map);

var nodes = {
  "A":{coord:[-18.9129274, -48.2754288]},     //Uberlandia
  "B":{coord:[-18.6463608,-48.1984886]},      //Araguari
  "C":{coord:[-18.5787601,-47.8762361]},      //Cascalho Rico
  "D":{coord:[-18.4946883,-47.7246553]},      //Grupiara
  "E":{coord:[-18.7452439,-47.6928841]},      //Estrela do Sul
  "F":{coord:[-18.8860708,-47.5817591]},      //Roraima
  "G":{coord:[-19.3108772,-47.5334116]},      //Santa Juliana
  "H":{coord:[-19.0343673,-47.9163043]},      //Indianopolis
  "I":{coord:[-18.594193,-48.7045413]},       //Tupaciguara
  "J":{coord:[-18.8728899,-48.8766021]},      //Monte Alegre
  "K":{coord:[-19.0345057,-48.6935081]},      //Douradinhos
  "L":{coord:[-18.4096777,-49.2154759]},      //Itumbiara
  "M":{coord:[-18.5898591,-49.1971929]},      //Centralina
  "N":{coord:[-18.6828207,-49.5702941]},      //Capinopolis
  "O":{coord:[-18.9746266,-49.4602148]},      //Ituiutaba

};

var geojson = [
  {"type": "LineString", "coordinates": [[-48.2754288, -18.9129274], [-48.1984886, -18.6463608]]},
  {"type": "LineString", "coordinates": [[-48.2754288, -18.9129274], [-47.5817591, -18.8860708]]},
  {"type": "LineString", "coordinates": [[-48.2754288, -18.9129274], [-47.9163043, -19.0343673]]},
  {"type": "LineString", "coordinates": [[-48.2754288, -18.9129274], [-48.7045413, -18.594193]]},
  {"type": "LineString", "coordinates": [[-48.2754288, -18.9129274], [-48.8766021, -18.8728899]]},
  {"type": "LineString", "coordinates": [[-48.2754288, -18.9129274], [-48.6935081, -19.0345057]]},

  {"type": "LineString", "coordinates": [[-48.1984886, -18.6463608], [-47.8762361, -18.5787601]]},
  {"type": "LineString", "coordinates": [[-48.1984886, -18.6463608], [-47.6928841, -18.7452439]]},

  {"type": "LineString", "coordinates": [[-47.8762361, -18.5787601], [-47.7246553, -18.4946883]]},
  {"type": "LineString", "coordinates": [[-47.7246553, -18.4946883], [-47.6928841, -18.7452439]]},
  {"type": "LineString", "coordinates": [[-47.6928841, -18.7452439], [-47.5817591, -18.8860708]]},
  {"type": "LineString", "coordinates": [[-47.5817591, -18.8860708], [-47.5334116, -19.3108772]]},
  {"type": "LineString", "coordinates": [[-47.5334116, -19.3108772], [-47.9163043, -19.0343673]]},
  {"type": "LineString", "coordinates": [[-48.7045413, -18.594193], [-48.8766021, -18.8728899]]},
  {"type": "LineString", "coordinates": [[-48.8766021, -18.8728899], [-48.6935081, -19.0345057]]},
  {"type": "LineString", "coordinates": [[-48.7045413, -18.594193], [-49.2154759, -18.4096777]]},
  {"type": "LineString", "coordinates": [[-49.2154759, -18.4096777], [-49.1971929, -18.5898591]]},
  {"type": "LineString", "coordinates": [[-49.1971929, -18.5898591], [-48.8766021, -18.8728899]]},
  {"type": "LineString", "coordinates": [[-49.1971929, -18.5898591], [-49.5702941, -18.6828207]]},
  {"type": "LineString", "coordinates": [[-49.5702941, -18.6828207], [-49.4602148, -18.9746266]]},
  {"type": "LineString", "coordinates": [[-49.4602148, -18.9746266], [-48.8766021, -18.8728899]]},
  {"type": "LineString", "coordinates": [[-49.4602148, -18.9746266], [-48.6935081, -19.0345057]]}
];

L.geoJSON(geojson, {style: {color:"#d765e6"}}).addTo(map);

function showNodes(nodes){
  for(var a in nodes){
    L.circleMarker(nodes[a].coord,{radius:5,color:"#ff7700",fillOpacity:1}).bindPopup('Ponto ' + a).addTo(map);
  }
}


var basicGraph = [
{start:"A",finish:"B",distance:30},
{start:"A",finish:"F",distance:78},
{start:"A",finish:"H",distance:45},
{start:"A",finish:"I",distance:60},
{start:"A",finish:"J",distance:60},
{start:"A",finish:"K",distance:63},
{start:"B",finish:"C",distance:28},
{start:"B",finish:"E",distance:34},
{start:"C",finish:"D",distance:32},
{start:"D",finish:"E",distance:38},
{start:"E",finish:"F",distance:27},
{start:"F",finish:"G",distance:28},
{start:"G",finish:"H",distance:40},
{start:"I",finish:"J",distance:44},
{start:"I",finish:"L",distance:55},
{start:"J",finish:"M",distance:75},
{start:"J",finish:"O",distance:85},
{start:"J",finish:"K",distance:28},
{start:"K",finish:"O",distance:90},
{start:"L",finish:"M",distance:20},
{start:"M",finish:"N",distance:40},
{start:"N",finish:"O",distance:30}
];

var graph = readyGraph(basicGraph);
selectedPoints()

function showStartFinish(start,finish){
  L.circleMarker(nodes[start].coord,{radius:5,color:"#00ff00",fillOpacity:1}).bindPopup('Ponto Inicial ' + start).addTo(map);
  L.circleMarker(nodes[finish].coord,{radius:5,color:"#ff0000",fillOpacity:1}).bindPopup('Ponto Final ' + finish).addTo(map);
}

function showPath(start,path){
  var lineCoords = [];
  lineCoords.push(nodes[start].coord);
  for(var i=0;i<path.length;i++){
      var nodeName =path[i];
      lineCoords.push(nodes[nodeName].coord);
  }
  var polyline = L.polyline(lineCoords, {color: 'blue'}).addTo(map);
}

function solve(graph,s,f) {
    var solutions = {};
    solutions[s] = [];
    solutions[s].dist = 0;
    while(true) {
        var parent = null;
        var nearest = null;
        var dist = Infinity;
        for(var n in solutions) {
            if(!solutions[n])
                continue
            var ndist = solutions[n].dist;
            var adj = graph[n];
            for(var a in adj) {
                if(solutions[a])
                    continue;
                var d = adj[a] + ndist;
                if(d < dist) {
                    parent = solutions[n];
                    nearest = a;
                    dist = d;
                }
            }
        }
        if(dist === Infinity) {
            break;
        }
        solutions[nearest] = parent.concat(nearest);
        solutions[nearest].dist = dist;
    }
    var finish = solutions[f];
    return {results:solutions,path:finish,distance:finish.dist};
}

function readyGraph(paths) {
    var graph = {};
    for(var i in paths){
        var path = paths[i];
        var start=path["start"];
        var finish=path["finish"];
        var distance=path["distance"];
        if(typeof graph[start]=="undefined"){
            graph[start]={};
            graph[start][finish]=distance;
        }else{
            graph[start][finish]=distance;
        }
        if(typeof graph[finish]=="undefined"){
            graph[finish]={};
            graph[finish][start]=distance;
        }else{
            graph[finish][start]=distance;
        }
    }
    return graph;
}

function selectedPoints(){
  L.geoJSON(geojson, {style: {color:"#d765e6"}}).addTo(map);
  showNodes(nodes)
  var e = document.getElementById("inicioSelect");
  var start = e.options[e.selectedIndex].value;

  var e = document.getElementById("fimSelect");
  var finish = e.options[e.selectedIndex].value;


  var shortestPath = solve(graph,start,finish);
  showPath(start,shortestPath.path);
  showNodes(nodes);
  showStartFinish(start,finish);

}
