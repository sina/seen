FROM node:20.19.0-bookworm-slim AS node

ARG USER_NAME
ARG GROUP_NAME
ARG USER_ID
ARG GROUP_ID
ARG PROJECT_NAME

RUN mkdir -p "/home/$USER_NAME/.vscode-server" \
    && chown -R $USER_NAME:$GROUP_NAME "/home/$USER_NAME" \
    && mkdir -p "/home/$USER_NAME/$PROJECT_NAME" \
    && chown -R $USER_NAME:$GROUP_NAME "/home/$USER_NAME/$PROJECT_NAME"

# list installed packages: apt list --installed | grep '^[pattern]'
# search for available packages: apt-cache search '^[pattern]'
# show current shell: echo $0
RUN apt-get update \
  && apt-get -y upgrade \
  && apt-get -y install ca-certificates openssh-client curl git net-tools \
  && npm install -g npm@latest pnpm@latest-10

FROM node AS base-server
ENV ENV=/$USER_NAME/.profile
USER $USER_NAME
