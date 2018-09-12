export VERSION=0.10.3
export REPO=jasonraimondi/url-to-png
export TAG=${REPO}:${VERSION}

build:
	docker build -t ${TAG} -t ${REPO} .

push:
	docker push ${TAG}
	docker push ${REPO}
