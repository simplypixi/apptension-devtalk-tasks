require('./main.scss');

import $ from "jquery";

let $menu = $(".menu"),
    $menuItems = $menu.children(".menu__item");
let $colorBar = $menu.children(".color-bar");

const moveClip = ($item, index) => {
  let itemWidth = $item.width();
  let itemHeight = $item.height();

  let clipPosition = `polygon(
    ${itemWidth * index}px 0, ${itemWidth * (index + 1)}px 0, 
    ${itemWidth * (index + 1)}px ${itemHeight}px,  ${itemWidth * index}px ${itemHeight}px
  )`;

  $colorBar.css({
    'shape-inside': clipPosition,
    '-webkit-clip-path': clipPosition
  });
}

const loadColorBar = () => {
  const perWidth = 100 / $menuItems.length;
  const getColorPalette = () => {
    const colorArr = [];
    $menuItems.each((index, element) => {
      let $elColor = $(element).attr('hover-color');
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
			$(element).click( () => moveClip($(element), index))
		}
	);
}

loadColorBar();
bindMoveToClick();
