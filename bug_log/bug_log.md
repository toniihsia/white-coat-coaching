# Bug Log
## Authentication
* When building your store, remember that configureStore must be in this order: configureStore( RootReducer, preloadedState, RootMiddleware)
* When you impor 'merge' from 'lodash/merge' make sure you import it as 'import merge' vs 'import {merge}'
