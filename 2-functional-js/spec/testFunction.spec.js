import testFunction from '../src/testFunction.js';

describe('test function', () => {
	it('should return true value', () => {
		expect(testFunction()).toBe(true);
	})
})