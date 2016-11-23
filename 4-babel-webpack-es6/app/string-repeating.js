export let test = 5;
const jsonObj = {
	songs: [
		{
			id: 1,
			songPhraseStart: 'ole ',
			songPhraseEnd: 'nie damy sie '
		},
		{
			id: 2,
			songPhraseStart: 'polska gola ',
			songPhraseEnd: 'taka jest kibicow wola '
		}
	]
}

const repeatSongsPhrase = (v) => {
	if (v.id === 1) {
		v.songPhraseStart = v.songPhraseStart.repeat(4);
		v.songPhraseEnd = v.songPhraseEnd.repeat(2);
	} else if(v.id === 2) {
		v.songPhraseStart = v.songPhraseStart.repeat(2);
		v.songPhraseEnd = v.songPhraseEnd.repeat(1);
	}
	return v;
}

const songsPhrase = jsonObj.songs.map(repeatSongsPhrase);

export {songsPhrase}
