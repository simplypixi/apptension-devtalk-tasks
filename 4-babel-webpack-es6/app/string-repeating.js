//ES2015: Modules import
import {renderLayout} from './utils';

//ES2015: const
const jsonObj = {
  songs: [
    {
      id: 0,
      songPhraseStart: 'ole ',
      songPhraseStartRepeat: 4,
      songPhraseEnd: ' nie damy sie',
      songPhraseEndRepeat: 2
    },
    {
      id: 1,
      songPhraseStart: 'polska gola ',
      songPhraseStartRepeat: 2,
      songPhraseEnd: 'taka jest kibicow wola',
      songPhraseEndRepeat: 1
    }
  ]
};

//ES2015: arrow function
const repeatSongsPhrase = (v) => {
  v.songPhraseStart = v.songPhraseStart.repeat(v.songPhraseStartRepeat);
  v.songPhraseEnd = v.songPhraseEnd.repeat(v.songPhraseEndRepeat);
  return v;
};

const capitalize = (v) => v.charAt(0).toUpperCase() + v.slice(1);

let displayObjArr = [];

const displaySongs = (v) => {
  let id = `songPhraseStart_${v.id}`;
  let phrase = `${capitalize(v.songPhraseStart)} ${v.songPhraseEnd}.`;
  displayObjArr.push({id: id, phrase: phrase});
  renderLayout(displayObjArr, '#string-repeating-template', '#string-repeating');
};

const songsPhrase = jsonObj.songs.map(repeatSongsPhrase);

songsPhrase.forEach(displaySongs);

let doAnimCounter = 0;

let animParam = {
  text: '',
  delay: 1,
  ease: Power0.easeNone,
  onComplete: null
};

const gsapAnim = (target, color, animParam) => {
  TweenMax.set(target, {
    fontSize: '20px',
  });
  TweenMax.to(target, 2.5, animParam);
};

const doAnimFirst = () => {
  let target = document.querySelector('#songPhraseStart_0'),
    color = '#91e600',
    songsPhraseParam = (doAnimCounter % 2 ? 0 : 1);
  animParam.text = capitalize(songsPhrase[songsPhraseParam].songPhraseStart) + songsPhrase[songsPhraseParam].songPhraseEnd + '.',
    animParam.onComplete = doAnimSecond;
  gsapAnim(target, color, animParam);
};

const doAnimSecond = () => {
  let target = document.querySelector('#songPhraseStart_1'),
    color = '#ffa500',
    songsPhraseParam = (doAnimCounter % 2 ? 1 : 0);
  animParam.text = capitalize(songsPhrase[songsPhraseParam].songPhraseStart) + songsPhrase[songsPhraseParam].songPhraseEnd + '.',
    animParam.onComplete = doAnimFirst;
  doAnimCounter ++;
  gsapAnim(target, color, animParam);
};

setTimeout(function(){ doAnimFirst(); }, 3000);

export {songsPhrase}
