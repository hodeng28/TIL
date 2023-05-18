//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'resources-cf.naranggo.com',
      't1.daumcdn.net',
      'upload.wikimedia.org',
      'tong.visitkorea.or.kr'
    ]
  },
  async rewrites() {
    console.log('연결할 API 주소 입니다. ::::: ', process.env.API_BASE_URL);

    return [
      {
        source: '/apis/:path*',
        destination: `${process.env.API_BASE_URL}/:path*`
        // destination: `https://api.naranggo.com/:path*`
      }
    ];
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false
  }
};

module.exports = withNx(nextConfig);

/** @type {import('next').NextConfig} */
