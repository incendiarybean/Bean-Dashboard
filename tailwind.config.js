module.exports = {
    future: {
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true
    },
    purge: {
        content: [
        ".public/index.html",
        "./src/components/*.jsx",
        "./src/components/*/*.jsx",
        "./src/components/*/*/*.jsx",
        "./src/components/*/*/*/*.jsx",
        "./src/JS/*.jsx",
        ],
        options: {
        whitelist: [
            "bg-blue-500",
            "bg-red-500",
            "bg-green-500",
            "bg-purple-500",
            "bg-orange-500",
            "bg-blue-400",
            "bg-red-400",
            "bg-green-400",
            "bg-purple-400",
            "bg-teal-400",
            "bg-orange-400",
            "hover:bg-blue-400",
            "hover:bg-red-400",
            "hover:bg-green-400",
            "hover:bg-purple-400",
            "hover:bg-orange-400",
            "border-blue-400",
            "border-red-400",
            "border-green-400",
            "border-purple-400",
            "border-orange-400",
            "text-blue-500",
            "text-red-500",
            "text-green-500",
            "text-purple-500",
            "text-orange-500",
            "text-teal-500",
            "hover:text-blue-100",
            "hover:text-red-100",
            "hover:text-green-100",
            "hover:text-purple-100",
            "hover:text-orange-100",
        ],
        }
    },
    theme: {
        extend: {
        screens: {
            light: { raw: "(prefers-color-scheme: light)" },
            dark: { raw: "(prefers-color-scheme: dark)" }
        },
        transitionProperty: {
            'width': 'width'
            },
        colors: {
            'primary':'var(--bg-preset-primary)',
            'secondary':'var(--bg-preset-secondary)',
            'accent':'var(--bg-preset-accent)',
            'hover': 'var(--bg-preset-hover)',
            'title': 'var(--bg-preset-title)',
            'default': 'var(--bg-preset-text)',
            'paragraph': 'var(--bg-preset-paragraph)',
            'field': 'var(--bg-preset-field)',
            'other': 'var(--bg-preset-other)',
            'hint': 'var(--bg-preset-hint)',
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
        '56': '14rem',
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
        rotate: ['active', 'group-hover'],
        display: ['responsive', 'hover', 'focus', 'group-hover'],
        width: ['responsive', 'hover', 'focus', 'group-hover'],
        transitionDuration: ['responsive', 'hover', 'focus', 'group-hover'],
        transitionProperty: ['responsive', 'hover', 'focus', 'group-hover'],
        textAlign: ['responsive', 'hover', 'focus'],
        borderWidth: ['responsive', 'hover', 'focus'],
        cursor: ['responsive', 'hover', 'focus', 'active'],
        fill: ['responsive', 'hover', 'focus', 'active'],
        backgroundColor: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
        animation: ['hover', 'focus'],
    }
}
