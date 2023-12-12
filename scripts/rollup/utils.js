import path from 'path';
import fs from 'fs';

import cjs from '@rollup/plugin-commonjs';
import ts from 'rollup-plugin-typescript2';

// packages的路径
const pkgPath = path.resolve(__dirname, '../../packages');
// 打包产物的路径，由于产物可能有多个，所以存放在dist的node_modules下
const distPath = path.resolve(__dirname, '../../dist/node_modules');

export const resolvePkgPath = (pkgName, isDist) => {
    return isDist ? `${distPath}/${pkgName}` : `${pkgPath}/${pkgName}`;
};

/**
 * 解析对应包名目录下的package.json
 * @param {string} pkgName 包名
 */
export const getPackageJson = pkgName => {
    const path = `${resolvePkgPath(pkgName)}/package.json`;
    const str = fs.readFileSync(path, 'utf8');
    return JSON.parse(str);
};

export const getBaseRollupPlugins = (typescriptConfig = {}) => {
    return [cjs(), ts(typescriptConfig)];
};
