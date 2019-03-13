var getMatchData=[]
var matchDataHelper
var rawMatchData
var matchData
var tryAgain=250
var matchReady


matchDataHelper=function(){
	if(getMatchData.readyState==4){
		rawMatchData=getData().responseText;
		matchReady=true;
	}else{
		setTimeout(matchDataHelper,tryAgain);
	}
	return rawMatchData;
}

function getData(){
	
	matchReady = false
	try{
		nw.App.clearCache()
	}catch(e){
		console.info("NWJS not present")
	}
	getMatchData=$.getJSON("http://192.168.20.12/matchData.json");

	getMatchData.then(function(data, textStatus, jqxhr) {
  		var matchdata;
		matchdata =  jqxhr.responseText;
	})
}

function startingPosFormat(row, cell, value, columnDef, dataContext){
	var rtn;
	switch(value){
		case -1:
			rtn={text:"N/A",addClasses:"NA"}
			break;
		case 2:
			rtn={text:"1 Close"}
			break;
		case 1:
			rtn={text:"Middle"}
			break;
		case 3:
			rtn={text:"1 Far"}
			break;
		case -2:
			rtn={text:"2 Close"}
			break;
		case -3:
			rtn={text:"2 Far"}
			break;
		default:
			rtn={text:value,addClasses:"NA"}
			break;
	}
	return rtn
}

function preloadFormat(row, cell, value, columnDef, dataContext){
	var rtn;
	switch(value){
		case -1:
			rtn={text:"N/A",addClasses:"NA"}
			break;
		case 0:
			rtn={text:"None"}
			break;
		case 1:
			rtn={text:"Cargo"}
			break;
		case 2:
			rtn={text:"Hatch"}
			break;
		default:
			rtn={text:value,addClasses:"NA"}
			break;
	}
	return rtn
}

function climbFormat(row, cell, value, columnDef, dataContext){
	var rtn;
	switch(value){
		case -1:
			rtn={text:"N/A", addClasses:"NA"}
			break;
		case 0:
			rtn={text:"None", addClasses:"bad"}
			break;
		case 1:
			rtn={text:"Level 1", addClasses:"ok"}
			break;
		case 2:
			rtn={text:"Level 2", addClasses:"good"}
			break;
		case 3:
			rtn={text:"Level 3",addClasses:"veryGood"}
			break;
		default:
			rtn={text:value,addClasses:"NA"}
			break;
	}
	return rtn
}

function cargo(row, cell, value, columnDef, dataContext){
	var rtn;
	rtn={text: value, addClasses:"cargoColor"}
	return rtn
}

function hatch(row, cell, value, columnDef, dataContext){
	var rtn;
	rtn={text: value, addClasses:"hatchColor"}
	return rtn
}

function allianceFormat(row, cell, value, columnDef, dataContext){
	var rtn;
	switch(dataContext.alliance){
		case 0:
			rtn={text: value}
			break;
		case 1:
			rtn={text: value, addClasses:"blueTeam"}
			break;
		case 2:
			rtn={text: value, addClasses:"redTeam"}
			break;
		default:
			rtn={text: value}
			break;
	}
	return rtn
}

function sandstormFormat(row, cell, value, columnDef, dataContext){
	var rtn;
	switch(value){
		case -1:
			rtn={text:"N/A", addClasses:"NA"}
			break;
		case 0:
			rtn={text:"None", addClasses:"bad"}
			break;
		case 1:
			rtn={text:"Moves", addClasses:"ok"}
			break;
		case 2:
			rtn={text:"CH", addClasses:"good"}
			break;
		case 3:
			rtn={text:"1H", addClasses:"good"}
			break;
		case 4:
			rtn={text:"2H", addClasses:"veryGood"}
			break;
		case 5:
			rtn={text:"3H", addClasses:"superGood"}
			break;
		case 6:
			rtn={text:"CC", addClasses:"good"}
			break;
		case 7:
			rtn={text:"1C", addClasses:"good"}
			break;
		case 8:
			rtn={text:"2C", addClasses:"veryGood"}
			break;
		case 9:
			rtn={text:"3C", addClasses:"superGood"}
			break;
		case 5066:
			rtn={text:"5066", addClasses:"superGood"}
			break;
		default:
			rtn={text:value,addClasses:"NA"}
			break;
	}
	return rtn
}

