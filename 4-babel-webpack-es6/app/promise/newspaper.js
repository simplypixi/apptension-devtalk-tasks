//ES2015: Modules export, Class
export class Newspaper {
  constructor(url) {
    this.url = url;
  }

  load(url) {
    //ES2015: Promise
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.onload = function () {
        const response = JSON.parse(this.response) || this.statusText;
        if (this.status === 200) {
          // Success
          resolve(response);
        } else {
          // Something went wrong (404 etc.)
          reject(new Error(response.message));
        }
      };
      request.onerror = function () {
        reject(new Error(`XMLHttpRequest Error: ${this.statusText}`));
      };
      request.open('GET', url);
      request.send();
    });
  }

  get() {
    return this.load(this.url)
  }
  getArticles() {
    return this.get().then(({articles}) => articles)
  }
}

//ES2015: Class with extends
export class MultiNewspapers extends Newspaper {
  //ES2015: Rest Parameter
  constructor(...urls) {
    super();
    this.urls = urls;
  }

  get() {
    //ES2015: Multiple promises
    return Promise.all(
      this.urls.map((url) => super.load(url))
    );
  }

  getArticles() {
    return this.get().then((data) => data
      .map(({articles}) => articles)
        .reduce((a, b) => a.concat(b))
    )
  }
}