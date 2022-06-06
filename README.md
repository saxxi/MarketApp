# Android Installation

Note: this is a partial installation, unfortunately is not fully working.

```bash
$ cp .env.example .env # And edit the file
$ rm -rf node_modules && yarn
$ echo '{}' > node_modules/resolve/test/resolver/malformed_package_json/package.json
$ sed -i '' 's/compile\ /implementation\ /g' node_modules/react-native-os/android/build.gradle
$ sed -i '' 's/\/EventEmitter/\/\_EventEmitter/g' node_modules/moralis/lib/react-native/EventEmitter.js
$ yarn
# (open your avd emulator)
$ npx react-native run-android
```

## Why all those hacks?

<img src="https://raw.githubusercontent.com/saxxi/MarketApp/master/.github/screenshots/malformed_package_json.png" />
<img src="https://raw.githubusercontent.com/saxxi/MarketApp/master/.github/screenshots/gradle_could_not_find_method_compile.png" />
<img src="https://raw.githubusercontent.com/saxxi/MarketApp/master/.github/screenshots/gradle_could_not_find_method_compile_fix.png" />
<img src="https://raw.githubusercontent.com/saxxi/MarketApp/master/.github/screenshots/fix_event_emitter.png" />
<img src="https://raw.githubusercontent.com/saxxi/MarketApp/master/.github/screenshots/build_successful.png" />
