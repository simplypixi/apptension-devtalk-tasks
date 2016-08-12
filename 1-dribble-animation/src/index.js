require('./main.scss');

import $ from 'jquery';

let $menu = $('.menu'),
    $menuItems = $menu.children('.menu__item'),
    $itemWidth = $menuItems.first().width(),
    $itemHeight = $menuItems.first().height(),
		$colorBar = $menu.children('.color-bar');

let clipPosition = {
	left: 0,
	right: $itemWidth
}

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

const updateClipPosition = (tween, element) => {
	let clipPositionStart = `polygon(${prepareClipPosition(clipPosition)})`;
	setNewPosition(clipPositionStart);
}

const moveClip = ($item) => {
	const newPosition = {
			left: $item.position().left,
			right: $item.position().left + $itemWidth
		};

	let isBackward = newPosition.left < clipPosition.left;

	TweenMax.to(clipPosition, 1.0, {
			ease:Power3.easeOut,
	    right: newPosition[isBackward ? 'left' : 'right'],
	    autoCSS: false, 
	    onUpdate: updateClipPosition, 
	    onUpdateParams: ["{self}", clipPosition]
	  }
	)
	TweenMax.to(clipPosition, 1.25, {
			ease: Power4.easeOut,
	    left: newPosition[isBackward ? 'right' : 'left'],
	    autoCSS: false, 
	    onUpdate: updateClipPosition, 
	    onUpdateParams: ["{self}", clipPosition],
	    delay: 0.25
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
  moveClip($menuItems.first())
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
	moveClip($item);
	deselectAllTabs();
	selectTab($item);
	toggleClass($item, $menuItems);
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
