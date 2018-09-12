export REPO=jasonraimondi/url-to-png

build:
	docker build -t ${REPO} .

push:
	docker push ${REPO}
