import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';

import AppWithRedux from "./AppWithRedux";
import { store } from './redusers/store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
const container = document.getElementById('root');
const root = createRoot(container!); // Используйте восклицательный знак для того, чтобы TypeScript понимал, что контейнер не является null

root.render(
    <Provider store={store}>
        <AppWithRedux />
    </Provider>
);

// ReactDOM.render(
//     <Provider store={store}>
//         <AppWithRedux/>
//     </Provider>, document.getElementById('root')
// )



// const container  = document.getElementById('root') as HTMLElement
// const root = createRoot(container);
// root.render(<AppWithRedux />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

