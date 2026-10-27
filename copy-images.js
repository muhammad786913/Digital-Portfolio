const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const images = [
  {
    src: "C:\\Users\\ALI\\.gemini\\antigravity-ide\\brain\\85c1ccf7-b70b-4538-8cd6-83c466b59ed0\\hero_developer_portrait_1792783726659.jpg",
    dest: "developer-portrait.jpg"
  },
  {
    src: "C:\\Users\\ALI\\.gemini\\antigravity-ide\\brain\\85c1ccf7-b70b-4538-8cd6-83c466b59ed0\\digital_impact_mockup_1792783757380.jpg",
    dest: "digital-impact.jpg"
  },
  {
    src: "C:\\Users\\ALI\\.gemini\\antigravity-ide\\brain\\85c1ccf7-b70b-4538-8cd6-83c466b59ed0\\matias_portfolio_mockup_1792783783954.jpg",
    dest: "matias-portfolio.jpg"
  },
  {
    src: "C:\\Users\\ALI\\.gemini\\antigravity-ide\\brain\\85c1ccf7-b70b-4538-8cd6-83c466b59ed0\\admission_portal_mockup_1792783811224.jpg",
    dest: "admission-portal.jpg"
  },
  {
    src: "C:\\Users\\ALI\\.gemini\\antigravity-ide\\brain\\85c1ccf7-b70b-4538-8cd6-83c466b59ed0\\todo_mongo_mockup_1792783866774.jpg",
    dest: "taskflow-mongo.jpg"
  },
  {
    src: "C:\\Users\\ALI\\.gemini\\antigravity-ide\\brain\\85c1ccf7-b70b-4538-8cd6-83c466b59ed0\\calculator_app_mockup_1792783903264.jpg",
    dest: "omnicalc-pro.jpg"
  }
];

images.forEach(img => {
  if (fs.existsSync(img.src)) {
    fs.copyFileSync(img.src, path.join(targetDir, img.dest));
    console.log(`Copied ${img.dest} successfully.`);
  } else {
    console.error(`Source not found: ${img.src}`);
  }
});
