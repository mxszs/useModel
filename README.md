### 使用方法


```
下载

npm i react-hooks-models -S

使用

import { useModel, Provider, Context } from 'react-hooks-models';

```

```
// 容器代码

import { Provider } from "react-hooks-models";
import models from '@/models';

export default (props) => (
  <Provider models={models}>
    {props.children}
  </Provider>
)

```

```

// modles 文件

import React from 'react';

const useTest = () => {
  const [number] = React.useState(22222);

  return {
    number,
  };
};

const models = {
  test: useTest,
};

export type Models = typeof models;

export default models;

```

```
// 业务代码

import { useModel } from 'react-hooks-models';
import { Models } from '@/models';

export default (props) => {
  const { number } = useModel<'test', Models>('test'); // 对应在models中 test
  return <>
    ...xxxx
  </>
}

```