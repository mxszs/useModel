import { useEffect, useContext, useRef, useState } from 'react';
import Provider from './utils/Provider';
import Context from './utils/Context';

type ReturnTypes<T extends any> = T extends (...args: any) => infer R ? R : any;

type Model<T extends keyof U, U> = {
    [key in keyof U]: ReturnTypes<U[T]>;
};

type UseModelFn = <T extends keyof U, U>(namespace: T) => Model<T, U>[T];

const useModel: UseModelFn = (namespace) => {
  const dispatcher = useContext<any>(Context);
  // 判断组件是否挂载
  const isMount = useRef(false);
  const [state, setState] = useState(dispatcher.data[namespace]);

  useEffect(() => {
    isMount.current = true;
    return () => {
      isMount.current = false;
    };
  }, []);

  useEffect(() => {
    const handler = (value: any) => {
      if (!isMount.current) {
        // 如果函数执行中，组件被卸载，则强制更新全局 data
        setTimeout(() => {
          dispatcher.data[namespace] = value;
          dispatcher.update(namespace);
        });
      } else {
        setState(value);
      }
    };
    try {
      dispatcher.callBacks[namespace].add(handler);
      dispatcher.update(namespace);
    } catch (e) {
      dispatcher.callBacks[namespace] = new Set();
      dispatcher.callBacks[namespace].add(handler);
      dispatcher.update(namespace);
    }
    return () => {
      dispatcher.callBacks[namespace].delete(handler);
    };
  }, [namespace]);

  return state;
};
export { useModel, Provider, Context, Model };
