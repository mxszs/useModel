import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from "rollup-plugin-babel";
import tslint from "rollup-plugin-tslint";
import typescript from 'rollup-plugin-typescript2';
import packageJSON from './package.json'
export default {
  input: 'src/index.tsx',
  output: [{
    file: packageJSON.main,
    format: 'cjs'
  },{
    file: packageJSON.module,
    format: 'es'
  }, {
    file: packageJSON.umd,
    format: 'umd',
    name: 'useModel'   
  }],
  plugins: [
    resolve(),  // 这样 Rollup 能找到 `ms`
    commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
    tslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['node_modules/**', '*.js']
    }),
    babel(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext'
        }
      }
    }),
],
external: ['react', 'react-dom'],
};