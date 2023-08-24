# MMM-StatusPageIo

A [MagicMirror²](https://magicmirror.builders) helper module to display incident and component status from a [StatusPage.io](https://statuspage.io) page.

[![Platform](https://img.shields.io/badge/platform-MagicMirror-informational)](https://MagicMirror.builders)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/spyder007/MMM-StatusPageIo/master/LICENSE)
![Test Status](https://github.com/spyder007/MMM-StatusPageIo/actions/workflows/node.js.yml/badge.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/spyder007/MMM-StatusPageIo/badge.svg)](https://snyk.io/test/github/spyder007/MMM-StatusPageIo)

![Example Scheduling](.github/example-screenshot.png)

## Installation

In your terminal, go to your MagicMirror's Module folder:

```
cd ~/MagicMirror/modules
```

Clone this repository:

```
git clone https://github.com/spyder007/MMM-StatusPageIo.git
```

Go to the modules folder:

```
cd MMM-StatusPageIo
```

Install the dependencies and transpile the Typescript

```
npm install
```

Add the module to the modules array in the `config/config.js` file:

```javascript
    {
        module: 'MMM-StatusPageIo'
    },
```

## Config Options

| **Option**           | **Default**     | **Description**                                                               |
| -------------------- | --------------- | ----------------------------------------------------------------------------- |
| `pageId`             | ''              | The Page ID of the StatusPage.io page to monitor.                             |
| `animationSpeed`     | 3000            | **Optional** The speed of the show and hide animations in milliseconds        |
| `useHeader`          | `true`          | **Optional** Whether or not to show the header                                |
| `maxWidth`           | `300px`         | **Optional** The maximum width for this module                                |
| `initialLoadDelay`   | `3250`          | **Optional** How long to wait, in milliseconds, before the first status check |
| `updateInterval`     | `2 * 60 * 1000` | **Optional** How often to check the status (defaults to 2 minutes)            |
| `showComponents`     | `true`          | **Optional** Output component status when set to `true`                       |
| `componentsToIgnore` | []              | **Optional** String array of components to ignore in display                  |

## Config Examples

### Minimal Configuration

```javascript
    {
		module: "MMM-StatusPageIo",
		position: "bottom_right",
		config: {
			pageId: "abcdefgh"
		}
	},
```

## Updating

To update the module to the latest version, use your terminal to go to your MMM-StatusPageIo module folder and type the following command:

```bash
git pull
npm install
```

If you haven't changed the modules, this should work without any problems.
Type `git status` to see your changes, if there are any, you can reset them with `git reset --hard`. After that, git pull should be possible.

## Contributing

Please read the [Contribution Guide](CONTRIBUTING.md) for details on contributing to the project.
