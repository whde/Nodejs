module.exports = {
  // pubilcPath: './',
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/admin": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true
      }
    }
  },
};
