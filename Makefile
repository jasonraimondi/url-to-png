export REPO=jasonraimondi/url-to-png:0.11.0

build:
	docker build -t ${REPO} .

push:
	docker push ${REPO}
