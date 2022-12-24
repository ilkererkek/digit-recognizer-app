from flask import Flask

app = Flask(__name__)

@app.route("/predict",methods=['POST'])
def test():
    return "Hello World"


@app.route('/')
def home():
    return app.send_static_file('index.html')


