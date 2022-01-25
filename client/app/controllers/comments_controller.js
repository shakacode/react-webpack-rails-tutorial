import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  static targets = ['refresh'];

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
        console.log('comment received via Stimulus', comment);

        this.refreshTarget.click();
      },
    });
  }
}
