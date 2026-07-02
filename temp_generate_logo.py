from pathlib import Path
import cairosvg

svg_path = Path('public/logo.svg')
png_path = Path('public/logo.png')
if not svg_path.exists():
    raise FileNotFoundError(svg_path)

cairosvg.svg2png(url=str(svg_path), write_to=str(png_path), output_width=512)
print('created', png_path, png_path.stat().st_size)
