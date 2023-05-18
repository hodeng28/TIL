export const parameters = {
    viewport: {
        viewports: {
            naranggoApp: {
                name: 'galaxy s9+',
                styles: { width: '360px', height: '740px' },
                type: 'mobile',

            }
        }
    }
}

export const decorators = [
    (Story) => (
        <div style={{ maxWidth: '360px', maxHeight: '740px' }}>
            <Story />
        </div>
    ),
];