
export default {
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_CONNECT_CLIENT_ID: process.env.STRIPE_CONNECT_CLIENT_ID,
    ISSUER_ID: process.env.ISSUER_ID,
    ISSUER_SEED: process.env.ISSUER_SEED,
    HORIZON_URL: process.env.HORIZON_URL,
    NETWORK_PASSPHRASE: process.env.NETWORK_PASSPHRASE,
    WITHDRAW_ENDPOINT: process.env.WITHDRAW_ENDPOINT,
    NODE_ENV: process.env.NODE_ENV,
    PEER_SOCKET_DOMAIN: process.env.PEER_SOCKET_DOMAIN,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    INTERFACE_DOMAIN: process.env.INTERFACE_DOMAIN,
    RADATA_PATH: process.env.RADATA_PATH
  },
  data: {
    pages: {
      root: {
        meta: {
          title: `CNXT | Dynamic Namespaces`,
          description: `Dynamic namespaces for dynamic content. Developed by Bresnow for FLTNGMMTH + XDesk`,
          author: "Bresnow",
          keywords:
            "cnxt, xdesk, dynamic, namespaces, globalIcon, taglish, #://, hashtag, domains, crypto, floating, mammoth, FLTNGMMTH, Bresnow, development, server, Remix.run, GunDB, gun",
          "og:type": "website",
          "og:image": `<%--protocol-host--%>/images/x_icon.png`,
          "og:image:width": "512",
          "og:image:height": "512",
          "og:description":
            "Dynamic namespaces for dynamic content. #://HashtagProtocol",
          "og:title": `Dynamic Namespaces`,
          "og:url": `<%--protocol-host--%>/`,
          "og:site_name": ``,
          "og:locale": "en_US",
          "twitter:card": "summary_large_image",
          "twitter:site": "@bresnow",
          "twitter:creator": "@bresnow",
          "twitter:title": ` Dynamic Namespaces`,
          "twitter:description":
            "Dynamic namespaces for dynamic content. #://HashtagProtocol",
          "twitter:image": ``,
          "twitter:image:alt": `CNXT | Dynamic Namespaces`,
          "twitter:image:width": "512",
          "twitter:image:height": "512",
        },
      },
      cnxt: {
        header: {
          title: "#CNXT",
          subtitle: `Alpha implementation of the #HashedTagNamespaceProtocol.`,
        },
        heading: `CNXT  Dynamic Namespaces`,
        profile: "/images/AppIcon.svg",

        // trunk-ignore(git-diff-check/error)
        text: `#://CNXT [pronounced "connects"] is a asset issuance protocol that uses cryptographically "Hashed Tags" as content addresses to create and store entire platforms, aka #://Namespaces, on a public ledger. While the 
       ledger tokenizes the Namespaces per se, the data that gives the platform it's value is encrypted and persisted locally within your browser.
        `,
        meta_cards: {
          service_delimiters: {
            hash: {
              prefix: "#:\\",
              service: "Information Delimiter",
              description: "Point to any information. The default delimiter.",
            },
            at_rate: {
              prefix: "@:\\",
              service: "Identity Delimiter",
              description:
                "User profiles, resumes, #eBusinessCards, and namespaces identifying individual personalities.",
            },
            dollar: {
              prefix: "$:\\",
              service: "Finance & Barter Delimiter",
              description:
                "Price tickers, ecommerce, cryptocurrency, coupons, etc. The default delimiter for namespaces about money.",
            },
            x_clam: {
              prefix: "!:\\",
              service: "Alert Delimiter",
              description:
                "Messages, notifications, chat, etc... The default delimiter for building namespaces around communication awareness.",
            },
            wildcard: {
              prefix: "*:\\",
              service: "WildCard Delimiter",
              description:
                "Namespaces dealing with more than one hash service.",
            },
          },
          links: {
            github: {
              id: "github-remix.gun",
              link: "https://github.com/bresnow/remix.gun/tree/cnxt",
              label: "Github",
            },
            twitter: {
              id: "github-remix.gun",
              link: "https://github.com/bresnow/remix.gun/tree/cnxt",
              label: "Github",
            },
          },
        },
      },
      god: {
        header: {
          title: "#CNXT",
          subtitle: `Alpha implementation of the #HashedTagNamespaceProtocol. An open source #PaaS built by developer and #interfaceDesigner @Bresnow.`,
        },
        heading: `CNXT  Dynamic Namespaces`,
        profile: "/images/AppIcon.svg",

        text: `#CNXT [ pronounced kuh-next ] is a peer-to-peer, offline-first content management network. A *ProofOfWork hashing algorithm create unique content addresses or #nameSpaces. These !dynamicDomains can host an unlimited array of content and services. !inDEVELOPMENT`,
        meta_cards: {
          service_delimiters: {
            hash: {
              prefix: "#:\\",
              service: "Information Delimiter",
              description: "Point to any information. The default delimiter.",
            },
            at_rate: {
              prefix: "@:\\",
              service: "Identity Delimiter",
              description:
                "User profiles, resumes, #eBusinessCards, and namespaces identifying individual personalities.",
            },
            dollar: {
              prefix: "$:\\",
              service: "Finance & Barter Delimiter",
              description:
                "Price tickers, ecommerce, cryptocurrency, coupons, etc. The default delimiter for namespaces about money.",
            },
            x_clam: {
              prefix: "!:\\",
              service: "Alert Delimiter",
              description:
                "Messages, notifications, chat, etc... The default delimiter for building namespaces around communication awareness.",
            },
            wildcard: {
              prefix: "*:\\",
              service: "WildCard Delimiter",
              description:
                "Namespaces dealing with more than one hash service.",
            },
          },
          links: {
            github: {
              id: "github-remix.gun",
              link: "https://github.com/bresnow/remix.gun/tree/cnxt",
              label: "Github",
            },
            twitter: {
              id: "github-remix.gun",
              link: "https://github.com/bresnow/remix.gun/tree/cnxt",
              label: "Github",
            },
          },
        },
      },
      smart_contracts: {
        header: {
          title: "#CNXT",
          subtitle: `Alpha implementation of the #HashedTagNamespaceProtocol. An open source #PaaS built by developer and #interfaceDesigner @Bresnow.`,
        },
        heading: `CNXT  Dynamic Namespaces`,
        profile: "/images/AppIcon.svg",

        text: `#CNXT [ pronounced kuh-next ] is a peer-to-peer, offline-first content management network. A *ProofOfWork hashing algorithm create unique content addresses or #nameSpaces. These !dynamicDomains can host an unlimited array of content and services. !inDEVELOPMENT`,
        meta_cards: {
          service_delimiters: {
            hash: {
              prefix: "#:\\",
              service: "Information Delimiter",
              description: "Point to any information. The default delimiter.",
            },
            at_rate: {
              prefix: "@:\\",
              service: "Identity Delimiter",
              description:
                "User profiles, resumes, #eBusinessCards, and namespaces identifying individual personalities.",
            },
            dollar: {
              prefix: "$:\\",
              service: "Finance & Barter Delimiter",
              description:
                "Price tickers, ecommerce, cryptocurrency, coupons, etc. The default delimiter for namespaces about money.",
            },
            x_clam: {
              prefix: "!:\\",
              service: "Alert Delimiter",
              description:
                "Messages, notifications, chat, etc... The default delimiter for building namespaces around communication awareness.",
            },
            wildcard: {
              prefix: "*:\\",
              service: "WildCard Delimiter",
              description:
                "Namespaces dealing with more than one hash service.",
            },
          },
          links: {
            github: {
              id: "github-remix.gun",
              link: "https://github.com/bresnow/remix.gun/tree/cnxt",
              label: "Github",
            },
            twitter: {
              id: "github-remix.gun",
              link: "https://github.com/bresnow/remix.gun/tree/cnxt",
              label: "Github",
            },
          },
        },
      },
      drive: {
        header: {
          title: "#CNXT",
          subtitle: `Alpha implementation of the #HashedTagNamespaceProtocol. An open source #PaaS built by developer and #interfaceDesigner @Bresnow.`,
        },
        heading: `CNXT  Dynamic Namespaces`,
        profile: "/images/AppIcon.svg",

        text: `#CNXT [ pronounced kuh-next ] is a peer-to-peer, offline-first content management network. A *ProofOfWork hashing algorithm create unique content addresses or #nameSpaces. These !dynamicDomains can host an unlimited array of content and services. !inDEVELOPMENT`,
        meta_cards: {
          service_delimiters: {
            hash: {
              prefix: "#:\\",
              service: "Information Delimiter",
              description: "Point to any information. The default delimiter.",
            },
            at_rate: {
              prefix: "@:\\",
              service: "Identity Delimiter",
              description:
                "User profiles, resumes, #eBusinessCards, and namespaces identifying individual personalities.",
            },
            dollar: {
              prefix: "$:\\",
              service: "Finance & Barter Delimiter",
              description:
                "Price tickers, ecommerce, cryptocurrency, coupons, etc. The default delimiter for namespaces about money.",
            },
            x_clam: {
              prefix: "!:\\",
              service: "Alert Delimiter",
              description:
                "Messages, notifications, chat, etc... The default delimiter for building namespaces around communication awareness.",
            },
            wildcard: {
              prefix: "*:\\",
              service: "WildCard Delimiter",
              description:
                "Namespaces dealing with more than one hash service.",
            },
          },
          links: {
            github: {
              id: "github-remix.gun",
              link: "https://github.com/bresnow/remix.gun/tree/cnxt",
              label: "Github",
            },
            twitter: {
              id: "github-remix.gun",
              link: "https://github.com/bresnow/remix.gun/tree/cnxt",
              label: "Github",
            },
          },
        },
      },
    },
  },
};