function filter() {
	$.getJSON("http://192.168.20.12/matchData.json", function( json ) {
		var retVal1 = prompt("Blue Alliance (Separate by commas): ", "");
		var retVal2 = prompt("Red Alliance (Separate by commas): ", "");
		var none = false;
		const blueTeams = retVal1.split(", ");
		const redTeams = retVal2.split(", ");
		var colors = [blueTeams, redTeams];
		var data = [];
		var matchData = JSON.stringify(json);
		var obj = jQuery.parseJSON(matchData);
		var j = 0;
		grid = new Slick.Grid("#myGrid", data, columns, options);
		for (var t = 0; t < 2; t++) {
			for (var n = 0; n < colors[t].length; n++){
				for (var i = 0; i < obj.length; i++) {
					if (colors[t][n] == obj[i].team) {
						var tCargo = obj[i].cargoShipCargo.length + obj[i].rocketFirstLevelCargo.length + obj[i].rocketSecondLevelCargo.length + obj[i].rocketThirdLevelCargo.length
						var tHatch = obj[i].cargoShipHatch.length + obj[i].rocketFirstLevelHatch.length + obj[i].rocketSecondLevelHatch.length + obj[i].rocketThirdLevelHatch.length
						data[j] = {
							matchID: obj[i].matchID,
							team: obj[i].team,
							startingPos: obj[i].startingPos,
							robotPreload: obj[i].robotPreload,
							/*cargoOnField: obj[i].cargoOnField,
							hatchesOnField: obj[i].hatchesOnField,*/
							sandstormSkill: obj[i].sandstormSkill,
							cargoShipCargo: obj[i].cargoShipCargo.length,
							rocketFirstLevelCargo: obj[i].rocketFirstLevelCargo.length,
							rocketSecondLevelCargo: obj[i].rocketSecondLevelCargo.length,
							rocketThirdLevelCargo: obj[i].rocketThirdLevelCargo.length,
							totalCargo: tCargo,
							cargoShipHatch: obj[i].cargoShipHatch.length,
							rocketFirstLevelHatch: obj[i].rocketFirstLevelHatch.length,
							rocketSecondLevelHatch: obj[i].rocketSecondLevelHatch.length,
							rocketThirdLevelHatch: obj[i].rocketThirdLevelHatch.length,
							totalHatch: tHatch,
							climbSkill: obj[i].climbSkill,
							alliance: t+1
						}
						j++;
					}
				}
				if (n+1 < colors[t].length) {
					for (var s = 0; s < 1; s++) {
						data[j] = {
						}
						j++;
					}
				}
				if (t === 0 && n+1 === colors[t].length && colors[1] != "") {
					for (var s = 0; s < 1; s++) {
						data[j] = {
						}
						j++;
					}
				}
			}
		}
		grid.invalidate();
		grid.render();
		grid.onSort.subscribe(function(e, args) {
			var cols = args.sortCols;
			data.sort(function (dataRow1, dataRow2) {
				for (var i = 0, l = cols.length; i < 1; i++) {
					var field = cols[i].sortCol.field;
					var sign = cols[i].sortAsc ? 1 : -1;
					var value1 = dataRow1[field], value2 = dataRow2[field];
					var result = (value1 == value2 ? 0 : (value1 > value2 ? 1: -1)) * sign;
					if (result != 0) {
						return result;
					}
				}
				return 0;
			});
			grid.invalidate();
			grid.render();
		});
	});
}

function allTeams() {
$.getJSON("http://192.168.20.12/matchData.json", function( json ) {	
var data = [];
        var matchData = JSON.stringify(json);
	var obj = jQuery.parseJSON(matchData);
	for (var i = 0; i < obj.length; i++) {
		var tHatch = obj[i].cargoShipHatch.length + obj[i].rocketFirstLevelHatch.length + obj[i].rocketSecondLevelHatch.length + obj[i].rocketThirdLevelHatch.length;
		var tCargo = obj[i].cargoShipCargo.length + obj[i].rocketFirstLevelCargo.length + obj[i].rocketSecondLevelCargo.length + obj[i].rocketThirdLevelCargo.length;
		data[i]= {
			matchID: obj[i].matchID,
			team: obj[i].team,
			startingPos: obj[i].startingPos,
			robotPreload: obj[i].robotPreload,
			/*cargoOnField: obj[i].cargoOnField,
			hatchesOnField: obj[i].hatchesOnField,*/
			sandstormSkill: obj[i].sandstormSkill,
			cargoShipCargo: obj[i].cargoShipCargo.length,
			rocketFirstLevelCargo: obj[i].rocketFirstLevelCargo.length,
			rocketSecondLevelCargo: obj[i].rocketSecondLevelCargo.length,
			rocketThirdLevelCargo: obj[i].rocketThirdLevelCargo.length,
			totalCargo: tCargo,
			cargoShipHatch: obj[i].cargoShipHatch.length,
			rocketFirstLevelHatch: obj[i].rocketFirstLevelHatch.length,
			rocketSecondLevelHatch: obj[i].rocketSecondLevelHatch.length,
			rocketThirdLevelHatch: obj[i].rocketThirdLevelHatch.length,
			totalHatch: tHatch,
			climbSkill: obj[i].climbSkill,
			alliance: 0
		};
	}
	grid = new Slick.Grid("#myGrid", data, columns, options);
	grid.onSort.subscribe(function (e, args) {
		var cols = args.sortCols;
		data.sort(function (dataRow1, dataRow2) {
			for (var i = 0, l = cols.length; i < l; i++) {
				var field = cols[i].sortCol.field;
				var sign = cols[i].sortAsc ? 1 : -1;
				var value1 = dataRow1[field], value2 = dataRow2[field];
				var result = (value1 == value2 ? 0 : (value1 > value2 ? 1: -1)) * sign;
				if (result != 0) {
					return result;
				}
			}
			return 0;
		});
		grid.invalidate();
		grid.render();
	});
    });
}


