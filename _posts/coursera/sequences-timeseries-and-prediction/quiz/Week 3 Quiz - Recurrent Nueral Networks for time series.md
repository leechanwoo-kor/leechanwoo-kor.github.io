## Week 3 Quiz - Recurrent Nueral Networks for time series

### 1. If X is the standard notation for the input to an RNN, what are the standard notations for the output?
- [ ] Y
- [ ] H
- [x] **Y(hat) and H**
- [ ] H(hat) and Y

### 2. What is a sequence to vector if an RNN has 30 cells numbered 0 to 29
- [ ] The Y(hat) for the second cell
- [x] **The Y(hat) for the last cell**
- [ ] The average Y(hat) for all 30 cells
- [ ] The total Y(hat) for all cells

### 3. WHat does a Lambda layer in a neural network do?
- [ ] Pauses training without a callback
- [ ] There are no Lambda layers in a neural network
- [ ] Changes the shape of the input or output data
- [x] **Allows you to execute arbitrary code while training**

### 4. What does the axis parameter of tf.expand_dims do?
- [ ] Defines the axis around which to expand the dimensions
- [ ] Defines the dimension index to remove when you expand the tensor
- [x] **Defines the dimension index at which you will expand the shape of the tensor**
- [ ] Defines if the tensor is X or Y

### 5. A new loss function was introduced in this module, named after a famous statistician. What is it called?
- [ ] Hyatt loss
- [ ] Hawking loss
- [ ] Hubble loss
- [x] **Huber loss**

### 6. What's the primary difference between a simple RNN and an LSTM
- [ ] In addition to the H output, RNNs have a cell state that runs across all cells
- [ ] LSTMs have a single output, RNNs have multiple
- [ ] LSTMs have multiple outputs, RNNs have a single one
- [x] **In addition to the H output, LSTMs have a cell state that runs across all cells**

### 7. If you want to clear out all temporary variables that tensorflow might have from previous sessions, what code do you run?
- [ ] tf.keras.clear_session
- [x] **tf.keras.backend.clear_session()**
- [ ] tf.cache.clear_session
- [ ] tf.cache.backend.clear_session()

### 8. What happens if you define a neural network with these two layers?
**tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),<br>
tf.keras.layers.Bidirectional(tf.keras.layers.LSTM(32)),<br>
tf.keras.layers.Dense(1),**
- [x] **Your model will fail because you need return_sequences=True after the first LSTM layer**
- [ ] Your model will fail because you have the same number of cells in each LSTM
- [ ] Your model will compile and run correctly
- [ ] Your model will fail because you need return_sequences=True after each LSTM layer
