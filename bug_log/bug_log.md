# Bug Log
## Authentication
* When building your store, remember that configureStore must be in this order: configureStore( RootReducer, preloadedState, RootMiddleware)
* When you impor 'merge' from 'lodash/merge' make sure you import it as 'import merge' vs 'import {merge}'
* When rendering initially, props does not exist: e.g. residency_index.jsx (this.props.residencies does not exist on the initial render, it only exists after the 2nd re-render) and google_map.jsx (this.props.residencies will also not exist on the initial render i.e. the constructor, but only after the 2nd render )
