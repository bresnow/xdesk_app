ARG ALPINE_VERSION=3.16

FROM alpine:${ALPINE_VERSION} as base

ADD docker/bin/* /usr/bin/
# add supervisor commands along/ specific to each build layer
ADD docker/supervisor/unified.conf /etc/supervisord.conf
ENV HOME=/home \
    GDK_BACKEND=broadway \  
    BROADWAY_DISPLAY=:5 \
    XDG_RUNTIME_DIR=/home\
    GTK_THEME=McOS-CTLina-Mint-Dark
RUN  \
    echo "https://dl-cdn.alpinelinux.org/alpine/v3.16/main" > /etc/apk/repositories; \
    echo "https://dl-cdn.alpinelinux.org/alpine/v3.16/community" >> /etc/apk/repositories; \
    chmod +x -R /usr/bin/;

FROM base as packages
WORKDIR /tmp
RUN addpkg  \
    bash \
    cmake \
    cairo \
    clutter-gst \
    clutter-gtk \
    curl \
    dconf \
    dbus \
    dbus-x11 \
    fluxbox \
    g++ \
    gcompat \
    git \
    gjs \
    glib \
    gnome \
    gnunet \
    gnunet-gtk \
    gobject-introspection \
    graphene \
    gst-plugins-good-gtk \
    gstreamer \
    gthumb \
    gtk4.0 \
    gtk-vnc \
    gtksourceview \
    libadwaita \
    libcamera-gstreamer \
    libepoxy \
    libgcc \
    libmediainfo \
    libstdc++ \
    libsoup \
    libx11 \
    linux-headers \
    pango \
    make \
    mc \
    mesa \
    mesa-demos \
    meson \
    ninja \
    nodejs \
    npm \
    python3 \
    py3-opengl \
    py3-pip \
    qemu-ui-opengl \
    rsync \
    sudo \
    supervisor \
    tar \
    webkit2gtk-5.0 \
    wget \
    wxgtk \
    udev \
    vim \
    vlc \
    vte3 \
    xorg-server \
    xf86-input-libinput \
    xinit \
    xz
RUN \
    addpkg \
    supervisor \
    desktop-file-utils  \
    gtk4.0-demo \
    gnome-apps-extra; 
RUN \
    git clone https://github.com/paullinuxthemer/Mc-OS-themes.git; \
    mkdir -p /usr/share/themes/; \
    rsync -av --progress "Mc-OS-themes/$GTK_THEME" /usr/share/themes/; \
    rm -rf /tmp/* /tmp/.[!.]* ; \
    delpkg rsync
RUN npm i -g yarn nodemon zx turbo;

FROM packages as development
ADD docker/supervisor/dev/*.conf  /etc/supervisord/
WORKDIR /gjsx
COPY . /gjsx
ENV DEBUG=debug
RUN yarn
CMD ["yarn","supervisord"]

FROM node:alpine3.16 as pruner
ADD . /amnion
WORKDIR /amnion
RUN yarn global add turbo;
#  Prune workspaces
RUN yarn turbo prune --scope=gi_modules --docker;


FROM packages as installer
COPY --from=pruned /gjsx/out/json /_gi
WORKDIR /_gi
RUN yarn
COPY --from=pruned /gjsx/pruned_front/json /_front
WORKDIR /_front
RUN yarn
COPY --from=pruned /gjsx/pruned_docker/json /_docker
WORKDIR /_docker
RUN yarn; 

FROM packages as gtk_builder
COPY --from=pruned /gjsx/out/full /_gi

WORKDIR /_gi
RUN yarn; yarn build;

FROM packages as amnion
ADD docker/supervisor/layered/broadway.conf docker/supervisor/layered/production/proxy.conf  /etc/supervisord/
COPY --from=installer /_gi /gjsx
WORKDIR /gjsx
ADD ./turbo.json ./turbo.json
COPY --from=installer /_docker/docker ./docker
COPY --from=gtk_builder /_gi/gi_modules/_compiled ./gi_modules/_compiled
COPY --from=gtk_builder /_gi/gi_modules/proxy/src ./gi_modules/proxy/src
COPY --from=gtk_builder /_gi/gi_modules/proxy/views ./gi_modules/proxy/views
CMD ["yarn","supervisord"]


FROM packages as frontend