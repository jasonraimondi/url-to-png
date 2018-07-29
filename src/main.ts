import * as express from 'express';
import * as sharp from 'sharp';
import * as puppeteer from 'puppeteer';

const app = express();

async function renderUrl(url: string) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({ width: 1080, height: 1080 });
    let screenshot = await page.screenshot();
    screenshot = await sharp(screenshot).resize(500,500).toBuffer();
    await browser.close();
    return screenshot;
  } catch (err) {
    console.log(err.message);
  }
  
  return false;
}

app.get('/', async (req, res) => {
  const errors = [];
  
  const url = req.query.url;
  
  if (!url) {
    errors.push('url is required');
  }
  
  if (errors.length > 0) {
    res.json(errors);
    return;
  }
  
  let screenshotBuffer = false;
  
  try {
    screenshotBuffer = await renderUrl(url);
  } catch (err) {
    console.log(err.message);
  }
  
  if (screenshotBuffer === false) {
    res.json('something went wrong!');
    return;
  }
  
  res.set('Content-Type', 'image/png');
  res.write(screenshotBuffer, 'binary');
  res.end(null, 'binary');
  return;
});

app.listen(3000, () => console.log(`App listening on port 3000`));
