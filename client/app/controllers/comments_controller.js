import { Controller } from '@hotwired/stimulus';
import * as marked from 'marked';

export default class extends Controller {
  static targets = ['commentList', 'commentAuthor', 'commentText', 'commentRefresh', 'alertDiv', 'errorList'];

  resetText() {
    const inputAuthor = this.commentAuthorTarget;
    const inputText = this.commentTextTarget;
    const alertDiv = this.alertDivTarget;
    const errorList = this.errorListTarget;

    const errors = [];

    if (!inputAuthor.value || !inputText.value) {
      errorList.innerHTML = '';
      if (!inputAuthor.value) {
        errors.push('Author');
      } else if (!inputText.value) {
        errors.push('Text');
      } else {
        errors.push('Author');
        errors.push('Text');
      }
      errors.forEach((error) => {
        const errorString = `<li>${error}: can't be blank</li>`;
        errorList.insertAdjacentHTML('afterbegin', errorString);
      });
      alertDiv.classList.remove('hidden');
    } else {
      alertDiv.classList.add('hidden');
      errorList.innerHTML = '';
      inputText.value = '';
    }
  }

  refreshCommentList() {
    const refreshBtn = this.commentRefreshTarget;
    refreshBtn.click();
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
