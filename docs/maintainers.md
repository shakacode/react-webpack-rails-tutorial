# Guidelines for maintainers

## Deployment on Control Plane

The simple yet longer process of building and deploying this project on Control Plane is to use the default files in the `.controlplane` directory.
It is especially easier and more flexible for deployment during project development.

To get a faster Docker image build process,
after each change on the project,
the maintainer should push a new image to the docker hub using the `Dockerfile_base` to update the base image.

```
docker build -f ./Dockerfile_base -t rwrt-base .
docker image tag rwrt-base:latest shakacode/rwrt-base:latest
docker image push shakacode/rwrt-base:latest
```

After successfully building the base image and pushing it to the Dockerhub,
build the project from `Dockerfile_from_base`.
This Dockerfile uses the base image from the Docker hub.
For this, uncomment the line for the custom Dockerfile in the `controlplane.yml` file.
Then run `cpln build-image ...` command.
