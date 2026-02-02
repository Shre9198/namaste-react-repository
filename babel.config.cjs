module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["chrome >= 60", "firefox >= 55", "safari >= 12", "edge >= 79"]
        }
      }
    ],
    ["@babel/preset-react", { runtime: "automatic" }]
  ],

  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: { node: "current" },
            modules: "commonjs"
          }
        ],
        ["@babel/preset-react", { runtime: "automatic" }]
      ]
    }
  }
};
