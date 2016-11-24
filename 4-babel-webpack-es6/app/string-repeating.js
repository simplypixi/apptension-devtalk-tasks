const jsonObj = {
	songs: [
		{
			id: 0,
			songPhraseStart: 'ole ',
			songPhraseEnd: 'nie damy sie'
		},
		{
			id: 1,
			songPhraseStart: 'polska gola ',
			songPhraseEnd: 'taka jest kibicow wola'
		}
	]
}

const repeatSongsPhrase = (v) => {
	if (v.id === 0) {
		v.songPhraseStart = v.songPhraseStart.repeat(4);
		v.songPhraseEnd = v.songPhraseEnd.repeat(2);
	} else if(v.id === 1) {
		v.songPhraseStart = v.songPhraseStart.repeat(2);
		v.songPhraseEnd = v.songPhraseEnd.repeat(1);
	}
	return v;
}

const capitalize = (v) => v.charAt(0).toUpperCase() + v.slice(1);

const displaySongs = (v) => {
	let id = `songPhraseStart_${v.id}`;
	let el = document.querySelector('#string-repeating');
	let phrase = `<p id="${id}"> ${capitalize(v.songPhraseStart)} ${v.songPhraseEnd}.</p>`;
	el.innerHTML += phrase;
}

const songsPhrase = jsonObj.songs.map(repeatSongsPhrase);

songsPhrase.forEach(displaySongs);

const doAnimIn = () => {
	console.log('in');
	let target = document.querySelector('#songPhraseStart_0');
	TweenLite.to(target, 3, {
		text: capitalize(songsPhrase[1].songPhraseStart) + songsPhrase[1].songPhraseEnd + '.',
		delay: 1,  
		ease:Expo.easeIn, 
		onComplete: doAnimOut,
		onCompleteScope:this
	});
}

const doAnimOut = () => {
	console.log('out');
	let target = document.querySelector('#songPhraseStart_1');
	TweenLite.to(target, 3, {
		text: capitalize(songsPhrase[0].songPhraseStart) + songsPhrase[0].songPhraseEnd + '.',
		delay: 1, 
		ease:Expo.easeOut,
		onComplete: doAnimIn,
		onCompleteScope:this
	});
}

doAnimIn();

export {songsPhrase}
