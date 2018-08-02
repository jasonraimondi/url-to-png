export VERSION=latest
export REPO=jasonraimondi/url-to-png
export TAG=${REPO}:${VERSION}

publish: package build push

package:
	rm -f app.tgz
	tar -cz -f app.tgz -C . src package.json package-lock.json tsconfig.json tslint.json

build:
	docker build -t ${TAG} -t ${REPO} .

push:
	docker push ${TAG}
	docker push ${REPO}
