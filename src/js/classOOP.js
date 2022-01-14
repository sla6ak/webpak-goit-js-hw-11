// import axios from 'axios';
// const instance = axios.create({
//   baseURL: 'https://pixabay.com/api/',
// });

export class SendImg {
  constructor() {
    this.send = '';
    this.numberPages = 1;
    this.pages = 40;
  }
  async fetchImg(send, numberPages) {
    const meta = new URLSearchParams({
      key: '25142623-5ec88ba8c20545ff15079e1b4',
      q: this.send,
      orientation: 'horizontal',
      safesearch: true,
      image_type: 'photo',
      page: this.numberPages,
      per_page: this.pages,
    });
    const url = `https://pixabay.com/api/?${meta}`;
    const res = await fetch(url);
    return res.json();
  }
  // async fetchImg(send, numberPages) {
  //   // const API_KEY = '25142623-5ec88ba8c20545ff15079e1b4';
  //   const options = {
  //     params: {
  //       // key: '25142623-5ec88ba8c20545ff15079e1b4',
  //       q: this.send,
  //       orientation: 'horizontal',
  //       safesearch: true,
  //       image_type: 'photo',
  //       page: this.numberPages,
  //       per_page: this.pages,
  //     },
  //   };
  //   const res = await instance.get(`/?key=${API_KEY}`, options);
  //   console.log(res);
  // }

  get metodSend() {
    return this.send;
  }

  set metodSend(newSend) {
    if (newSend === '') {
      console.error('Ошибка! Почта не может быть пустой строкой!');
      return;
    }
    this.send = newSend;
  }

  nextPages() {
    this.numberPages += 1;
  }
  startPages() {
    this.numberPages = 1;
  }
}
