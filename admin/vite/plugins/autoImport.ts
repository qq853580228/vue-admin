import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
    return autoImport({
        imports: [
            'vue',
            'vue-router',
            'pinia'
        ],
        dts: 'src/auto-imports.d.ts', // 设置auto-import.d.ts生成路径 Default ./auto-imports.d.ts
    })
}
