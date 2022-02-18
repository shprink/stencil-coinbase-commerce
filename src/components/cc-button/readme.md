# cc-button



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type      | Default                      |
| ---------------- | ----------------- | ----------- | --------- | ---------------------------- |
| `buttonClass`    | `button-class`    |             | `string`  | `'coinbase-commerce-button'` |
| `chargeId`       | `charge-id`       |             | `string`  | `undefined`                  |
| `checkoutId`     | `checkout-id`     |             | `string`  | `undefined`                  |
| `customMetadata` | `custom-metadata` |             | `string`  | `undefined`                  |
| `disableCaching` | `disable-caching` |             | `boolean` | `undefined`                  |


## Events

| Event             | Description | Type                                                                                                                                                                                                                                        |
| ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chargeFailure`   |             | `CustomEvent<{ event: "charge:created" \| "charge:failed" \| "checkout_modal_closed" \| "error_not_found" \| "payment_detected" \| "charge_failed" \| "charge_confirmed" \| "checkout_modal_loaded"; charge: Charge; buttonId?: string; }>` |
| `chargeSuccess`   |             | `CustomEvent<{ event: "charge:created" \| "charge:failed" \| "checkout_modal_closed" \| "error_not_found" \| "payment_detected" \| "charge_failed" \| "charge_confirmed" \| "checkout_modal_loaded"; charge: Charge; buttonId?: string; }>` |
| `loaded`          |             | `CustomEvent<void>`                                                                                                                                                                                                                         |
| `modalClosed`     |             | `CustomEvent<void>`                                                                                                                                                                                                                         |
| `paymentDetected` |             | `CustomEvent<{ event: "charge:created" \| "charge:failed" \| "checkout_modal_closed" \| "error_not_found" \| "payment_detected" \| "charge_failed" \| "charge_confirmed" \| "checkout_modal_loaded"; charge: Charge; buttonId?: string; }>` |


## Dependencies

### Depends on

- [cc-iframe](../cc-iframe)

### Graph
```mermaid
graph TD;
  cc-button --> cc-iframe
  style cc-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
