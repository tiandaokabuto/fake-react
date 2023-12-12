import { resolvePkgPath, getPackageJson, getBaseRollupPlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

// 获取包名
const { name, module } = getPackageJson('react');
// 包的路径
const pkgPath = resolvePkgPath(name);
// 产物路径
const distPath = resolvePkgPath(name, true);

export default [
    // react
    {
        input: `${pkgPath}/${module}`,
        output: {
            file: `${distPath}/index.js`,
            name: 'index.js',
            format: 'umd',
        },
        plugins: [
            ...getBaseRollupPlugins(),
            generatePackageJson({
                inputFolder: pkgPath,
                outputFolder: distPath,
                baseContents: ({ name, description, version }) => ({
                    name,
                    description,
                    version,
                    main: 'index.js',
                }),
            }),
        ],
    },
    // jsx-runtime
    {
        input: `${pkgPath}/src/jsx.ts`,
        output: [
            // jsx-runtime
            {
                file: `${distPath}/jsx-runtime.js`,
                name: 'jsx-runtime.js',
                format: 'umd',
            },
            // jsx-dev-runtime
            {
                file: `${distPath}/jsx-dev-runtime.js`,
                name: 'jsx-runtime.js',
                format: 'umd',
            },
        ],
        plugins: [getBaseRollupPlugins({})],
    },
];
