let t = {
    "amnion_version": "1.0.0",
        "routes": {
        "root": {
            "meta": {
                "title": "Amnion",
                    "description": "The Amnion framework is a tool for developers to build and deploy light-weight, ephemeral, server environments known as \"interfaces\".",
                        "author": "Bresnow",
                            "keywords": [
                                "Peer-to-peer",
                                "Decentralized",
                                "Distributed networks",
                                "Scalability",
                                "Data encryption",
                                "Microservice orchestrator",
                                "Container instances",
                                "JSX runtime",
                                "Gtk4 widgets",
                                "Gnome libraries",
                                "Soup",
                                "Webkit",
                                "Native desktop application",
                                "Web browser",
                                "Broadway display signal",
                                "Websockets",
                                "Data storage",
                                "Browser cache",
                                "Indexed db",
                                "Software as a service (SaaS)",
                                "Developers",
                                "Companies",
                                "Decentralized web applications",
                                "Micro-distros",
                                "Renders",
                                "Interfaces",
                                "TCP and UDP connections"
                            ],
                                "og:type": "website",
                                    "og:image": "https://{{ Config.FRONTEND_DOMAIN }}/images/x_icon.png",
                                        "og:image:width": 512,
                                            "og:image:height": 512,
                                                "og:description": "Dynamic namespaces for dynamic content. \\#://HashtagProtocol",
                                                    "og:title": "Dynamic Namespaces",
                                                        "og:url": "https://{{ Config.FRONTEND_DOMAIN }}",
                                                            "og:site_name": null,
                                                                "og:locale": "en_US",
                                                                    "twitter:card": "summary_large_image",
                                                                        "twitter:site": "@bresnow",
                                                                            "twitter:creator": "@bresnow",
                                                                                "twitter:title": "Dynamic Namespaces",
                                                                                    "twitter:description": null,
                                                                                        "twitter:image": "https://{{ Config.FRONTEND_DOMAIN }}/images/logo.png",
                                                                                            "twitter:image:alt": "Amnion",
                                                                                                "twitter:image:width": 512,
                                                                                                    "twitter:image:height": 512
            }
        },
        "index": {
            "sections": {
                "hero": {
                    "title": "Amnion",
                        "subtitle": "Native-like peer-to-peer application interfaces streamed to the DOM.",
                            "heading": "Distributed Interface Network",
                                "images": [
                                    "/images/AppIcon.svg"
                                ],
                                    "text": "Amnion is an open-source software framework and content management system that builds\nnative-like software interfaces. It uses peer-to-peer and legacy web technologies to create decentralized and\ndistributed networks that improve scalability and reduce dependence on \ncentralized servers. Each render is made for only a single connection but is designed fetch, mutate, and post data globally. Just like a desktop or mobile device inside of the browser.\nWhat we produce is a dynamic, secure web experience that keeps the user in a single application context.\n"
                },
                "feature_with_images": {
                    "title": "The Interface & Development",
                        "subtitle": "Where Minds Meet",
                            "list": [
                                "Peer-to-peer",
                                "Decentralized",
                                "Distributed networks",
                                "Scalability",
                                "Data encryption",
                                "Microservice orchestrator",
                                "Container instances",
                                "JSX runtime",
                                "Gtk4 widgets"
                            ],
                                "links": {
                        "gnome_js": {
                            "label": "Gnome Javascript",
                                "to": "https://github.com"
                        },
                        "gtk_4": {
                            "label": "Gtk-4.0",
                                "to": "https://github.com"
                        }
                    },
                    "text": "While Amnion is written mostly in javascript, it isn't strictly a frontend or backend framework. A blend of the two is required \nto deploy an interface. However, we aim to provide both frontend and backend devs with a powerful and accessible solution for building these \nnative-like experiences. If you have googled \"web development\" at least once you are familiar server runtimes like React. Amnion uses it's own JSX runtime that for \nthe {{ gnome_js }} server environment.{{ Gtk-4.0 }} widgets are then streamed to the DOM proxying the {{ Gtk4-Broadway }} server. The security layer is\nthen layered from the display proxy to the client using networking and an evolving encryption strategy. Additionally, the server handles all these programatic tasks while the browser persists the data. This allows the interface to fetch and mutate user data\nand store none of it server side. Once re-deployed the browser feeds Amnion the hashed state of the application and it's datastore. Picking up where it left off.\nThese interfaces are like a personal computer open to connections across endpoints and data protocols. Trustlessness is the highest priority. An intuitive user experience \nis number 2.\n"
                }
            }
        }
    }
}