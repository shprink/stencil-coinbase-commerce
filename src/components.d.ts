/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { MessageData } from "./types";
export namespace Components {
    interface CcButton {
        "buttonClass": string;
        "chargeId": string;
        "checkoutId": string;
        "customMetadata": string;
        "disableCaching": boolean;
    }
    interface CcIframe {
        "chargeId": string;
        "checkoutId": string;
        "customMetadata": string;
        "disableCaching": boolean;
    }
}
declare global {
    interface HTMLCcButtonElement extends Components.CcButton, HTMLStencilElement {
    }
    var HTMLCcButtonElement: {
        prototype: HTMLCcButtonElement;
        new (): HTMLCcButtonElement;
    };
    interface HTMLCcIframeElement extends Components.CcIframe, HTMLStencilElement {
    }
    var HTMLCcIframeElement: {
        prototype: HTMLCcIframeElement;
        new (): HTMLCcIframeElement;
    };
    interface HTMLElementTagNameMap {
        "cc-button": HTMLCcButtonElement;
        "cc-iframe": HTMLCcIframeElement;
    }
}
declare namespace LocalJSX {
    interface CcButton {
        "buttonClass"?: string;
        "chargeId"?: string;
        "checkoutId"?: string;
        "customMetadata"?: string;
        "disableCaching"?: boolean;
        "onChargeFailure"?: (event: CustomEvent<MessageData>) => void;
        "onChargeSuccess"?: (event: CustomEvent<MessageData>) => void;
        "onLoaded"?: (event: CustomEvent<void>) => void;
        "onModalClosed"?: (event: CustomEvent<void>) => void;
        "onPaymentDetected"?: (event: CustomEvent<MessageData>) => void;
    }
    interface CcIframe {
        "chargeId"?: string;
        "checkoutId"?: string;
        "customMetadata"?: string;
        "disableCaching"?: boolean;
        "onChargeFailure"?: (event: CustomEvent<MessageData>) => void;
        "onChargeSuccess"?: (event: CustomEvent<MessageData>) => void;
        "onErrorChange"?: (event: CustomEvent<MessageData>) => void;
        "onIframeClosed"?: (event: CustomEvent<void>) => void;
        "onIframeError"?: (event: CustomEvent<void>) => void;
        "onIframeLoaded"?: (event: CustomEvent<void>) => void;
        "onPaymentDetected"?: (event: CustomEvent<MessageData>) => void;
        "onRendered"?: (event: CustomEvent<void>) => void;
    }
    interface IntrinsicElements {
        "cc-button": CcButton;
        "cc-iframe": CcIframe;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cc-button": LocalJSX.CcButton & JSXBase.HTMLAttributes<HTMLCcButtonElement>;
            "cc-iframe": LocalJSX.CcIframe & JSXBase.HTMLAttributes<HTMLCcIframeElement>;
        }
    }
}
