import * as React from 'react';
import { render } from 'react-dom';

import { App } from './components/App';

import './index.less';

render(<App />, document.getElementById('react-mount-point'));
