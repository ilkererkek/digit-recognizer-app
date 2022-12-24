import io
import base64
from PIL import Image, ImageOps

from flask import Flask
from flask import request
from flask import jsonify

from flask_cors import CORS, cross_origin


from tensorflow.keras.models import load_model, Sequential
from tensorflow.keras.layers import Reshape, Softmax
import numpy as np

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


print('Loading')
model = Sequential([load_model('./model/model.h5'), Softmax()])
print(model.summary())
print('Model loaded')

def decode_request(image):
    
    pil_image = Image.open(io.BytesIO(image)).resize((28,28), Image.LANCZOS).convert("L") 
    print(pil_image.height, pil_image.width)
    revert_image = ImageOps.invert(pil_image)
    revert_image.save('image.png')
    return np.array(revert_image).reshape((-1,28,28,1))

@app.route("/predict",methods=['POST'])
@cross_origin()
def test():
    print('Predict')
    formData = request.files.get('image').read()
    image = decode_request(formData)
    print(image.shape)
    print(image.max())
    prediction = model.predict(image)
    response = jsonify({'Prediction': str(np.argmax(prediction))})
    return response

@app.route('/')
@cross_origin()
def home():
    return app.send_static_file('index.html')


