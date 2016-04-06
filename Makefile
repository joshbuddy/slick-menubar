build:
	npm install
	cd node_modules/sodium && HOME=~/.electron-gyp ../.bin/node-gyp rebuild --target=0.37.4 --runtime=electron --arch=x64 --dist-url=https://atom.io/download/atom-shell
	cd node_modules/leveldown && HOME=~/.electron-gyp ../.bin/node-gyp rebuild --target=0.37.4 --runtime=electron --arch=x64 --dist-url=https://atom.io/download/atom-shell
	cd node_modules/blake2 && HOME=~/.electron-gyp ../.bin/node-gyp rebuild --target=0.37.4 --runtime=electron --arch=x64 --dist-url=https://atom.io/download/atom-shell

package: package-osx

package-osx: build
	./node_modules/.bin/electron-packager . Slick --platform=darwin --arch=x64 --version=0.37.4 --overwrite
