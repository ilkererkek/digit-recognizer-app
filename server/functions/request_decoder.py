from PIL import Image, ImageOps
import io
import base64

import numpy as np


def decode_request(request):
    image = request.files.get('image').read()
    pil_image = Image.open(io.BytesIO(image)).resize((28,28), Image.LANCZOS).convert("L") 
    revert_image = ImageOps.invert(pil_image)
    return np.array(revert_image).reshape((-1,28,28,1)) / .255