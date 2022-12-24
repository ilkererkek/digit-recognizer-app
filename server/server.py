import io
import base64
from PIL import Image

from flask import Flask
import tensorflow as tf

app = Flask(__name__)

print('Loading Model')
model = load_model('./model/model.h5')
print('Model loaded')

def decode_request(req):
    encoded = req["image"]
    decoded = base64.b64decode(encoded)
    pil_image = Image.open(io.BytesIO(decoded)).resize((224,224), Image.LANCZOS).convert("RGB") 
    return pil_image 

@app.route("/predict",methods=['POST'])
def test(formData):
    print('Predict')
    x = formData['image']
    image = decode_request(x)
    reshapedImage = Reshape(height = 28, width = 28)(image)
    prediction = model.predict(image)
    return prediction

@app.route('/')
def home():
    return app.send_static_file('index.html')


