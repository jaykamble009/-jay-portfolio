const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const logoPath = path.join(publicDir, 'logo.svg');

const appDir = path.join(__dirname, '../app');

if (!fs.existsSync(logoPath)) {
  console.error('logo.svg not found in public directory');
  process.exit(1);
}

const icons = [
  { name: 'android-chrome-192x192.png', size: 192, dir: publicDir },
  { name: 'android-chrome-512x512.png', size: 512, dir: publicDir },
  { name: 'icon.png', size: 32, dir: appDir },
  { name: 'apple-icon.png', size: 180, dir: appDir }
];

async function generateIcons() {
  console.log('Generating icons...');
  try {
    for (const icon of icons) {
      await sharp(logoPath)
        .resize(icon.size, icon.size)
        .png()
        .toFile(path.join(icon.dir, icon.name));
      console.log(`Generated ${icon.name} in ${icon.dir}`);
    }

    // Copy icon.png as favicon.ico for legacy browsers
    fs.copyFileSync(
      path.join(appDir, 'icon.png'),
      path.join(appDir, 'favicon.ico')
    );
    console.log('Copied icon.png to favicon.ico');
    
    console.log('All icons generated successfully!');
  } catch (err) {
    console.error('Error generating icons:', err);
  }
}

generateIcons();
