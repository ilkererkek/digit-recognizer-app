from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
import numpy as np

from model.digit_recognizer import DigitRecognizerModel
from functions.request_decoder import decode_request

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


print('Model Loading')
model = DigitRecognizerModel('./ModelFiles/model.h5')
print('Model loaded')


@app.route("/predict",methods=['POST'])
@cross_origin()
def test():
    image = decode_request(request)
    prediction = model(image)
    response = jsonify({'Prediction': str(prediction)})
    return response

@app.route('/')
@cross_origin()
def home():
    return app.send_static_file('index.html')


