#!/usr/bin/env node

const { execSync } = require("child_process");

async function build() {
  console.log("🏗️  Building Next.js...");
  execSync("next build", { stdio: "inherit" });
  console.log("✨ Build complete!");
}

build().catch((error) => {
  console.error("❌ Build failed:", error);
  process.exit(1);
});
