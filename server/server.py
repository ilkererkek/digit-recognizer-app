from flask import Flask, render_template

app = Flask(__name__)

@app.route("/predict",methods=['POST'])
def test():
    return "Hello World"


@app.route('/')
def home():
    return render_template("index.html")


