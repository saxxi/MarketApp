# Android Installation

Note: this is a partial installation, unfortunately is not fully working.

```bash
$ rm -rf node_modules && yarn
$ echo '{}' > node_modules/resolve/test/resolver/malformed_package_json/package.json
$ sed -i '' 's/compile\ /implementation\ /g' node_modules/react-native-os/android/build.gradle
$ yarn
# (open your avd emulator)
$ npx react-native run-android
```

Errors still happening:

<img src="https://raw.githubusercontent.com/saxxi/MarketApp/master/.github/screenshots/5.png" />

## Why above hack?

<img src="https://raw.githubusercontent.com/saxxi/MarketApp/master/.github/screenshots/1.png" />
<img src="https://raw.githubusercontent.com/saxxi/MarketApp/master/.github/screenshots/2.png" />
<img src="https://raw.githubusercontent.com/saxxi/MarketApp/master/.github/screenshots/3.png" />
<img src="https://raw.githubusercontent.com/saxxi/MarketApp/master/.github/screenshots/4.png" />
