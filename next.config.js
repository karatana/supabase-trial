/** @type {import('next').NextConfig} */
function getCodespaceUrl(codespaceName, port = 3000) {
  const codeSpacePrefix = codespaceName.split('.')[0]
  return `${codeSpacePrefix}-${port}.app.github.dev`
}

const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        getCodespaceUrl(process.env.CODESPACE_NAME), 'localhost:3000'
      ],
    },
  },
}

module.exports = nextConfig
