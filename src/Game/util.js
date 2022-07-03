export const checkWord = function(guess, word){
	const green = []
	let temp = ""
	const result = Array(5).fill(null)

	// letters on spot
	for(let i=0; i<guess.length; i++){
		if(guess[i] == word[i]){
			result[i] = "#6AAA64"
		}
	}

	// trim word
	for(let i=0; i<word.length; i++){
		if(!result[i]){
			temp += word[i]
		}
	}
	word = temp

	// letters on diff indexes
	for(let i=0; i<guess.length; i++){
		if(!green.includes(i) && word.includes(guess[i])){
			result[i] = "#C9B458"
			word = word.slice(0,i) + word.slice(i+1,)
		}
	}

	result.forEach((item, key) => {
		if(item == null){
			result[key] = "#787C7E"
		}
	})

	return result

}

