module.exports= class slectorClass {
	constructor(code, h0,h1,h2,h3) {
	    this.code = code;
	    this.h0 = h0;
	    this.h1 = h1;
	    this.h2 = h2;
	    this.h3 = h3;
	}

	balanceHome(){
		var current = [];
		current.push({id:0,count:this.h0});
		current.push({id:1,count:this.h1});
		current.push({id:2,count:this.h2});
		current.push({id:3,count:this.h3});
		var max =Math.max(this.h0,this.h1,this.h2,this.h3);
		var balanceArray =[];
		
		current.map((a) => {
			if(a.count!=max){
				balanceArray.push(a);
			}


		})

		if(balanceArray.length==0){
			balanceArray = current;
		}

		return balanceArray;
	}

	selectStudent(){

		var remainHome = this.balanceHome();
		var modCode = remainHome.length;

		var a = this.code % modCode;
		return remainHome[a];
	}

}
