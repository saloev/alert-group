i:
	npm install

dev:
	npm run dev

build:
	npm run build

rebuild:
	rm -rf build && npm run build

publish: 
	npm run build && git add build && git commit -m "Initial build subtree commit" && git subtree push --prefix build origin gh-pages

publish-force:
	git push origin `git subtree split --prefix build master`:gh-pages --force

lint:
	npm run lint

lint--fix:
	npm run lint:fix