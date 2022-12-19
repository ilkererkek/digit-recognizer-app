from flask import Flask

app = Flask(__name__)

@app.route("/predict",methods=['POST'])
def test():
    return "First app in Flask"

