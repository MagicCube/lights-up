import * as React from 'react';

import * as styles from './index.less';

interface AppHeaderProps {
  children?: JSX.Element | JSX.Element[];
}

export const AppHeader: React.SFC<AppHeaderProps> = (props: AppHeaderProps) => {
  const { children } = props;
  return (
    <header className={styles.container}>
      <div className={styles.left}>
        <h1>MagicCube Lights-up</h1>
      </div>
      <div className={styles.right}>{children}</div>
    </header>
  );
};
