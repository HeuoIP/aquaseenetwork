import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { chromium } from 'playwright-core';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import { toString } from 'mdast-util-to-string';

const base=process.env.PREVIEW_ORIGIN??'http://127.0.0.1:8796';
const published=process.env.G9_RELEASE==='1';
const release=published?JSON.parse(readFileSync('docs/seo/g9-release.json','utf8')):null;
const out=process.env.PREVIEW_SCREENSHOT_DIR??'docs/previews/g9-worker';
const archive='docs/seo/content/g9-review-v1';
const source=readFileSync(`${archive}/article.en.md`,'utf8');
const metadata=JSON.parse(readFileSync(`${archive}/metadata.json`,'utf8'));
const assets=JSON.parse(readFileSync(`${archive}/assets.json`,'utf8'));
const blocks=[],headings=[];
function collect(node){
 if(['paragraph','heading','tableCell'].includes(node.type))blocks.push(toString(node));
 if(node.type==='heading')headings.push({level:node.depth,text:toString(node)});
 for(const child of node.children??[])collect(child);
}
collect(unified().use(remarkParse).use(remarkGfm).parse(source));
const normalize=v=>v.replace(/\s+/g,' ').trim();
await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const result={environment:base.startsWith('https:')?'production':'local OpenNext Worker',base,path:metadata.path,checkedAt:new Date().toISOString(),sourceBlocks:blocks.length,faqCount:headings.filter(h=>h.level===3).length,viewports:[],assets:[],routes:[]};
try {
 assert.equal(result.faqCount,9);
 for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(`${base}${metadata.path}`,{waitUntil:'networkidle'});
  assert.equal(response.status(),200);
  assert.equal(await page.locator('main h1').count(),1);
  assert.equal(await page.title(),metadata.title);
  assert.equal(await page.locator('meta[name=description]').getAttribute('content'),metadata.description);
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),`https://www.aquasee.art${metadata.path}`);
  const robots=await page.locator('meta[name=robots]').getAttribute('content');
  if(published) { assert.ok(robots.includes('index')&&!robots.includes('noindex'));assert.ok(!(response.headers()['x-robots-tag']??'').includes('noindex'));assert.deepEqual((await page.locator('link[rel=alternate][hreflang]').evaluateAll(es=>es.map(e=>e.hreflang))).sort(),['en','x-default']); }
  else {assert.match(robots,/noindex/);assert.equal(await page.locator('link[rel=alternate][hreflang]').count(),0);}
  const actual=await page.locator('main h1,main h2,main h3').evaluateAll(es=>es.map(e=>({level:Number(e.tagName[1]),text:e.textContent})));
  assert.deepEqual(actual,headings);
  const text=normalize(await page.locator('main').innerText());
  for(const b of blocks)assert.ok(text.includes(normalize(b)),`Missing source block: ${b.slice(0,80)}`);
  const heroStrong=page.locator('main section').first().locator('strong');
  if(await heroStrong.count()) {
    const colors=await heroStrong.first().evaluate(e=>({fg:getComputedStyle(e).color,bg:getComputedStyle(e.closest('section')).backgroundColor}));
    const luminance=v=>{const rgb=v.match(/[0-9.]+/g).slice(0,3).map(Number).map(x=>{x/=255;return x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4;});return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722;};
    const a=luminance(colors.fg),b=luminance(colors.bg);const contrast=(Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
    assert.ok(contrast>=4.5,`Hero bold text contrast ${contrast}`);
  }
  assert.match(headings[0].text,/Misting and Shade/);
  assert.ok(text.includes('Cool Playgrounds'));
  const schema=(await page.locator('script[type="application/ld+json"]').allTextContents()).map(JSON.parse).flatMap(g=>g['@graph']??[g]);
  const article=schema.find(n=>n['@type']==='Article');
  assert.equal(article.headline,headings[0].text);
  assert.deepEqual(article.citation,metadata.citations);
  assert.equal(article.author,undefined);
  if(published) {assert.equal(article.datePublished,release.publishedAt);assert.equal(article.dateModified,release.publishedAt);assert.ok(!text.includes('Publication pending'));}
  else {assert.equal(article.datePublished,undefined);assert.equal(article.dateModified,undefined);}
  assert.ok(schema.some(n=>n['@type']==='BreadcrumbList'));
  assert.ok(schema.some(n=>n['@type']==='WebPage'));
  assert.ok(!schema.some(n=>['FAQPage','Product','Offer','AggregateRating'].includes(n['@type'])));
  assert.equal(await page.locator('meta[property="og:image"]').first().getAttribute('content'),`https://www.aquasee.art${assets.cover.src}`);
  assert.equal(await page.getByRole('link',{name:'Open full-size image',exact:true}).count(),Object.keys(assets).length-1);
  for(const [key,asset] of Object.entries(assets)){
   const img=page.locator(`main img[src="${asset.src}"]`);assert.equal(await img.count(),1);
   await img.scrollIntoViewIfNeeded();await img.evaluate(e=>e.decode());
   assert.equal(await img.getAttribute('alt'),asset.alt);
   assert.ok(text.includes(asset.caption));
   if(key!=='cover')assert.ok(text.includes(asset.textEquivalent));
   assert.ok(await img.evaluate((e,width)=>e.complete&&e.naturalWidth===width,asset.width));
  }
  const toc=await page.locator('nav[aria-label="On this page"] a[href^="#"]').first().getAttribute('href');
  await page.locator('nav[aria-label="On this page"] a[href^="#"]').first().click();
  assert.equal(new URL(page.url()).hash,toc);
  assert.equal(await page.locator(toc).count(),1);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
  assert.ok(overflow<=2,`${width}px overflow ${overflow}`);assert.deepEqual(errors,[]);
  await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${out}/article-${width}.png`});
  await page.locator(`main img[src="${assets.zones.src}"]`).scrollIntoViewIfNeeded();await page.screenshot({path:`${out}/diagram-${width}.png`});
  await page.locator('article').screenshot({path:`${out}/body-${width}.png`});
  result.viewports.push({width,overflow,javascriptErrors:errors,status:'PASS'});
  await page.close();
 }
 const context=await browser.newContext();
 for(const asset of Object.values(assets)){
  const response=await context.request.get(base+asset.src);assert.equal(response.status(),200);
  const sha256=createHash('sha256').update(await response.body()).digest('hex');assert.equal(sha256,asset.sha256);
  result.assets.push({path:asset.src,status:200,sha256});
 }
 const sourceLinks=[...new Set([...source.matchAll(/\]\((\/[^)]+)\)/g)].map(m=>m[1]))];
 for(const route of [...sourceLinks,'/buying-guides','/collections/compact-water-parks','/buying-guides/pool-slide-total-cost','/buying-guides/misting-playground-planning','/sitemap.xml','/llms.txt','/llms-full.txt']){
  const response=await context.request.get(base+route);assert.equal(response.status(),200,route);
  const body=await response.text();
  if(['/sitemap.xml','/buying-guides','/llms.txt','/llms-full.txt','/collections/compact-water-parks'].includes(route))assert.equal(['/buying-guides','/collections/compact-water-parks'].includes(route) ? body.includes('href=\"'+metadata.path+'\"') : body.includes(metadata.path),published,`G9 discovery link state in ${route}`);
  result.routes.push({path:route,status:response.status()});
 }
 for(const locale of ['zh','ar','ru'])assert.equal((await context.request.get(`${base}/${locale}${metadata.path}`)).status(),404);
 const page=await context.newPage();await page.goto(base+metadata.path);
 await page.getByRole('link',{name:'send your commercial project brief',exact:true}).click();
 await page.waitForURL('**/inquiry/business');assert.equal(await page.locator('h1').innerText(),'Commercial Project Inquiry');
 assert.ok(await page.locator('form').count()>0);result.conversion='CTA navigates to actual business form; no submission/email delivery tested';
 result.status='PASS';
 await writeFile(`${out}/check.json`,JSON.stringify(result,null,2));
 console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
