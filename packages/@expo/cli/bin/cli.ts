#!/usr/bin/env node
import arg from 'arg';
import chalk from 'chalk';

const defaultCmd = 'start';

export type Command = (argv?: string[]) => void;

const commands: { [command: string]: () => Promise<Command> } = {
  // Add a new command here
  start: () => import('../src/start').then((i) => i.expoStart),
  prebuild: () => import('../src/prebuild').then((i) => i.expoPrebuild),
  config: () => import('../src/config').then((i) => i.expoConfig),

  // Auxiliary commands
  install: () => import('../src/install').then((i) => i.expoInstall),

  // Auth
  login: () => import('../src/login').then((i) => i.expoLogin),
  logout: () => import('../src/logout').then((i) => i.expoLogout),
  register: () => import('../src/register').then((i) => i.expoRegister),
  whoami: () => import('../src/whoami').then((i) => i.expoWhoami),
};

const args = arg(
  {
    // Types
    '--version': Boolean,
    '--help': Boolean,

    // Aliases
    '-v': '--version',
    '-h': '--help',
  },
  {
    permissive: true,
  }
);

if (args['--version']) {
  // Version is added in the build script.
  console.log(process.env.__EXPO_VERSION);
  process.exit(0);
}

// Check if we are running `npx expo <subcommand>` or `npx expo`
const isSubcommand = Boolean(commands[args._[0]]);

// Handle `--help` flag
if (!isSubcommand && args['--help']) {
  console.log(chalk`
    {bold Usage}
      {bold $} npx expo <command>

    {bold Available commands}
      ${Object.keys(commands).sort().join(', ')}

    {bold Options}
      --version, -v   Version number
      --help, -h      Displays this message

    For more information run a command with the --help flag
      {bold $} expo start --help
  `);
  process.exit(0);
}

const command = isSubcommand ? args._[0] : defaultCmd;
const commandArgs = isSubcommand ? args._.slice(1) : args._;

// Push the help flag to the subcommand args.
if (args['--help']) {
  commandArgs.push('--help');
}

// Install exit hooks
process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

commands[command]().then((exec) => exec(commandArgs));
