from flask import Flask, request, jsonify
from flask_cors import CORS
# from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import LabelEncoder
from keras.models import load_model
# import pandas as pd
import numpy as np
import tensorflow as tf
import joblib

# Load the SavedModel
# loaded_model = 

app = Flask(__name__)
CORS(app)

# Load the machine learning model from the pickle file
def loaded_model():
    model = load_model('C:/Users/Denis/Desktop/crop-recommendation/j_models/jessee_model/crop_model_1.h5')
    return model

# Load the saved LabelEncoder
def load_label_encoder():
    label_encoder = joblib.load('C:/Users/Denis/Desktop/crop-recommendation/j_models/jessee_model/label_encoder_1.pkl')
    return label_encoder

# crop_model.h5
# model = load_model()

def predict(model, data):
    # Perform predictions using the loaded model
    prediction_prob = model.predict(data)
    predicted_class = np.argmax(prediction_prob, axis=1)
    
    label_encoder = load_label_encoder()
    predicted_label = label_encoder.inverse_transform(predicted_class)
    return predicted_label[0]

def preprocess_data(data):
    fin_data = np.array([data['nitrogen'], data['phosphorous'], data['potassium'], data['temperature'], data['humidity'], data['ph'], data['rainfall']])
    
    print("\n",fin_data)
    
    fin_data = fin_data.reshape(1, -1)
    
    # print("\n",p_fin_data)
    
    return fin_data


# Route for handling predictions
@app.route('/predict', methods=['POST'])
def handle_prediction():
    try:
        # Load the model
        model = loaded_model()
        
        # scaler = joblib.load('scaler.pkl')
        
        # Get input data from the request
        input_data = request.json
        
        # Preprocess the input data
        preprocessed_data = preprocess_data(input_data)
        
        # Scale the preprocessed data
        # scaled_data = scaler.transform(preprocessed_data)
        
        # Make predictions
        prediction = predict(model, preprocessed_data)
        
        # Return the prediction result
        return jsonify({'prediction': prediction}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route for confirming user input data
@app.route('/confirm-input', methods=['POST'])
def confirm_input():
    try:
        input_data = request.json
        # Check if input data exists
        if input_data:
            # If input data exists, return success message
            return jsonify({'message': 'Input data received successfully!'}), 200
        else:
            # If no input data, return error message
            return jsonify({'error': 'No input data received!'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(port=8080, debug=True)
    

#  90	42	43	20.879744	82.002744	6.502985	202.935536	rice
#  14 , 74 , 15 ,27.99990346  ,65.57653373 ,6.493036868 , 49.94043064 ,lentil
#  85 , 95 , 47 ,25.94019018  ,78.3422098  ,6.211833161 ,119.84797    ,banana
