const colors = require('tailwindcss/colors');

module.exports = {
    darkMode: 'class',
    purge: {
        content: [
        '.public/index.html',
        './src/**/**/**/**/**/**/*.{jsx,js}'
        ],
        options: {
            safelist: [
                /^bg-/,
                /^text-/,
                /^hover:/,
                'bg-yellow-600',
                'bg-green-600',
                'bg-blue-600',
                'bg-gray-600',
                'bg-purple-600',
                'bg-red-600'
            ],
        }
    },
    theme: {
        extend: {
            animation: {
                bounce2: 'bounce 1s infinite 200ms ',
            },
            colors: {
                coolGray: colors.coolGray,
                lightBlue: colors.lightBlue,
                'accent':'var(--bg-preset-accent)',
            },
            transitionProperty: {
                'width': 'width',
                'height': 'height'
            },
        },
        cursor: {
            auto: 'auto',
            default: 'default',
            pointer: 'pointer',
            wait: 'wait',
            text: 'text',
            move: 'move',
            'not-allowed': 'not-allowed',
            crosshair: 'crosshair',
            'zoom-in': 'zoom-in',
            grabbing: 'grabbing',
            grab: 'grab'
        },
        maxHeight: {
            '0': '0',
            '1/4': '25%',
            '1/3': '33%',
            '2/5': '40%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        },
        maxWidth: {
            '96': '24rem',
        },
        minWidth: {
            '0': '0',
            '48': '12rem',
            '56': '14rem',
            '100': '27rem',
            '1/5': '20%',
            '1/4': '25%',
            '1/3': '33%',
            '2/5': '40%',
            '1/2': '50%',
            '3/4': '75%',
            'full': '100%',
        }
    },
    variants: {
        rotate: ['dark', 'active', 'group-hover'],
        display: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
        width: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
        height: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
        transitionDuration: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
        transitionProperty: ['dark', 'responsive', 'hover', 'focus', 'group-hover'],
        textAlign: ['dark', 'responsive', 'hover', 'focus'],
        borderWidth: ['dark', 'responsive', 'hover', 'focus'],
        cursor: ['dark', 'responsive', 'hover', 'focus', 'active'],
        fill: ['dark', 'responsive', 'hover', 'focus', 'active'],
        backgroundColor: ['dark', 'responsive', 'hover', 'focus', 'active', 'group-hover'],
        animation: ['dark', 'hover', 'focus'],
        border: ['dark', 'hover', 'active', 'focus', 'group-focus', 'focus-within'],
        zIndex: ['dark', 'hover', 'active', 'focus', 'group-focus', 'focus-within'],
        borderColor: ['dark', 'hover', 'active', 'focus', 'group-focus', 'focus-within'],
        shadow: ['dark', 'hover', 'active', 'focus', 'group-focus', 'focus-within'],
    }
};
