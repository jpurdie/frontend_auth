import path from "path";
import fs from "fs";

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  dev: "prod".includes(process.env.NODE_ENV) || process.env.NODE_ENV === "",
  publicRuntimeConfig: {
    nodeEnv: process.env.NODE_ENV || "prod",
    foo: process.env.FOO || undefined,
    appName: process.env.APP_NAME || "Vitae",
    baseURL: "https://" + process.env.BASE_URL || "https://localhost:3000",
    auth0Domain: process.env.AUTH0_DOMAIN,
    auth0ClientID: process.env.AUTH0_CLIENT_ID,
    auth0Audience: process.env.AUTH0_AUDIENCE,
    auth0CallbackRoute: process.env.AUTH0_CALLBACK_ROUTE,
    apiURL: process.env.API_URL
  },
  server: {
    port: 443, // default: 3000
    host: "localhost", // default: localhost
    https: {
      key: fs.readFileSync(path.resolve(process.env.KEY_LOC)),
      cert: fs.readFileSync(path.resolve(process.env.CERT_LOC))
    }
  },
  serverMiddleware: [
    // Will register redirect-ssl npm package
    "redirect-ssl"
  ],
  head: {
    titleTemplate: process.env.APP_NAME,
    title: process.env.APP_NAME || "",
    meta: [
      {
        charset: "UTF-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  css: ["~/assets/main.css"],
  plugins: [
    { src: "~/plugins/selected-profile", ssr: true },
    { src: "~/plugins/axios", ssr: false },
    { src: "~/plugins/strings", ssr: false },
    { src: "~/plugins/vee-validate", ssr: false }
  ],
  buildModules: ["@nuxtjs/vuetify"],
  modules: ["@nuxtjs/vuetify", "@nuxtjs/auth-next", "@nuxtjs/axios", "vue-scrollto/nuxt", "cookie-universal-nuxt"],
  axios: {
    baseURL: process.env.API_URL,
    progress: true
  },
  vuetify: {
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#002244",
          secondary: {
            base: "#3b3b3b",
            lighten3: "#585858",
            darken3: "#1e1e1e"
          },
          tertiary: {
            base: "#4682bf",
            lighten3: "#4696bf",
            darken3: "#466ebf"
          },
          accent: "#69BE28"
        }
      }
    }
  },
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
    }
  },
  auth: {
    redirect: false,
    strategies: {
      local: false,
      // auth0: {
      //   domain: process.env.AUTH0_DOMAIN,
      //   clientId: process.env.AUTH0_CLIENT_ID,
      //   audience: process.env.AUTH0_AUDIENCE,
      //   scope: ["openid", "profile", "email", "offline_access"],
      //   redirectUri: "https://" + process.env.BASE_URL + "/signed-in",

      //   responseType: "code",
      //   grantType: "authorization_code",
      //   codeChallengeMethod: "S256"
      // },
      auth0: {
        scheme: "oauth2",
        endpoints: {
          authorization: "https://" + process.env.AUTH0_DOMAIN + "/authorize",
          token: "https://" + process.env.AUTH0_DOMAIN + "/oauth/token",
          userInfo: "https://" + process.env.AUTH0_DOMAIN + "/userinfo",
          logout: "https://" + process.env.AUTH0_DOMAIN + "/logout"
        },
        token: {
          property: "access_token",
          type: "Bearer",
          maxAge: 1800
        },
        refreshToken: {
          property: "refresh_token",
          maxAge: 60 * 60 * 24 * 30
        },
        // user: {
        //   property: "user",
        //   autoFetch: true
        // },
        responseType: "code",
        grantType: "authorization_code",
        accessType: "offline",
        redirectUri: "https://" + process.env.BASE_URL + "/signed-in",
        logoutRedirectUri: "https://" + process.env.BASE_URL + "/signed-in",
        audience: process.env.AUTH0_AUDIENCE,
        clientId: process.env.AUTH0_CLIENT_ID,
        scope: ["openid", "profile", "email", "offline_access"],
        state: "UNIQUE_AND_NON_GUESSABLE",
        codeChallengeMethod: "",
        responseMode: "",
        acrValues: ""
        // autoLogout: false
      }
    }
  }
};
