require('./main.scss');

import $ from 'jquery';

let $menu = $('.menu'),
    $menuItems = $menu.children('.menu__item'),
    $itemWidth = $menuItems.first().width(),
    $itemHeight = $menuItems.first().height();

let $colorBar = $menu.children('.color-bar');

const transitionEvent = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';


const setNewPosition = (position) => {
	$colorBar.css({
	  'shape-inside': position,
	  '-webkit-clip-path': position
	});
};

const prepareClipPosition = (edges) => [
	`${edges.left}px 0`,
	`${edges.right}px 0`,
	`${edges.right}px ${$itemHeight}px`,
	`${edges.left}px ${$itemHeight}px`
];

const onColorBarTransitionEnd = (position) => {
  $colorBar.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', () => {
  	$colorBar.css({
  		'transition-duration': '350ms',
  		'transition-timing-function': 'cubic-bezier(0,.31,.78,.52)'
  	})

  	setNewPosition(position);
  });
}

// Metoda przesuwają 'bloczek'
const moveClip = ($item, isBackward = false) => {
  const edgesOnEnd = {
  	left: $item.position().left,
  	right: $item.position().left + $itemWidth
  }

  let clipPositionEnd = `polygon(${prepareClipPosition(edgesOnEnd)})`;
	onColorBarTransitionEnd(clipPositionEnd);

	const edgesOnStart = {
  	left: $item.prev().position().left,
  	right: $item.position().left + ($itemWidth * 0.25)
  }

  let clipPositionStart = `polygon(${prepareClipPosition(edgesOnStart)})`;
  setNewPosition(clipPositionStart);
}

//Generowanie paska z gradientem
const loadColorBar = () => {
  const perWidth = 100 / $menuItems.length;
  const getColorPalette = () => {
    const colorArr = [];
    $menuItems.each((index, element) => {
      let $elColor = $(element).attr('active-color');
      if (index == 0) {
          colorArr.push(`${$elColor} 0%`);
      }
      colorArr.push(`${$elColor} ${perWidth * index}%`);
      colorArr.push(`${$elColor} ${perWidth * (index+1)}%`);
    });

    return colorArr.join(',');
  }
  $colorBar.css({ 'background-image': `linear-gradient(to right,  ${getColorPalette()})` });

  //moveClip($menuItems.first(), 0)
}

// Poniżej automatyczna animacja

/*const moveBox = (index, el) => {
    setTimeout(() => { moveClip($(el), index) }, 1200 * index);
}

const backToStart = () => {
    $colorBar.css({
        'transition-duration': '1500ms'
    });
    moveClip($menuItems.first(), 0)
}

const animate = () => {
    $colorBar.css({
        'transition-duration': '1000ms'
    });
    $menuItems.each(moveBox);
    setTimeout(() => { backToStart(); }, 6500);
    setTimeout(animate, 8000);

}*/

const bindMoveToClick = () => {
	$menuItems.each(
		(index, element) => {
			$(element).click( () => moveClip($(element)))
		}
	);
}

loadColorBar();
bindMoveToClick();
