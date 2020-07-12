import path from "path";
import fs from "fs";
require("dotenv").config();

export default {
  mode: "spa",
  dev: "prod".includes(process.env.NODE_ENV) || process.env.NODE_ENV === "",
  env: {
    baseUrl: "http://" + process.env.BASE_URL || "https://localhost:3000"
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
  plugins: ["~/plugins/axios", "~/plugins/date-time", "~/plugins/vee-validate"],
  buildModules: ["@nuxtjs/vuetify"],
  modules: [
    "@nuxtjs/vuetify",
    "@nuxtjs/auth-next",
    "@nuxtjs/axios",
    "vue-scrollto/nuxt",
    "@nuxtjs/dotenv"
  ],
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
        redirectUri: "https://" + process.env.BASE_URL + "/auth/signed-in",
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        audience: process.env.AUTH0_AUDIENCE
      }
    }
  }
};
