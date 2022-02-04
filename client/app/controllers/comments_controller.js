import { Controller } from '@hotwired/stimulus';

export default class extends Controller {

  resetText() {
    let commentField = document.getElementById('comment_text');
    console.log(commentField)
    commentField.value = '';
  }

  connect() {
    console.log('connected to Stimulus comments_controller');

    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const cableUrl = `${protocol}${window.location.hostname}:${window.location.port}/cable`;

    this.cable = ActionCable.createConsumer(cableUrl);

    this.cable.subscriptions.create('CommentsChannel', {
      connected: () => {
        console.log('connected to comments channel using Stimulus controller');
      },
      disconnected: () => {
        console.log('disconnected from comments channel via Stimulus');
      },
      received: (comment) => {
        const commentList = document.getElementById('comment_list');
        const htmlComment = `<div><h2>${comment.author}</h2><span>${comment.text}</span></div>`;
        commentList.insertAdjacentHTML('afterbegin', htmlComment);
      },
    });
  }
}
