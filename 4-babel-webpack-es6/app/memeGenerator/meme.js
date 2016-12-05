export default class Meme {
	constructor({quote, source}, date) {
		this.quote = quote;
		this.source = source;
		this.date = date;
	}

	get text() {
		return `\
		<div>\
			<div class='meme__quote text--centered'>"${this.quote}"</div>\
			<div class='meme__source text--centered'>${this.source}</div>\
			<div class='meme__date text--centered'>${this.date}</div>\
		</div>`;
	}
}
