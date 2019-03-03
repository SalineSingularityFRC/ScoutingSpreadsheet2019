var getMatchData
var getTeamData
var matchDataHelper
var teamDataHelper
var rawMatchData
var rawTeamData
var matchData
var teamData
var tryAgain=250

matchDataHelper=function(){
	if(getMatchData.readyState==4){
		rawMatchData=getMatchData.responseText
		matchReady=true
		dataSetup()
	}else{
		setTimeout(matchDataHelper,tryAgain)
	}
}

teamDataHelper=function(){
	if(getTeamData.readyState==4){
		rawTeamData=getTeamData.responseText
		teamReady=true
		dataSetup()
	}else{
		setTimeout(teamDataHelper,tryAgain)
	}
}

var teamReady
var matchReady
var teams=[]
function dataSetup(){
	if(teamReady&&matchReady){
		
		teamData=JSON.parse("["+rawTeamData+"]")
		for (var i = 0; i < teamData.length; i++) {
		  teams[teamData[i].team]=teamData[i]
		  Object.assign(teamData[i],{
			  /*cubeNum:0, cubeTime:0,*/ percentSwitch:0, percentScale:0, percentSwitchEnemy:0, climbSuccess:0,
			  /*cubeTimeAdd:0,*/ cubeTotal:0, matchTotal:0, vault:0
		  })
		}
		
		matchGridSetup()
		teamGridSetup()
	}
}


function getData(){
	teamReady = matchReady = false
	try{
		nw.App.clearCache()
	}catch(e){
		console.info("NWJS not present")
	}
	getMatchData=$.getJSON("http://192.168.1.2/matchData.json");
	getTeamData=$.getJSON("http://192.168.1.2/teamData.json");
	matchDataHelper()
	teamDataHelper()
}

$(function(){getData()})