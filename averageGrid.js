function cargoColor(row, cell, value, columnDef, dataContext){
	var rtn;
	rtn={text: value, addClasses:"cargoColor"}
	return rtn;
}

function hatchColor(row, cell, value, columnDef, dataContext){
	var rtn;
	rtn={text: value, addClasses:"hatchColor"}
	return rtn;
}

var grid;
var averageColumns = [
	{id: "teamNumber", name: "Team", field:"team", sortable:true},
	//{id: "robotPreload", name: "Preload", field:"robotPreload", sortable: true},
	//{id: "sandstorm", name: "Sandstorm", field:"sandstorm", sortable: true},
	{id: "averageCargo", name: "Cargo Avg.", field: "cargoAverage", sortable: true, formatter: cargoColor},
	{id: "averageHatch", name: "Hatch Avg.", field: "hatchAverage", sortable: true, formatter: hatchColor},
	{id: "totalMatches", name: "Total Matches", field: "totalMatches", sortable: true},
	{id: "level2", name: "Level 2 Start", field: "level2Average", sortable: true, formatter: Slick.Formatters.PercentCompleteBar}
	//{id: "climb", name: "Climb", field: "climb", sortable: true}
];
var options = {
	enableCellNavigation: true,
	enableColumnReorder: false
};

function averageGridSetup() {
	$.getJSON("http://192.168.20.12/matchData.json", function( json ) {
		var selectedData = [];
		var allData = [];
		var n = 0;
		var matchData = JSON.stringify(json);
		var obj = jQuery.parseJSON(matchData);
		for (i=0;i<obj.length;i++){
			allData[i] = {
				matchID: obj[i].matchID,
				team: obj[i].team,
				startingPos: obj[i].startingPos,
				robotPreload: obj[i].robotPreload,
				cargoOnField: obj[i].cargoOnField,
				hatchesOnField: obj[i].hatchesOnField,
				sandstormSkill: obj[i].sandstormSkill,
				cargoShipCargo: obj[i].cargoShipCargo.length,
				rocketFirstLevelCargo: obj[i].rocketFirstLevelCargo.length,
				rocketSecondLevelCargo: obj[i].rocketSecondLevelCargo.length,
				rocketThirdLevelCargo: obj[i].rocketThirdLevelCargo.length,
				cargoShipHatch: obj[i].cargoShipHatch.length,
				rocketFirstLevelHatch: obj[i].rocketFirstLevelHatch.length,
				rocketSecondLevelHatch: obj[i].rocketSecondLevelHatch.length,
				rocketThirdLevelHatch: obj[i].rocketThirdLevelHatch.length,
				climbSkill: obj[i].climbSkill,
				matchCargo: obj[i].cargoShipCargo.length + obj[i].rocketFirstLevelCargo.length + obj[i].rocketSecondLevelCargo.length + obj[i].rocketThirdLevelCargo.length,
				matchHatch: obj[i].cargoShipHatch.length + obj[i].rocketFirstLevelHatch.length + obj[i].rocketSecondLevelHatch.length + obj[i].rocketThirdLevelHatch.length
			};
		}
		for (i=0; i<allData.length; i++){
			var alreadyAdded = false;
			for (j=0;j<selectedData.length;j++){
				if(selectedData[j].team===allData[i].team)
					alreadyAdded = true;
			}
			if(!alreadyAdded) {
				selectedData[n] = {
					team: allData[i].team,
					//figure out what to do for startingPos
					cargoAverage: 0,
					totalCargo: 0,
					hatchAverage: 0,
					totalHatch: 0,
					totalMatches: 0,
					level2Total: 0,
					level2Average: 0
				};
				n++;
			}
		}
		for (i=0; i<allData.length; i++) {
			for (j=0;j<selectedData.length;j++) {
				if (allData[i].team === selectedData[j].team) {
					selectedData[j].totalMatches = selectedData[j].totalMatches + 1;
					selectedData[j].totalCargo = selectedData[j].totalCargo + allData[i].matchCargo;
					selectedData[j].totalHatch = selectedData[j].totalHatch + allData[i].matchHatch;
					selectedData[j].cargoAverage = selectedData[j].totalCargo / selectedData[j].totalMatches;
					selectedData[j].cargoAverage = selectedData[j].cargoAverage.toFixed(3);
					selectedData[j].hatchAverage = selectedData[j].totalHatch / selectedData[j].totalMatches;
					selectedData[j].hatchAverage = selectedData[j].hatchAverage.toFixed(3);
					if(allData[i].startingPos === -2 || allData[i].startingPos === -3)
						selectedData[j].level2Total = selectedData[j].level2Total + 1;
					selectedData[j].level2Average = selectedData[j].level2Total / selectedData[j].totalMatches * 100;
				}
			}
		}
		grid = new Slick.Grid("#myGrid", selectedData, averageColumns, options);
	});
}
averageGridSetup();