var grid
  var columns = [
    {id: "matchID", name: "#", field: "matchID", sortable: true, width:16},
    {id: "teamNumber", name: "Team", field: "team", sortable: true, width: 48, formatter: allianceFormat},
    {id: "startingPos", name: "St Pos", field: "startingPos",sortable: true, formatter: startingPosFormat, width: 64},
    {id: "robotPreload", name: "Preload", field: "robotPreload",sortable: true,formatter: preloadFormat, width:64},
    /*{id: "cargoOnField", name: "Field Cargo", field: "cargoOnField", sortable:true},
    {id: "hatchesOnField", name: "Field Hatches", field: "hatchesOnField", sortable: true},*/
    {id: "sandstormSkill", name: "Sandstorm", field: "sandstormSkill", sortable: true, formatter: sandstormFormat},
    {id: "cargoShipCargo", name: "Ship Cargo", field: "cargoShipCargo", sortable: true, formatter: cargo},
    {id: "rocketFirstLevelCargo", name: "1 Cargo", field: "rocketFirstLevelCargo", sortable: true, formatter: cargo},
    {id: "rocketSecondLevelCargo", name: "2 Cargo", field: "rocketSecondLevelCargo", sortable: true, formatter: cargo},
    {id: "rocketThirdLevelCargo", name: "3 Cargo", field: "rocketThirdLevelCargo", sortable: true, formatter: cargo},
    {id: "cargoShipHatch", name: "Ship Hatch", field: "cargoShipHatch", sortable: true, formatter:hatch},
    {id: "rocketFirstLevelHatch", name: "1 Hatch", field: "rocketFirstLevelHatch", sortable: true, formatter:hatch},
    {id: "rocketSecondLevelHatch", name: "2 Hatch", field: "rocketSecondLevelHatch", sortable: true,formatter:hatch},
    {id: "rocketThirdLevelHatch", name: "3 Hatch", field: "rocketThirdLevelHatch", sortable: true,formatter:hatch},
    {id: "totalCargo", name: "Total Cargo", field: "totalCargo", sortable: true, formatter:cargo},
    {id: "totalHatches", name: "Total Hatch", field: "totalHatch", sortable: true,formatter:hatch},
    {id: "climbSkill", name: "Climb", field:"climbSkill", sortable: true, formatter: climbFormat, width: 64}
  ];
  var options = {
    enableCellNavigation: true,
    enableColumnReorder: false,
    multiColumnSort:true
  };
  function gridSetup() {
    $.getJSON("http://192.168.20.12/matchData.json", function( json ) {	
var data = [];
        var matchData = JSON.stringify(json);
	var obj = jQuery.parseJSON(matchData);
	for (var i = 0; i < obj.length; i++) {
		var tHatch = obj[i].cargoShipHatch.length + obj[i].rocketFirstLevelHatch.length + obj[i].rocketSecondLevelHatch.length + obj[i].rocketThirdLevelHatch.length;
		var tCargo = obj[i].cargoShipCargo.length + obj[i].rocketFirstLevelCargo.length + obj[i].rocketSecondLevelCargo.length + obj[i].rocketThirdLevelCargo.length;
		data[i]= {
			matchID: obj[i].matchID,
			team: obj[i].team,
			startingPos: obj[i].startingPos,
			robotPreload: obj[i].robotPreload,
			/*cargoOnField: obj[i].cargoOnField,
			hatchesOnField: obj[i].hatchesOnField,*/
			sandstormSkill: obj[i].sandstormSkill,
			cargoShipCargo: obj[i].cargoShipCargo.length,
			rocketFirstLevelCargo: obj[i].rocketFirstLevelCargo.length,
			rocketSecondLevelCargo: obj[i].rocketSecondLevelCargo.length,
			rocketThirdLevelCargo: obj[i].rocketThirdLevelCargo.length,
			totalCargo: tCargo,
			cargoShipHatch: obj[i].cargoShipHatch.length,
			rocketFirstLevelHatch: obj[i].rocketFirstLevelHatch.length,
			rocketSecondLevelHatch: obj[i].rocketSecondLevelHatch.length,
			rocketThirdLevelHatch: obj[i].rocketThirdLevelHatch.length,
			totalHatch: tHatch,
			climbSkill: obj[i].climbSkill,
			alliance: 0
		};
	}
	grid = new Slick.Grid("#myGrid", data, columns, options);
	grid.onSort.subscribe(function (e, args) {
		var cols = args.sortCols;
		data.sort(function (dataRow1, dataRow2) {
			for (var i = 0, l = cols.length; i < l; i++) {
				var field = cols[i].sortCol.field;
				var sign = cols[i].sortAsc ? 1 : -1;
				var value1 = dataRow1[field], value2 = dataRow2[field];
				var result = (value1 == value2 ? 0 : (value1 > value2 ? 1: -1)) * sign;
				if (result != 0) {
					return result;
				}
			}
			return 0;
		});
		grid.invalidate();
		grid.render();
	});
    });
}
