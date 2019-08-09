require("@babel/register")();

// http://nightwatchjs.org/gettingstarted#settings-file

const deepmerge = require("deepmerge");
const userOptions = JSON.parse(process.env.VUE_NIGHTWATCH_USER_OPTIONS || "{}");

module.exports = deepmerge(
  {
    src_folders: ["tests/e2e/specs"],
    output_folder: "tests/e2e/reports",
    custom_assertions_path: ["tests/e2e/custom-assertions"],

    selenium: {
      start_process: true,
      server_path: require("selenium-server").path,
      host: "127.0.0.1",
      port: 4444,
      cli_args: {
        "webdriver.chrome.driver": require("chromedriver").path
      }
    },

    test_settings: {
      default: {
        selenium_port: 4444,
        selenium_host: "localhost",
        silent: true,
        // test workers make it faster but unreliable, deactivating for now
        test_workers: false,
        desiredCapabilities: {
          browserName: "chrome",
          javascriptEnabled: true,
          acceptSslCerts: true
        },
        // Base too big to be imported right now
        // launch_url: "http://localhost:8080/"
        launch_url: "https://sandbox.entreprise.data.gouv.fr/",
        globals: {
          // 15 seconds timeout for devs with slow connection / computer
          waitForConditionTimeout: 15000
        }
      },
      production: {
        launch_url: "https://entreprise.data.gouv.fr/"
      },
      sandbox: {
        launch_url: "https://sandbox.entreprise.data.gouv.fr/"
      },
      travis: {
        test_workers: false,
        launch_url: "https://sandbox.entreprise.data.gouv.fr/"
      }
    }
  },
  userOptions
);
