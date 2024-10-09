import tensorflow
from tensorflow.keras.models import load_model

model = load_model('crop_model.h5')

if model:
    print('model available!')
    
else:
    print("Can't load")