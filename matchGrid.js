function sandstormSkillFormat(row, cell, value, columnDef, dataContext){
	var rtn
	switch(value){
		case -1:
			rtn={text:"Data Not Avalible",addClasses:"NA"}
			break;
		case 0:
			rtn={text:"No Sandstorm",addClasses:"bad"}
			break;
		case 1:
			rtn={text:"Moves",addClasses:"ok"}
			break;
		case 2:
			rtn={text:"Cargo Ship Hatch",addClasses:"good"}
			break;
		case 3:
			rtn={text:"Level 1 Hatch",addClasses:"good"}
			break;
		case 4:
			rtn={text:"Level 2 Hatch",addClasses:"veryGood"}
			break;
		case 5:
			rtn={text:"Level 3 Hatch",addClasses:"superGood"}
			break;
		case 6:
			rtn={text:"Cargo Ship Cargo",addClasses:"good"}
			break;
		case 7:
			rtn={text:"Level 1 Rocket",addClasses:"good"}
			break;
		case 8:
			rtn={text:"Level 2 Rocket",addClasses:"veryGood"}
			break;
		case 9:
			rtn={text:"Level 3 Rocket",addClasses:"superGood"}
			break;
		default:
			rtn={text:value,addClasses:"NA"}
	}
	return rtn
}

function preloadFormat(row, cell, value, columnDef, dataContext){
	var rtn
	switch(value) {
		case -1:
			rtn={text:"N/A",addClasses:"NA"}
			break;
		case 0:
			rtn={text:"Nothing"}
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

function startingPosFormat(row, cell, value, columnDef, dataContext){
	var rtn
	switch(value){
		case -1:
			rtn={text:"N/A",addClasses:"NA"}
			break;
		case 0:
			rtn={text:"Close"}
			break;
		case 1:
			rtn={text:"Middle"}
			break;
		case 2:
			rtn={text:"Far"}
			break;
		default:
			rtn={text:value,addClasses:"NA"}
			break;
	}
	return rtn
}

function fieldFormat(row, cell, value, columnDef, dataContext){
	var rtn
	rtn={text:value}
	return rtn
}

function arrayLengthFormat(row, cell, value, columnDef, dataContext){
	if(!value)
	{
		return ""
	}
	return value.length
}

function timeFormat(row, cell, value, columnDef, dataContext){
        var rtn={text:value+"s"}
        if(!(0<value&&value<135)){
                rtn.addClasses="bad"
        }
        return rtn
}

function specificGrid(name, type, data){
        setVisiblity("specificGrid")
        document.getElementById("subNav").innerHTML="< "+name

        var columns
        if(type=="switch"){
                columns=[
                        {id:"type", name:"Type", field:"type"},
                        {id:"time", name:"Time", field:"time", formatter: timeFormat}
                ]

                document.getElementById("x").onclick=()=>setVisiblity('matchGrid')
        }else if(type="teams"){
                columns=teamColumns
                document.getElementById("x").onClick=()=>setVisiblity('teamGrid')
        }

        var options = {
                enableCellNavigation: true,
                enableColumnReorder: false,
                editable: false
        };

        grid.specific = new Slick.Grid("#specificGrid", data, columns, options);
        $("#specificGrid")[0].onresize=grid.specific.resizeCanvas
}

var matchData
function matchGridSetup() {
	specificGrid("Error","switch",{})
	setVisiblity("teamGrid")
	
	var columns = [
		{id: "match", name: "Match", field: "matchID", width:64, resizable:false, sortable:true, cssClass: "cell-title"},
		{id: "teamNumber", name: "Team", field: "team", width:64, resizable:false, sortable:true, cssClass: "cell-title"},
		{id: "teamName", name: "Name", field: "name", resizable:false, width:192, sortable:true, cssClass: "cell-title"},
		{id: "startingPos", name: "St Pos", field: "startingPos", width:64, resizable:false, sortable:false, formatter:startingPosFormat},
		{id: "robotPreload", name: "Preload", field: "robotPreload", width:64, resizable:false, sortable:true, formatter:preloadFormat},
		{id: "cargoOnField", name: "Field Cargo", field:"cargoOnField", width:90, resizable:false, sortable:true, formatter:fieldFormat},
		{id: "hatchesOnField", name: "Field Hatch", field:"hatchesOnField", width:90, resizable:false, sortable:true, formatter:fieldFormat},
		{id: "sandstormSkill", name: "Sandstorm", field: "sandstormSkill", width:128, resizable:false, sortable:true, formatter:sandstormSkillFormat},
		{id: "cargoShipCargo", name: "CC", field: "cargoShipCargo", resizable:false, width:32, sortable:true, formatter:arrayLengthFormat},
		{id: "rocketFirstLevelCargo", name: "1C", field: "rocketFirstLevelCargo", resizable:false, width:32, sortable:true, formatter:arrayLengthFormat},
		{id: "rocketSecondLevelCargo", name: "2C", field: "rocketSecondLevelCargo", width:32, resizable:false, sortable:true, formatter:arrayLengthFormat},
		{id: "rocketThirdLevelCargo", name: "3C", field: "rocketThridLevelCargo", width:32, resizable:false, sortable:true, formatter:arrayLengthFormat},
		{id: "cargoShipHatch", name: "CH", field: "cargoShipHatch", width:32, resizable:false, sortable:true, formatter:arrayLengthFormat},
		{id: "rocketFirstLevelHatch", name: "1H", field: "rocketFirstLevelHatch", width:32, resizable:false, sortable:true, formatter:arrayLengthFormat},
		{id: "rocketSecondLevelHatch", name: "2H", field: "rocketSecondLevelHatch", width:32, resizable:false, sortable:true, formatter:arrayLengthFormat},
		{id: "rocketThirdLevelHatch", name: "3H", field: "rocketThridLevelHatch", width:32, resizable:false, sortable:true, formatter:arrayLengthFormat}
	];
	
	var options = {
		enableCellNavigation: true,
		enableColumnReorder: false,
		editable: false
	};
	
	matchData = JSON.parse("["+rawMatchData+"]");
	for (var i = 0; i < matchData.length; i++) {
		if(!teams[matchData[i].team]){
			matchData[i].name="N/A"
			continue
		}
		matchData[i].name=teams[matchData[i].team].name;
	}
	
	grid.match = new Slick.Grid("#matchGrid", matchData, columns, options);
	
	grid.match.onClick.subscribe(function(e){
		var cell=grid.match.getCellFromEvent(e)
		var row=grid.match.getDataItem(cell.row)
	})
}
