module.exports = {
  apps: [
    {
      name: 'atomic-dex-bot',
      interpreter: 'node',
      interpreter_args: '--experimental-specifier-resolution=node --loader ts-node/esm',
      instances: 1,
      exec_mode: 'fork',
      merge_logs: true,
      cwd: './',
      script: 'start.ts',
    },
  ],
}
