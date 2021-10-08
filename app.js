const pdfKit=require('pdfkit');
const fs=require('fs');
const doc=new pdfKit();
doc.pipe(fs.createWriteStream('output.pdf'));
// Embed a font, set the font size, and render some text
doc
  .fontSize(25)
  .text('Some text with an embedded font!', 100, 100);

// Add an image, constrain it to a given size, and center it vertically and horizontally
doc.image('image.jpg', {
  fit: [250, 300],
  align: 'center',
  valign: 'center'
});

// Add another page
doc
  .addPage()
  .fontSize(25)
  .text('Here is some vector graphics...', 100, 100);
// Draw a triangle
doc
  .save()
  .moveTo(100, 150)
  .lineTo(100, 250)
  .lineTo(200, 250)
  .fill('#FF3300');

// Apply some transforms and render an SVG path with the 'even-odd' fill rule
doc
  .scale(0.6)
  .translate(470, -380)
  .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
  .fill('red', 'even-odd')
  .restore();

// Add some text with annotations
doc
  .addPage()
  .fillColor('blue')
  .text('Here is a link!', 100, 100)
  .underline(100, 100, 160, 27, { color: '#0000FF' })
  .link(100, 100, 160, 27, 'http://google.com/');
  //add another page
  doc
  .addPage()
  .fontSize(25)
  .text('Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero vero commodi eos at, adipisci sint. Nostrum quam tenetur eum repellat suscipit libero quaerat velit, facilis ratione ex nesciunt corporis itaque assumenda nulla impedit saepe minima enim laudantium quo? Molestias inventore sunt, dolorum sint laudantium, ipsum quos voluptatem culpa cumque perferendis fugit voluptas dolores perspiciatis quis molestiae, provident nihil nam iusto tempora voluptate aut vero obcaecati sed! Ullam minima distinctio, quos illum, dignissimos quisquam laudantium, ratione aspernatur officia rerum a facere!', 100, 100);

// Finalize PDF file
doc.end();