function getSyllables(words) {
    return words.map(word => {
        return new Promise((resolve, reject) => {
            if (word == 'dog')
                return { word, numSyllables: 1 }
            else if (word == 'kitten')
                return { word, numSyllables: 2 }
            else
                return new Error('unrecognized word!');
        })
    })
}


const words = ['dog', 'kitten'];
getSyllables(words)
    .then(success => {
      debugger;  
    })
    .catch(error => {
        console.log('error!', error);
    })
