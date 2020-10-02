module.exports = {
  open: true,
  nodeResolve: true,
  appIndex: 'index.html',
  // in a monorepo you need to set set the root dir to resolve modules
  rootDir: 'dist',
  http2: true,
};
