require("dotenv").config();

export default {
  mode: "spa",
  env: {
    apiUrl: process.env.API_URL || "http://localhost:3000"
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      {
        charset: "utf-8"
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
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/axios", "~/plugins/date-time", "~/plugins/vee-validate"],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // '@nuxtjs/eslint-module',
    "@nuxtjs/vuetify"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    "@nuxtjs/vuetify",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/auth-next",
    "@nuxtjs/axios",
    "vue-scrollto/nuxt",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv"
  ],
  server: {
    port: 80, // default: 3000
    host: "0.0.0.0" // default: localhost
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.apiUrl
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
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
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  auth: {
    redirect: {
      login: "/", // redirect user when not connected
      callback: "/auth/signed-in"
    },
    strategies: {
      local: false,
      auth0: {
        scheme: "oauth2",
        endpoints: {
          authorization: "https://" + process.env.AUTH0_DOMAIN + "/authorize",
          token: undefined,
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
        responseType: "token",
        grantType: "authorization_code",
        accessType: undefined,
        redirectUri: undefined,
        scope: ["openid", "profile", "email"],
        state: "UNIQUE_AND_NON_GUESSABLE",
        codeChallengeMethod: "plain",
        responseMode: "",
        acrValues: "",
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        audience: process.env.AUTH0_AUDIENCE
      }
    }
  }
};
