const withMDX = require('@next/mdx')({ extension: /\.mdx?$/ })
module.exports = withMDX({
  pageExtensions: ['js', 'mdx'],
  experimental: {
    jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
    
    optimizeFonts: true,
  },
})
