# Knex Spec Helper

Helper functions for tests with [knex](https://github.com/tgriesser/knex) and [knextancy](https://github.com/bravi-software/knextancy).

Basically the setup runs a truncate script to clean all tables and returns a configured knex connection. Running with `knextancyEnabled` it will return already a connection by tenant.

## Install

```bash
npm install -D knex-spec-helper
```

## Usage

**Example with [Mocha](https://mochajs.org/)**

```js
import knexConfig from '../your-knex-config';
import knexSpecHelper from 'knex-spec-helper';

beforeEach(async function () {
  this.knex = await knexSpecHelper.setup({
    knexConfig: knexConfig,
    knextancyEnabled: true,
    truncateEnabled: true,
  });
});
```

## License

Licensed under [The MIT License](https://github.com/bravi-software/knextancy-spec-helper/blob/master/LICENSE) Redistributions of files must retain the above copyright notice.
