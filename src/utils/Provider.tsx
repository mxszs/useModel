import React from 'react';

import Dispatcher from './dispatcher';
import Executor from './Executor';
import Context from './Context';

const dispatcher = new Dispatcher!();

const Provider: React.FC<{
  models: any
}> = ({ children, models = {} }) => {
  const Exe = Executor!;
  return (
    <Context.Provider value={dispatcher}>
      {Object.keys(models).map(item => (
        <Exe
          key={item}
          namespace={item}
          hook={models[item as keyof typeof models]}
          onUpdate={value => {
            dispatcher.data[item] = value;
            dispatcher.update(item);
          }}
        />
      ))}
      {children}
    </Context.Provider>
  );
};

export default Provider;
