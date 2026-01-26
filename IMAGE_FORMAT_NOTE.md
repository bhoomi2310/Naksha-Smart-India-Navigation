# Image Format Note

## About SVG Conversion

You requested to "save all the images in svg format so that the backgrounds are not blur."

### Important Note:
The images you've provided (Taj Mahal, Hampi, Qutub Minar, Gateway of India, Goddess, Auto-rickshaw) are **photographic images** (PNG/JPG format). These cannot be directly converted to true SVG format because:

1. **SVG is vector-based** - It uses mathematical paths and shapes
2. **Photos are raster-based** - They are made of pixels

### What We Can Do Instead:

1. **Use High-Resolution Images**: The current PNG images are already high quality. They will look sharp when used with proper CSS:
   - `background-size: cover` ensures proper scaling
   - `background-attachment: fixed` for parallax effects
   - Proper image optimization

2. **Optimize Current Images**: 
   - The images are already in `src/assets/` and are being used correctly
   - They maintain quality when scaled properly

3. **Alternative Solutions**:
   - If you want true SVG backgrounds, you would need **vector illustrations** (not photos) of the monuments
   - Or use SVG patterns/overlays on top of the photos for decorative elements

### Current Implementation:
- All images are imported correctly using `import` statements
- Images use `background-size: cover` for full-page coverage
- Images maintain their aspect ratio and quality
- The backgrounds should not appear blurry with proper CSS settings

### If You Still Want SVG:
If you have vector illustrations of these monuments (created in Illustrator, Inkscape, etc.), we can replace the PNG files with SVG versions. However, converting photos to SVG would require manual tracing/redrawing, which is a design task rather than a code task.

The current implementation should display images clearly without blur. If you're experiencing blur, it might be due to:
- Browser zoom level
- Image resolution
- CSS scaling issues

Let me know if you're seeing blur and I can help optimize the CSS further!
