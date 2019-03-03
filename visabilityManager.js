function setVisiblity(who){
	$("#teamGrid")[0].style.visibility="hidden"
	$("#matchGrid")[0].style.visibility="hidden"
	$("#specificGrid")[0].style.visibility="hidden"
	$("#x")[0].style.visibility="hidden"
	$("#subNav")[0].style.visibility="hidden"
	
	
	if(who=="specificGrid"){
		$("#x")[0].style.visibility="visible"
		$("#x")[0].innerHTML="X"
		$("#x")[0].onclick=()=>{setVisiblity("teamGrid")}
		$("#subNav")[0].style.visibility="visible"
	}
	
	if(who=="teamGrid"){
		$("#x")[0].style.visibility="visible"
		$("#subNav")[0].style.visibility="visible"
		$("#subNav")[0].innerHTML=""
		$("#x")[0].innerHTML="Filter"
		$("#x")[0].onclick=chooseSortTeams
	}
	$("#"+who)[0].style.visibility="visible"
}

var win
try{
	win = nw.Window.get();
	win.on("resize", ()=>{
		$(".grid")[0].onresize()
		$(".grid")[1].onresize()
		$(".grid")[2].onresize()
	})
}catch(e){
	
}

function getRGB(n){
	return "rgb("+Math.ceil(255 * 2 * (1-n))+","+Math.floor(1.5 * 255 * n) +",0)"
}

$(function(){
	setVisiblity("teamGrid")
	document.getElementById("rootNav").onchange=function(){setVisiblity(this.value)}
})