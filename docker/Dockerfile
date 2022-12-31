ARG ALPINE_VERSION=3.16

FROM alpine:${ALPINE_VERSION} as base

ADD ./docker/bin/* /usr/bin/
# add supervisor commands along/ specific to each build layer
ADD  ./docker/supervisor/unified.conf /etc/supervisord.conf
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
ADD ./docker/supervisor/dev/* /etc/supervisord/
WORKDIR /gjsx
COPY . /gjsx
ENV DEBUG=debug
RUN yarn
CMD ["yarn","supervisord"]




FROM node as pruner
COPY . /amnion
WORKDIR /amnion
RUN yarn global add turbo;
#  Prune workspace gi_modules
RUN turbo prune --scope=gi_modules --out-dir=gjsx --docker; \
    turbo prune --scope=proxy --out-dir=gjsx --docker; \
    turbo prune --scope=docker --out-dir=gjsx --docker;
 
RUN cd /amnion/gjsx/json; yarn;

#  Prune workspace frontend
RUN turbo prune --scope=render --out-dir=remix --docker; \
    turbo prune --scope=server --out-dir=remix --docker; \
    turbo prune --scope=ui --out-dir=remix --docker;

RUN cd /amnion/remix/json; yarn;


FROM node as gjsx_builder

RUN yarn global add turbo;

WORKDIR /amnion
COPY --from=pruner /amnion/gjsx/json/ .
COPY --from=pruner /amnion/gjsx/json/yarn.lock ./yarn.lock
COPY --from=pruner /amnion/gjsx/full/ .

COPY ./turbo.json ./turbo.json

RUN yarn build --filter=gi_modules;\
    yarn shed;




FROM packages as amnion-gjsx
ADD docker/supervisor/prod/broadway.conf /etc/supervisord/
COPY --from=gjsx_builder /amnion /gjsx
WORKDIR /gjsx
CMD yarn start