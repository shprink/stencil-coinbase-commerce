import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { v4 as uuid } from 'uuid';
import { MessageData } from '../../types';

interface SrcParams {
  origin: string,
  version: string,
  buttonId: string,
  custom?: string,
  cacheDisabled: boolean
}

@Component({
  tag: 'cc-iframe',
  shadow: true,
})
export class CcIframe {
  @Prop({
    reflect: true
  }) checkoutId: string;
  @Prop({
    reflect: true
  }) chargeId: string;
  @Prop() customMetadata: string;
  @Prop() disableCaching: boolean;

  @Event() iframeLoaded: EventEmitter<void>;
  @Event() iframeClosed: EventEmitter<void>;
  @Event() iframeError: EventEmitter<void>;
  @Event() rendered: EventEmitter<void>;
  @Event() chargeSuccess: EventEmitter<MessageData>;
  @Event() chargeFailure: EventEmitter<MessageData>;
  @Event() paymentDetected: EventEmitter<MessageData>;
  @Event() errorChange: EventEmitter<MessageData>;

  @State() loading = true;
  @State() src: string = null;

  origin = 'https://commerce.coinbase.com';
  uuid = uuid();

  connectedCallback() {
    try {
      this.src = this.buildSrc();
      window.addEventListener('message', this.handleMessage);
    } catch (error) {
      console.error(error)
    }
  }

  disconnectedCallback() {
    window.removeEventListener('message', this.handleMessage);
  }

  buildSrc = (): string => {
    const hostName = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/`;

    function encodeURIParams(params) {
      let encoded = [];
      let quote = window.encodeURIComponent;
      for (let key in params) {
        if (params.hasOwnProperty(key)) {
          encoded.push(quote(key) + '=' + quote(params[key]));
        }
      }
      return encoded.join('&');
    }

    let widgetType;
    let id;
    if (this.checkoutId) {
      id = this.checkoutId;
      widgetType = 'checkout';
    } else if (this.chargeId) {
      id = this.chargeId;
      widgetType = 'charges';
    } else {
      throw new Error('must supply either checkoutId or chargeId prop');
    }

    const params: SrcParams = {
      origin: hostName,
      version: '[VI]{version}[/VI]',
      buttonId: this.uuid,
      cacheDisabled: this.disableCaching
    };

    let custom = '';
    if (this.customMetadata && typeof this.customMetadata !== 'string') {
      console.error('Received customMetadata not of "string" type. Ignoring.');
    } else if (this.customMetadata) {
      custom = this.customMetadata
    }

    if (custom) {
      params.custom = custom
    }

    return `${this.origin}/embed/${widgetType}/${encodeURI(id)}?${encodeURIParams(params)}`;
  };

  /*
   * If the message on this window is coming from coinbase commerce, and the ID of message
   * matches the ID we generated in our constructor, we can assume this message is valid and meant
   * for us to action.
   */
  isValidMessage = (msg: { origin: string, data: MessageData }): boolean => {
    return msg.origin === this.origin && msg.data.buttonId === this.uuid;
  };

  /*
   * Handle any window message events here.
   * First, we ensure the message was meant for us.
   * We then match the event type to their callbacks,
   * ignoring any extra messages that may have been sent to us.
   */
  handleMessage = (msg: { origin: string, data: MessageData }) => {
    if (!this.isValidMessage(msg)) {
      return;
    }
    console.log({ msg })


    switch (msg.data.event) {
      case 'charge_confirmed':
        this.chargeSuccess.emit(msg.data);
        break;
      case 'charge_failed':
        this.chargeFailure.emit(msg.data);
        break;
      case 'payment_detected':
        this.paymentDetected.emit(msg.data);
        break;
      case 'error_not_found':
        this.errorChange.emit(msg.data);
        break;
      case 'checkout_modal_loaded':
        this.rendered.emit();
        break;
      case 'checkout_modal_closed':
        this.iframeClosed.emit();
        break;
      default:
        // Do nothing
        break;
    }
  };

  handleIFrameLoaded = () => {
    console.log('handleIFrameLoaded')
    this.loading = false;
    this.iframeLoaded.emit();
  };

  handleIFrameError = (e) => {
    console.log('handleIFrameError', e)
    this.loading = false;
    this.iframeError.emit();
  };

  render() {
    return (
      <Host>
        {(this.loading || this.src === null) && (
          <div part="loader"><slot></slot></div>
        )}
        {this.src !== null && <iframe
          part="iframe"
          loading="lazy"
          onLoad={this.handleIFrameLoaded}
          onError={this.handleIFrameError}
          src={this.src}
          scrolling="no"
          frameBorder="no"
        />}
      </Host>
    );
  }

}
