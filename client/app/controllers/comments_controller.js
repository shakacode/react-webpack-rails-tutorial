import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
  connect() {
    console.log("comments_controller.js: connect()")

    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const cableUrl = `${protocol}${window.location.hostname}:${window.location.port}/cable`;

    this.cable = ActionCable.createConsumer(cableUrl);

    this.cable.subscriptions.create('CommentsChannel', {
      connected: () => {
        console.log('connected using Stimulus');
      },
      disconnected: () => {
        console.log('disconnected using Stimulus');
      },
      received: (comment) => {
        console.log('Comment received via Stimulus', comment);
      },
    });
  };
};
