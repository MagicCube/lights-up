import * as React from 'react';
import { render } from 'react-dom';

import { App } from './components/App';

// TODO: Use partial import.
import 'antd/dist/antd.less';
import './index.less';

render(<App />, document.getElementById('react-mount-point'));
