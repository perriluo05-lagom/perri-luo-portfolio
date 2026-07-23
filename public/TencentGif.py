import fitz
from PIL import Image
import os

# ===================== 配置区，按需修改 =====================
PDF_PATH = r"C:\Users\19655\Desktop\材料汇总-Luo\作品集\国际金融管理-腾讯00700.HK-公司深度分析报告.pdf"
OUT_GIF = r"D:\Trae CN\program\Portfolio\public\Tencent.gif"
GROUP_SIZE = 3          # 每3页一组横向并排
SCALE = 0.55
FRAME_DELAY = 700
WHITE_BG = (255,255,255)
# ==========================================================

output_dir = os.path.dirname(OUT_GIF)
if output_dir and not os.path.exists(output_dir):
    os.makedirs(output_dir)

doc = fitz.open(PDF_PATH)
page_images = []

for page in doc:
    mat = fitz.Matrix(SCALE, SCALE)
    pix = page.get_pixmap(matrix=mat)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    page_images.append(img)

frames = []

# ========== 横向拼接逻辑 ==========
for start_idx in range(0, len(page_images), GROUP_SIZE):
    group = page_images[start_idx: start_idx + GROUP_SIZE]
    total_width = sum(im.width for im in group)
    max_height = max(im.height for im in group)
    canvas = Image.new("RGB", (total_width, max_height), WHITE_BG)
    x_offset = 0
    for im in group:
        canvas.paste(im, (x_offset, 0))
        x_offset += im.width
    frames.append(canvas)

if frames:
    frames[0].save(
        OUT_GIF,
        save_all=True,
        append_images=frames[1:],
        duration=FRAME_DELAY,
        loop=0,
        optimize=True
    )
    print(f"✅生成完成！总共 {len(frames)} 组画面，输出路径：{OUT_GIF}")
else:
    print("无页面")