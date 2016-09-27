export const forEach = function (array, fn) {
	if (typeof fn !== "function") {
		throw new TypeError();
	}

	const recur = function (element, index, arr) {
		fn(element);
		return element && index++ < arr.length - 1 ?  recur(array[index], index, arr) : arr;
	}

	return recur(array[0], 0, array);
}