import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { MessageData } from '../../types';

declare var version: any;

@Component({
  tag: 'cc-button',
  styleUrl: 'cc-button.css',
  shadow: false,
})
export class CcButton {
  @Prop({
    reflect: true
  }) checkoutId: string;
  @Prop({
    reflect: true
  }) chargeId: string;
  @Prop() customMetadata: string;
  @Event() loaded: EventEmitter<void>;
  @Event() chargeSuccess: EventEmitter<MessageData>;
  @Event() chargeFailure: EventEmitter<MessageData>;
  @Event() paymentDetected: EventEmitter<MessageData>;
  @Event() modalClosed: EventEmitter<void>;
  @Prop() disableCaching: boolean;
  @Prop() buttonClass: string = 'coinbase-commerce-button';

  @State() showModal = false;

  componentDidLoad() {
    console.log(this)
  }

  handleButtonClick = () => {
    this.showModal = true;
  };

  handleModalClose = () => {
    this.showModal = false;
    this.modalClosed.emit();
  };

  /*
   * If we experience an unexpected error,
   * log it as an error to the console and close the modal.
   */
  handleError = (e: CustomEvent<MessageData>) => {
    console.error(e.detail);
    this.showModal = false;
  };

  render() {
    console.log({ version: '[VI]{version}[/VI]' })
    return (
      <Host>
        <button class={this.buttonClass}>
          <slot>Buy With Crypto</slot>
        </button>
        {this.showModal && (
          <cc-iframe
            onIframeLoaded={() => this.loaded.emit()}
            onIframeClosed={this.handleModalClose}
            onChargeSuccess={(e) => this.chargeSuccess.emit(e.detail)}
            onChargeFailure={(e) => this.chargeFailure.emit(e.detail)}
            onPaymentDetected={(e) => this.paymentDetected.emit(e.detail)}
            checkoutId={this.checkoutId}
            chargeId={this.chargeId}
            disableCaching={this.disableCaching}
            onErrorChange={this.handleError}
            customMetadata={this.customMetadata} />
        )}
      </Host>
    );
  }

}
