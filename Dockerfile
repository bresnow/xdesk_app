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

# TODO: Config YAML file to add theme url and theme name

FROM packages as development

ADD docker/supervisor/layered/{broadway,gjsx}.log docker/supervisor/layered/development/*.log /etc/supervisord/
WORKDIR /gjsx
COPY . /gjsx

# nodejs environment
RUN \
    npm i -g yarn nodemon zx; \
    yarn

#  Prune workspaces
RUN yarn turbo prune --scope gi_modules --out-dir /pruned_gi --docker; \
    yarn turbo prune --scope server --out-dir /pruned_front --docker; \
    yarn turbo prune --scope ui --out-dir /pruned_front --docker; \
    yarn turbo prune --scope render --out-dir /pruned_front --docker; 


CMD ["/usr/bin/supervisord","-c","/etc/supervisord.conf"]

FROM packages as installer
WORKDIR /gjsx
COPY --from=development /pruned_gi/json/ .
RUN yarn

COPY --from=development /pruned_gi/full/ .
RUN yarn build



FROM packages as gtk4-application
ADD docker/supervisor/layered/{broadway,gjsx}.log docker/supervisor/layered/production/*.log /etc/supervisord/

WORKDIR /gjsx