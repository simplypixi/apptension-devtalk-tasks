require('./main.scss');

import $ from "jquery";

let $menu = $(".menu"),
    $menuItems = $menu.children(".menu__item"),
    $itemWidth = $menuItems.first().width(),
    $itemHeight = $menuItems.first().height();

let $colorBar = $menu.children(".color-bar");

const transitionEvent = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

// Metoda przesuwają 'bloczek'
const moveClip = ($item) => {
  const setNewPosition = (position) => {
  	console.log(position)
  	$colorBar.css({
  	  'shape-inside': position,
  	  '-webkit-clip-path': position
  	});
  };

  const prepareClipPosition = (positionLeft = 0) => [
  	`${positionLeft}px 0`,
  	`${positionLeft + $itemWidth}px 0`,
  	`${positionLeft + $itemWidth}px ${$itemHeight}px`,
  	`${positionLeft}px ${$itemHeight}px`
  ];

  //let clipRightEdgePosition = `polygon(${prepareClipPosition(index, $itemWidth * 0.75)})`;
  //setNewPosition(clipRightEdgePosition);

  console.log("click item position", $item.position())
  const posLeft = $item.position().left;
  let clipPosition = `polygon(${prepareClipPosition(posLeft)})`;
  setNewPosition(clipPosition);

  $item.one(transitionEvent, (e) => {
  	let clipPosition = `polygon(${prepareClipPosition(posLeft)})`;
  	setNewPosition(clipPosition);
  });
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

  moveClip($menuItems.first(), 0)
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
