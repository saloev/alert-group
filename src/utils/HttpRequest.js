/**
 * Make HTTP request
 * */
export default class HttpRequest {
  /**
   *
   * @param {String} method
   * @param {String} url
   * @param {any} data
   *
   * @returns Promise
   */
  // eslint-disable-next-line class-methods-use-this
  static request(url = 'localhost', data = {}, method = 'GET') {
    return new Promise((resolve, rejected) => {
      const httpRequest = new XMLHttpRequest();

      httpRequest.open(method, url);
      httpRequest.setRequestHeader('Access-Control-Allow-Origin', '*');

      httpRequest.onload = () => {
        if (this.status >= 200 && this.status <= 300) {
          resolve(httpRequest.response);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          rejected({
            status: this.status,
            statusText: httpRequest.statusText,
          });
        }
      };

      httpRequest.onerror = () => {
        // eslint-disable-next-line prefer-promise-reject-errors
        rejected({
          status: this.status,
          statusText: httpRequest.statusText,
        });
      };

      httpRequest.send(data);
    });
  }
}
