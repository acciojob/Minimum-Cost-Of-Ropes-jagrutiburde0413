function calculateMinCost() {
 var inputData=document.querySelector("#rope-lengths");
	var inputArr=inputData.split(",")
	for(var i=0;i<inputArr.length;i++){
		inputArr[i]=Number(inputArr[i]);
	}
  var cost=0;
	inputArr.sort(function(a,b){
		return a-b;
	})
	while(inputArr.length>1){
			var newRope=inputArr[0]+inputArr[1];
          cost=cost+newRope;
		inputArr.splice(0,2)
		inputArr.push(newRope)
	}
					  
  


document.querySelector("#result").textContent=cost;
		
	
}  
