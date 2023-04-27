# wrappu.js

a library that helps you to create a cli wrapper for node.js with ease

## Why ?

Nowadays, some utility software programs are `cli based`. but peoples want to use them in a node.js app so, they build a
node.js wrapper for it and others build a node.js wrapper for their needs, and all of that **FROM_SCRATCH**. So I've
decided
to create this library which allow you to build a node.js with a `flexible API`

## Installation

```shell
$ npm install --save @yumii.saiko/wrappu
```

## Usage (1.3.5, the one with the latest changes is in progress...)

### CMD

`create>`

well, you may want to create a set of commands for your `CliWrapper`. To create a command you can use
the static method `create(...)` of the cmd class.

```typescript
import { Cmd } from "@yumii.saiko/wrappu";

const version = Cmd.create("version");
const init = Cmd.create("init");
```

`arguments>`

You did it, ... right? , ahem not really. What if your `cmd` have arguments ?
like `git init` has `template` arg

```typescript
const init = Cmd.create("init");

// add `template` arg
init.arg("template");
```

there are some variant of _argument_: `flag`, `with value`, `alias> as flag and with value`.
How do i compose them ?

While creating an argument, there are two options I need to consider:

- type
- asAlias ?

```typescript
import { Cmd } from "@yumii.saiko/wrappu";
import { ArgType } from '@yumii.saiko/wrappu/constant/arg'

const init = Cmd.create("init");

// template that has a value
init.arg("template", { type: ArgType.STR }); // by default, arg is a variant with value

// a flag is an arg that has no value, _ArgType.BOOL_ to specify it is a flag
init.arg("quiet", { type: ArgType.BOOL });

// asAlias mean, an arg that is only one letter and prefixed by single `-`
init.arg("q", { type: ArgType.BOOL, asAlias: true });
```

Yeah, they are beautiful but isn't there any (fecking) way to register many args in one function ? uh
No... but you can use chaining hehe :)

```typescript
const init = Cmd.create("init")
  .arg("template")
  .arg("quiet", { type: ArgType.BOOL })
  .arg("q", { type: ArgType.BOOL, asAlias: true });
```

Note that you can't register the same _arg_ more than one time.

### CLI

`wrapper>`

You can create a wrapper by using the static method `wrap(...)` of the Cli class:

```typescript
import { CLI } from "@yumii.saiko/wrappu";

// 'git' being the cli to wrap
const git = Cli.wrap("git");

// OR

const git = Cli.wrap("C:\\Program Files\\Git\\cmd\\git.exe");
```

Note that it is better to pass the absolute path from the cli to the `wrap` function rather than its name. Indeed,
passing the name of the cli, the wrap function will need to find/ensure that it exists, and it could
be a little slow.

> `@important>` write the cli name uniquely for now

`register command>`

you did it, ... right? :) .Now you can inject your `cmd` to your wrapper by calling its `cmd()` function:

```typescript
const git = Cli.wrap("git");
git.cmd(version);
git.cmd(init);

// OR..., you can also use chaining here :D
const git = Cli.wrap("git").cmd(version).cmd(init);
```

Note that you can't register the same _cmd_ more than one time.

`lazy running>`

How do I run the registered `cmd` ? Simply, by using the wrapper's `setup()` function as follows:

```typescript
// register some `cmd-s`
const git = Cli.wrap("git").cmd(version).cmd(init);

git.setup("version").run();
git.setup("init").run();

/*
  OR. get the cmd name from the created `Cmd` instead
*/

git.setup(version.name).run();
git.setup(init.name).run();
```

Why do I have to call `setup(...)` before `run()` ...hhhh, why ?

`>` _setup(...)_ function actually builds the _cmd_ and then return a **Runnable**, which contains the `raw cmd` that you can then _run()_

Note that, apart from running, the `Runnable` also allows you to check the actual built command line as follows:

```typescript
// register some `cmd-s` with their specs
const git = Cli.wrap("git").cmd(version).cmd(init);

const versionCmd = git.setup(version.name);
const initCmd = git.setup(init.name, { "initial-branch": "main" });

// check built command line
versionCmd.raw(); // <git path> version
initCmd.raw(); // <git path> init --initial-branch main

// if you decide to run them now.
versionCmd.run();
initCmd.run();
```

`prepared cmd>`

another way to run `cmd-s`. just like in some Db drivers such as: _JDBC, PDO_ , there is a statement that we qualify as `Prepared`
, they are way faster because some hard process could be done ahead of time.
`wrappu.js` allows you to write a prepared `cmd`, mainly for cmd re-usability purpose. For instance, you may want to have a cmd template
and run it with different value every time.

Here is a way how you can achieve that:

```typescript
/* {...imports...} */
// register some `cmd-s` with their specs
const init = Cmd.create("init").arg("template").arg("initial-branch");

const git = Cli.wrap("git").cmd(init);

// i want to call init with different branch arg only every time
const preparedInit = git.prepare(init.name, "initial-branch");

// call it later...
preparedInit.run({ "initial-branch": "master" });
preparedInit.run({ "initial-branch": "main" });
preparedInit.run({ "initial-branch": "dev" });
```

It is as simple as that:)
