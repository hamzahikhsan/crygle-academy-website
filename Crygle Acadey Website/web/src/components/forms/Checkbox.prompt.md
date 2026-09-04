Checkbox used for "Ingatkan Saya" on Login and the terms row on Checkout.

```jsx
<Checkbox label="Ingatkan Saya" checked={remember} onChange={e => setRemember(e.target.checked)} />
```

Label sits 10px to the right of the box. Disabled drops the whole control to 50% opacity.
