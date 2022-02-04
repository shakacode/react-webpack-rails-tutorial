import { Controller } from '@hotwired/stimulus';
import marked from 'marked';

export default class extends Controller {
  static targets = ['commentList', 'commentText']

  resetText() {
    this.commentTextTarget.value = '';
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
        const htmlText = marked.parse(comment.text);
        const htmlComment = `<div><h2>${comment.author}</h2><span>${htmlText}</span></div>`;
        this.commentListTarget.insertAdjacentHTML('afterbegin', htmlComment);
      },
    });
  }
}
