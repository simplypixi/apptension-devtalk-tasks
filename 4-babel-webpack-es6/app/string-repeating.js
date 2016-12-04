const jsonObj = {
	songs: [
		{
			id: 0,
			songPhraseStart: 'ole ',
			songPhraseEnd: ' nie damy sie'
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
	let phrase = `<p id="${id}" style="font-size: 20px;,
	sans-serif;"> ${capitalize(v.songPhraseStart)} ${v.songPhraseEnd}.</p>`;
	el.innerHTML += phrase;
}

const songsPhrase = jsonObj.songs.map(repeatSongsPhrase);

songsPhrase.forEach(displaySongs);

let doAnimCounter = 0;

let animParam = {
	text: '',
	delay: 1,
	ease: Power0.easeNone,
	onComplete: null
}

const gsapAnim = (target, color, animParam) => {
	TweenMax.set(target, {
		fontSize: '20px',
	});
	TweenMax.to(target, 2.5, animParam);
}

const doAnimFirst = () => {
	let target = document.querySelector('#songPhraseStart_0'),
		color = '#91e600',
		songsPhraseParam = (doAnimCounter % 2 ? 0 : 1);
	animParam.text = capitalize(songsPhrase[songsPhraseParam].songPhraseStart) + songsPhrase[songsPhraseParam].songPhraseEnd + '.',
	animParam.onComplete = doAnimSecond;
	gsapAnim(target, color, animParam);
}

const doAnimSecond = () => {
	let target = document.querySelector('#songPhraseStart_1'),
		color = '#ffa500',
		songsPhraseParam = (doAnimCounter % 2 ? 1 : 0);
	animParam.text = capitalize(songsPhrase[songsPhraseParam].songPhraseStart) + songsPhrase[songsPhraseParam].songPhraseEnd + '.',
	animParam.onComplete = doAnimFirst;
	doAnimCounter ++;
	gsapAnim(target, color, animParam);
}

setTimeout(function(){ doAnimFirst(); }, 3000);

export {songsPhrase}
