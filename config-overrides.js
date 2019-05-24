module.exports = {
  webpack (config, env) {
    return config
  },

  jest (config) {
    return config
  },

  devServer (configFunction) {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "Content-Type"
      }
      return config;
    }
  }
}