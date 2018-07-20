class Http {
  constructor() {
    this.http = new XMLHttpRequest();
  }

    get(url) {
        const self = this; // сохранить контекст вызова
        return new Promise((resolve, reject)=> {
            this.http.open("GET", url);
            this.http.addEventListener("load", function () {
                if (self.http.status === 200) {
                    resolve({
                        err: null,
                        response: self.http.responseText
                    });
                } else {
                    reject({
                        err: `Error: ${self.http.status}`,
                        response: null
                    });

                }
            });

            this.http.send();
        })
    }

  post(url, data, callback) {
    if (!data) return callback('Error: Data обязательный параметр');

    this.http.open("POST", url);
    this.http.setRequestHeader("Content-type", "application/json");

    const self = this; // сохранить контекст вызова
    this.http.addEventListener("load", function () {
      if (self.http.status === 200 || self.http.status === 201) {
        callback(null, self.http.responseText);
      } else {
        callback(`Error: ${self.http.status}`, null);
      }
    });

    this.http.send(JSON.stringify(data));
  }

  put(url, data, callback) {
    if (!data) return callback('Error: Data обязательный параметр');

    this.http.open("PUT", url);
    this.http.setRequestHeader("Content-type", "application/json");

    const self = this; // сохранить контекст вызова
    this.http.addEventListener("load", function () {
      if (self.http.status === 200 || self.http.status === 201) {
        callback(null, self.http.responseText);
      } else {
        callback(`Error: ${self.http.status}`, null);
      }
    });

    this.http.send(JSON.stringify(data));
  }

  delete(url, callback) {
    this.http.open("DELETE", url);
    this.http.setRequestHeader("Content-type", "application/json");

    const self = this; // сохранить контекст вызова
    this.http.addEventListener("load", function () {
      if (self.http.status === 200 || self.http.status === 201) {
        callback(null, "Post deleted");
      } else {
        callback(`Error: ${self.http.status}`, null);
      }
    });

    this.http.send();
  }
}











