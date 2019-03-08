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


var grid
  var columns = [
    {id: "matchID", name: "Match", field: "matchID"},
    {id: "teamNumber", name: "Team", field: "team"},
    {id: "startingPos", name: "St Pos", field: "startingPos"},
    {id: "robotPreload", name: "Preload", field: "robotPreload"},
    {id: "cargoOnField", name: "Field Cargo", field: "cargoOnField"},
    {id: "hatchesOnField", name: "Field Hatches", field: "hatchesOnField"},
    {id: "sandstormSkill", name: "Sandstorm", field: "sandstormSkill"},
    {id: "cargoShipCargo", name: "CC", field: "cargoShipCargo"},
    {id: "rocketFirstLevelCargo", name: "1C", field: "rocketFirstLevelCargo"},
    {id: "rocketSecondLevelCargo", name: "2C", field: "rocketSecondLevelCargo"},
    {id: "rocketThirdLevelCargo", name: "3C", field: "rocketThirdLevelCargo"},
    {id: "cargoShipHatch", name: "CH", field: "cargoShipHatch"},
    {id: "rocketFirstLevelHatch", name: "1H", field: "rocketFirstLevelHatch"},
    {id: "rocketSecondLevelHatch", name: "2H", field: "rocketSecondLevelHatch"},
    {id: "rocketThirdLevelHatch", name: "3H", field: "rocketThirdLevelHatch"},
    {id: "climbSkill", name: "Climb", field:"climbSkill"}
  ];
  var options = {
    enableCellNavigation: true,
    enableColumnReorder: false
  };
  $(function () {
	console.log("first here");
    $.getJSON("http://192.168.20.12/matchData.json", function( json ) {
console.log("now here");	
var data = [];
	console.log("here");
        var matchData = JSON.stringify(json);
	var obj = jQuery.parseJSON(matchData);
	console.log(obj[0].matchID);
	console.log(obj[1].matchID);
	for (var i = 0; i < obj.length; i++) {
		data[i]= {
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
			climbSkill: obj[i].climbSkill
		};
	}
	grid = new Slick.Grid("#myGrid", data, columns, options);
	console.log("easy");
    });
})

