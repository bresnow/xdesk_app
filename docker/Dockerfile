ARG ALPINE_VERSION=3.16

FROM alpine:${ALPINE_VERSION} as base

COPY ./docker/bin/* /usr/bin/
# add supervisor commands along/ specific to each build layer
COPY  ./docker/supervisor/unified.conf /etc/supervisord.conf

RUN  \
    echo "https://dl-cdn.alpinelinux.org/alpine/v3.16/main" > /etc/apk/repositories; \
    echo "https://dl-cdn.alpinelinux.org/alpine/v3.16/community" >> /etc/apk/repositories; \
    chmod +x -R /usr/bin/;

FROM base as gtk-dependencies
WORKDIR /tmp
ENV HOME=/home \
    GDK_BACKEND=broadway \  
    BROADWAY_DISPLAY=:5 \
    XDG_RUNTIME_DIR=/home
RUN addpkg  \
    bash \
    cairo \
    clutter-gst \
    clutter-gtk \
    g++ \
    gcompat \
    git \
    gjs \
    glib \
    gnome \
    gobject-introspection \
    graphene \
    gst-plugins-good-gtk \
    gstreamer \
    gtk4.0 \
    libadwaita \
    libgcc \
    libsoup \
    libstdc++ \
    pango \
    make \
    mc \
    mesa \
    meson \
    ninja \
    python3 \
    py3-opengl \
    py3-pip \
    rsync \
    supervisor \
    tar \
    webkit2gtk-5.0 \
    vte3 \
    xorg-server 
RUN \
    addpkg\
    nodejs \
    npm; 
RUN npm i -g yarn nodemon zx turbo;
FROM gtk-dependencies as gtk-dependencies_theme
ENV \
    GTK_THEME=McOS-CTLina-Mint-Dark \
    THEMER_REPO=Mc-OS-themes
RUN \
    git clone https://github.com/paullinuxthemer/$THEMER_REPO.git; \
    mkdir -p /usr/share/themes/; \
    rsync -av --progress "$THEMER_REPO/$GTK_THEME" /usr/share/themes/; \
    rm -rf /tmp/* /tmp/.[!.]* ; \
    delpkg rsync

FROM node as gtkgjsbuilder
COPY .  /builder
RUN yarn global add turbo
WORKDIR /builder
RUN turbo prune --scope=gi_modules --out-dir=out --docker; \
    turbo prune --scope=proxy --out-dir=out --docker; \
    turbo prune --scope=docker --out-dir=out --docker;
WORKDIR /builder/out/full
COPY ./turbo.json ./turbo.json
RUN yarn; yarn build --filter=gi_modules;

FROM node as frontend_dev
COPY .  /amnion
WORKDIR /amnion
RUN yarn
ENV NODE_ENV=development
RUN rm -rf docker gi_modules docs 
CMD [ "yarn", "watch", "--filter=render" , "--filter=server" , "--filter=ui"]

FROM node as frontend
COPY .  /amnion
WORKDIR /amnion
RUN yarn; yarn build --filter=render --filter=ui;
ENV NODE_ENV=production
RUN rm -rf docker gi_modules docs 
CMD [ "yarn", "start", "--filter=render" , "--filter=server" ]

FROM gtk-dependencies_theme as gtkgjsx_dev
WORKDIR /amnion-gjsx
COPY --from=gtkgjsbuilder /builder/out/full/ .
ENV DEBUG=false
CMD [  "yarn", "watch" ]

FROM gtk-dependencies_theme as gtkgjsx
WORKDIR /amnion-gjsx
COPY --from=gtkgjsbuilder /builder/out/full/ .
ENV DEBUG=true
CMD [ "yarn", "start" ]

