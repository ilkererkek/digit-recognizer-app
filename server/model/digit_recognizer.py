from tensorflow.keras import Model
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Reshape, Softmax
from numpy import argmax
class DigitRecognizerModel(Model):
    def __init__(self, path):
        super(DigitRecognizerModel, self).__init__()
        self.model = load_model(path)
        self.softmax = Softmax()
        
    def call(self, input_tensor):
        x = self.model.predict(input_tensor)
        x = self.softmax(x)
        return argmax(x)