module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current' // Обработка кода для текущей версии Node.js
                }
            }
        ],
        '@babel/preset-react',
        '@babel/preset-typescript'
    ],
    plugins: [
        // ... другие плагины (если нужны)
    ]
};