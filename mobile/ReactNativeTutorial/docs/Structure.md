## Folders structure

When deciding on how to structure different components of the app the tradeoff is usually
localizing code to reduce complexity vs putting the code into global scope for easy reuse.
To localize code we use `bundles`, other code is located in the `app` folder. Each
bundle corresponds to a certain user flow. E.g. a good example of a bundle is a signup flow -
a set of interconnected similar screens.

### Components and containers

Components and containers naturally go into `bundles`. If we want to reuse
some components in other bundles we put them into a single global bundle called `common`.

### Thunks

Thunks are closely related to the UI, so it's natural to put them into `bundles`.

### Reducers

Since Redux state is a singleton global object it makes sense to put reducers under the `app`
folder.

### Selectors

Selectors are itermediaries between Redux and UI, so might go into `app` folder as well as
`bundles` folder. But since it's quite common for selectors to reuse each other, a better
choice might be putting them altogether under the `app` folder.

### Styles

The styles that are related to components are located right next to them. However,
global style parameters like colors and sizes sit in the `app` folder.

