console.log(html`<b>${process.argv[2]} says</b>: "${process.argv[3]}"`);

function html(textArray, ...subs){

// buld the result string
	var result = textArray[0];
	
	for (var i=0; i < subs.length; ++i){
		result += escape(subs[i]) + textArray[i + 1];
		
	}
	return result;
}
	function escape(s){
		return s.replace(/&/g, "&amp;")
		        .replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
		        .replace(/'/g, "&apos;")
    			.replace(/"/g, "&quot;");
}

// console.log("textArray: "+ textArray.toString())
	// return
	// function substitute(chunk){
	//
	// }




