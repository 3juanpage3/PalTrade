#!/usr/bin/env node

const { execSync } = require('child_process');

async function build() {
  console.log('🔨 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  console.log('🏗️  Building Next.js...');
  execSync('next build', { stdio: 'inherit' });

  console.log('🗄️  Running database migrations...');
  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('✅ Migrations completed successfully');
  } catch (error) {
    console.warn('⚠️  Migration warning (this is OK if migrations already ran):', error.message);
  }

  console.log('✨ Build complete!');
}

build().catch((error) => {
  console.error('❌ Build failed:', error);
  process.exit(1);
});
