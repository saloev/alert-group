i:
	npm install

dev:
	npm run dev

build:
	npm run build

rebuild:
	rm -rf build && npm run build

lint:
	npm run lint

lint--fix:
	npm run lint:fix