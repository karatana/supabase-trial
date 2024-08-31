/** @type {import('next').NextConfig} */
function getCodespaceUrl(codespaceName, port = 3000) {
  const codeSpacePrefix = codespaceName.split('.')[0]
  return `${codeSpacePrefix}-${port}.app.github.dev`
}

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
}

if (process.env.CODESPACE_NAME) {
  nextConfig.experimental.serverActions.allowedOrigins.push(
    getCodespaceUrl(process.env.CODESPACE_NAME)
  )
}
if (process.env.VERCEL_URL) {
  nextConfig.experimental.serverActions.allowedOrigins.push(
    process.env.VERCEL_URL
  )
}

module.exports = nextConfig
