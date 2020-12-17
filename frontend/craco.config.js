const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#995829',
                            '@primary-color-light': '#c2906d',
                            '@normal-color': '#e4e9f0',
                            '@background-color-light': '#f2f4f8',
                            '@background-color-base': '#f2f4f8',
                            '@border-color-base': '#e4e9f0',
                            '@input-border-color': '#696a6b',
                            '@input-hover-border-color': '@primary-color',
                            '@input-placeholder-color': 'hsv(0, 0, 85%)',
                            '@input-color': '#161537',
                            '@shadow-color': 'rgba(0, 0, 0, 0.15)',
                            '@box-shadow-base': '0 10px 35px -5px rgba(0, 0, 0, 0.15)',
                            '@shadow-1-up': '0 -10px 35px -5px rgba(0, 0, 0, 0.15)',
                            '@shadow-1-down': '0 10px 35px -5px rgba(0, 0, 0, 0.15)',
                            '@shadow-1-left': '-10px 10px 35px -5px rgba(0, 0, 0, 0.15)',
                            '@shadow-1-right': '10px 0 35px -5px rgba(0, 0, 0, 0.15)',
                            '@shadow-2': '0 0px 35px -5px rgba(0, 0, 0, 0.15)',
                            '@item-hover-bg': '@normal-color',

                            '@link-color': '#529a7b',
                            '@link-hover-color': "c27b48(~`colorPalette('@{link-color}', 5) `)",
                            '@link-active-color': "color(~`colorPalette('@{link-color}', 7) `)",
                            '@progress-steps-item-bg': '#1E9450',
                            '@progress-default-color': '#1E9450',
                            '@progress-remaining-color': '#E5E5E5',

                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
