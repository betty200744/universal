module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'universal',
      script: 'server.js',
      env: {
        PORT_SERVER: 4062,
      },
      'log-format-date': 'YYYY-MM-DD HH:MM Z',
    },
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'root',
      host: ['10.10.231.89'],
      ref: 'origin/master',
      repo: 'git@gitlab.xinpinget.com:fireball/universal.git',
      path: '/data/universal',
      'post-deploy': 'yarn && pm2 startOrReload ecosystem.config.js --env production',
      env: {
        NODE_ENV: 'production',
      },
      exec_mode: 'cluster',
      instances: '4',
    },
    daily: {
      user: 'root',
      host: '10.42.93.96',
      ref: 'origin/develop',
      repo: 'git@gitlab.xinpinget.com:fireball/universal.git',
      path: '/data/universal',
      'post-deploy': 'yarn && pm2 startOrReload ecosystem.config.js --env daily',
      env: { NODE_ENV: 'daily' },
    },
  },
};
