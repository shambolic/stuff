module.exports = function makeImportant (str, leng = str.length){
	return`${str}${'!'.repeat(leng)}`
	}

//    official solution	
//    module.exports =
//		 (string, bangs = string.length) => string + "!".repeat(bangs);