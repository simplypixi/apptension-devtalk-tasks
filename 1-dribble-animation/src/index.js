require('./main.scss');

import $ from 'jquery';

let $menu = $('.menu'),
    $menuItems = $menu.children('.menu__item'),
    $itemWidth = $menuItems.first().width(),
    $itemHeight = $menuItems.first().height();

let $colorBar = $menu.children('.color-bar');
let clipPosition = {
	left: 0,
	right: $itemWidth
}

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
  };
};

const updateClipPosition = (tween, element) => {
	let clipPositionStart = `polygon(${prepareClipPosition(clipPosition)})`;
	setNewPosition(clipPositionStart);
}

const tweenClip = ($item, isBackward = false) => {
	TweenMax
	.to(clipPosition, 1.0, {
			ease:Elastic.easeOut,
	    left: $item.position().left,
	    right: $item.position().left + $itemWidth,
	    autoCSS: false, 
	    onUpdate: updateClipPosition, 
	    onUpdateParams: ["{self}", clipPosition]
	  }
	);
}

// Oznaczanie aktywnego/kliknietego elementu
const toggleClass = ($item, $allItems) => {
  $allItems.removeClass('active');
  $item.addClass('active');
};

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
  };
  $colorBar.css({ 'background-image': `linear-gradient(to right,  ${getColorPalette()})` });

  //Set first menu item as active
  tweenClip($menuItems.first())
};

const deselectAllTabs = () => {
  $menuItems.each(
    (index, element) => {
      $(element).children().children('.content__icon-container').removeClass('active');
    });
};

const selectTab = ($item) => {
  $item.children().children('.content__icon-container').addClass('active');
};

const onClickMenuItem = ($item) => {
	toggleClass($item, $menuItems);
	tweenClip($item);
}

const bindMoveToClick = () => {
		$menuItems.each(
			(index, element) => {
				$(element).click( () => {
	        onClickMenuItem($(element));
	      })
			}
		);
};

loadColorBar();
bindMoveToClick();
