import React from "react";
import { createRoot } from "react-dom/client";

const parent = React.createElement("div", { id: "parent" }, [
  React.createElement("div", { id: "child", key: "child1" }, [
    React.createElement("h1", { key: "h1-1" }, "I am h1 tag"),
    React.createElement("h2", { key: "h2-1" }, "I am h2 tag")
  ]),
  React.createElement("div", { id: "child2", key: "child2" }, [
    React.createElement("h1", { key: "h1-2" }, "My name is shreyash"),
    React.createElement("h2", { key: "h2-2" }, "I am ok h2 tag")
  ])
]);

console.log(parent);

const root = createRoot(document.getElementById("root"));
root.render(parent);
