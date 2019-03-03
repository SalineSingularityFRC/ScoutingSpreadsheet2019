function comparisonFormatter(row, cell, value, columnDef, dataContext){
	var rtn= {text: value}
	if (value !== null || value !== "") {
		if (value < 33) {
          rtn.addClasses = "red";
        } else if (value < 66) {
          rtn.addClasses =  "orange";
        } else {
          rtn.addClasses =  "green";
        }
	}
	return rtn
}

function autonFormatter(row, cell, value, columnDef, dataContext){
	if(typeof value=="undefined"){return "N/A"}
	var value=value.slice()
	for(var i=0;i<value.length;i++){
		value[i]=value[i]/dataContext.matchTotal
	}
	var rtn=""
	resetMakeDiv()
	rtn+=makeDiv(value[0], "red")
	rtn+=makeDiv(value[1], "yellow")
	rtn+=makeDiv(value[2], "green")
	rtn+=makeDiv(value[3], "blue")
	
	return rtn;
}
var makeDivCount=0
function resetMakeDiv(){makeDivCount=0}
function makeDiv(width, color){
	var left=makeDivCount
	makeDivCount+=width
	return '<div style="position:absolute;top:25%;height:50%;left:'+left*100+'%;background:'+color+';width:'+width*100+'%"></div>'
}
var maxCubeNum=0
var maxNums={cubeNum:0,vault:0}
function averager(row, cell, v, columnDef, dataContext){

	if(!(dataContext.matchTotal>0)){
		return {text:"N/A", addClasses:"NA"}
	}
	
	
	
	value=v/dataContext.matchTotal
	maxNums[columnDef.id]=Math.max(maxNums[columnDef.id], value)
	
	//return {text:value+'<div class="colorCompare" value="'+value+'" style="position:absolute;height:100%;width:16px;right:0"></div>', addClasses:columnDef.id}
	return {text:value, addClasses:columnDef.id}
}

var maxClimbNum=0
function climbAverager(row, cell, value, columnDef, dataContext){
	maxClimbNum=Math.max(maxClimbNum, value/dataContext.matchTotal)
	value = value/dataContext.matchTotal*100
	
	if (value < 50) {
      color = "red";
    } else if (value < 75) {
      color = "silver";
    } else {
      color = "green";
    }
	
	return {text:"<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "px;'></span>"+
	'<span class="climbAveValue" style="position:absolute;left:8px">'+value+'%</span>',
	addClasses:"climbAveCell"}
}

function cubePercent(row, cell, value, columnDef, dataContext){
	 if (value == null || value === "") {
      return "";
    }
	
	value=value/dataContext.cubeTotal*100
    var color;

    if (value < 25) {
      color = "red";
    } else if (value < 50) {
      color = "silver";
    } else {
      color = "green";
    }

    return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "px;'></span>";
}

//var selectedTeams=[]
function chooseSortTeams(){
	var selectedTeams=prompt("Enter teams separated by commas",selectedTeams).split(",")
	var data=[]
	for(var i=0;i<selectedTeams.length;i++){
		selectedTeams[i]=parseInt(selectedTeams[i])
		data.push(teams[selectedTeams[i]])
	}
	specificGrid("Filter", "teams", data)
}

var teamColumns;
function teamGridSetup() {

	teamColumns = [
		{id: "team", name: "Team", field: "team", width:64, resizable:false, sortable:true, cssClass: "cell-title"},
		{id: "name", name: "Name", field: "name", minWidth:128, width:256, cssClass: "cell-title"},
		//{id: "gscore", name: "G Score", field: "gscore", sortable:true, formatter:comparisonFormatter},
		{id: "auton", name: "auton", field: "auton", formatter:autonFormatter},
		{id: "cubeNum", name: "Cubes Handled per Game", field: "cubeTotal", formatter:averager},
		{id: "vault", name: "Vault", field: "vault", width:110, resizable:false, formatter:cubePercent},
		//{id: "cubeTime", name: "Time Difference Between Cube Placement", field: "cubeTime"},
		{id: "percentSwitch", name: "Switch Focus", field: "percentSwitch", width:110, resizable:false, formatter:cubePercent},
		{id: "percentScale", name: "Scale Focus", field: "percentScale", width:110, resizable:false, formatter:cubePercent},
		{id: "percentSwitchEnemy", name: "Enemy Switch", field: "percentSwitchEnemy", width:110, resizable:false, formatter:cubePercent},
		{id: "climbSuccess", name: "Climb Success", field: "climbSuccess", width:110, resizable:false, formatter:climbAverager}
	];


	var options = {
		enableCellNavigation: true,
		enableColumnReorder: false,
		editable: false
	};



	
	for (var i = 0; i < matchData.length; i++) {
		var match=matchData[i]
		var team=teams[match.team]
		if(!team){continue}
		team.percentSwitch+=match.switchFriendly.length
		team.percentSwitchEnemy+=match.switchEnemy.length
		team.percentScale+=match.scale.length
		team.vault+=match.vault.length
		team.cubeTotal+=match.switchFriendly.length+match.switchEnemy.length+match.scale.length+match.vault.length
		team.climbSuccess+=match.climbSkill==2
		team.matchTotal++
		if(!team.auton){team.auton=[0,0,0,0]}
		team.auton[match.autonSkill]++
	}
	
	grid.team = new Slick.Grid("#teamGrid", teamData, teamColumns, options);
	
	updateCubeNumberColor()
	document.getElementById("teamGrid").getElementsByClassName("slick-viewport")[0].onscroll=updateCubeNumberColor
}

function updateCubeNumberColor(){
	var cubeNumCells=document.getElementsByClassName("cubeNum")
	for(var i=0;i<cubeNumCells.length;i++){
		var value=parseInt(cubeNumCells[i].innerHTML)
		if(isNaN(value)){
			continue
		}
		cubeNumCells[i].style.background=getRGB(value/maxNums.cubeNum)
	}
	
	/*var vaultCells=document.getElementsByClassName("vault")
	for(var i=0;i<cubeNumCells.length;i++){
		var value=parseInt(vaultCells[i].innerHTML)
		if(isNaN(value)){
			continue
		}
		vaultCells[i].style.background=getRGB(value/maxNums.vault)
	}*/
}