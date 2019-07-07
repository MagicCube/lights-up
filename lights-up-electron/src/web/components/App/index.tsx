import * as React from 'react';
import Switch from 'antd/es/switch';

import * as styles from './index.less';

export const App: React.SFC = () => {
  return (
    <div>
      <main>
        <header className={styles.header}>
          <div className={styles.left}>
            <h1>MagicCube Lights-up</h1>
          </div>
          <div className={styles.right}>
            <Switch defaultChecked />
          </div>
        </header>
        <section />
        <section />
      </main>
    </div>
  );
};
