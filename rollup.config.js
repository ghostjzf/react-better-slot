import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import clear from "rollup-plugin-clear";

export default {
    moduleName: "ReactIndexList",
    input: "src/index.tsx",
    external: ["react", "@types/react"],
    globals: {},
    output: [
        {
            name: "ReactComponent",
            format: "es",
            file: "es/index.js",
            globals: {
                react: "React"
            }
        },
        {
            name: "ReactComponent",
            format: "umd",
            file: "lib/index.js",
            globals: {
                react: "React"
            }
        }
    ],
    plugins: [
        clear({
            targets: ["lib", "es"]
        }),
        resolve(),
        typescript(),
        babel({
            exclude: "**/node_modules/**",
            runtimeHelpers: true
        }),
        commonjs(),
        postcss({
            extract: true,
            extensions: [".css", ".scss", ".less", ".styl", ".pcss"]
        })
    ]
};
