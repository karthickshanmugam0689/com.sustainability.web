module.exports = {
    rules: {
        // The following rules are necessary to prevent the use the globally available localStorage
        // and sessionStorage APIs
        'no-restricted-syntax': [
            'error',
            {
                selector: "CallExpression[callee.object.name='localStorage']",
                message:
                    'Do not use `localStorage` directly, use either ScopedBrowserStorageProvider, BrowserStorageProvider or the useScopedLocalStorage hook instead',
            },
            {
                selector: "CallExpression[callee.object.name='sessionStorage']",
                message:
                    'Do not use `sessionStorage` directly, use either ScopedBrowserStorageProvider, BrowserStorageProvider or the useScopedSessionStorage hook instead',
            },
        ],
        // The following rules are necessary to prevent the use of localStorage and sessionStorage
        // APIs as methods of any object, including window
        'no-restricted-properties': [
            'error',
            {
                property: 'localStorage',
                message:
                    'Do not use `localStorage` directly, use either ScopedBrowserStorageProvider, BrowserStorageProvider or the useScopedLocalStorage hook instead',
            },
            {
                property: 'sessionStorage',
                message:
                    'Do not use `sessionStorage` directly, use either ScopedBrowserStorageProvider, BrowserStorageProvider or the useScopedSessionStorage hook instead',
            },
            {
                object: 'window',
                property: 'document',
                message: 'Do not use document directly',
            },
        ],
        'no-restricted-globals': [
            'error',
            {
                name: 'window',
                message: 'Do not use window directly',
            },
            {
                name: 'globalThis',
                message: 'Do not use globalThis directly ... you sneaky dev(il)',
            },
            {
                name: 'document',
                message: 'Do not use document directly',
            },
            {
                name: 'location',
                message: 'Do not use location directly',
            },
        ],
    },
    extends: './.eslintrc',
};
