## Week 4 Quiz - Real-world time series data

### 1. How do you add a 1 dimensional convolution to your model for predicting time series data?
- [ ] Use a 1DConv layer type
- [ ] Use a ConvolutionD1 layer type
- [x] **Use a Conv1D layer type**
- [ ] Use a 1DConvolution layer type

### 2. What's the input shape for a univariate time series to a Conv1D?
- [x] **[None, 1]**
- [ ] []
- [ ] [1]
- [ ] [1, None]

### 3. You used a sunspots dataset that was stored in CSV. What's the name of the Python library used read CSVs?
- [x] **CSV**
- [ ] PyFiles
- [ ] PyCSV
- [ ] CommaSeparatedValues

### 4. If your CSV file has a header that you don't want to read into your dataset, what do you execute before interating through the file using a 'reader' object?
- [ ] reader.ignore_header()
- [ ] reader.read(next)
- [x] **next(reader)**
- [ ] reader.next

### 5. When you read a row from a reader and want to cast column 2 to another data type, for example, a float, what's the correct syntax?
- [x] **float(row[2])**
- [ ] You can't. It needs to be read into a buffer and a new float instantiated from the buffer
- [ ] Convert.toFloat(row[2])
- [ ] float f = row[2].read()

### 6. What was the sunspot seasonality?
- [ ] 4 times a year
- [x] **11 or 22 yaers depending on who you ask**
- [ ] 22 years
- [ ] 11 years

### 7. After studying this course, what neural network type do you think is best for predicting time series like our sunspots dataset?
- [ ] Convolutions
- [ ] RNN/LSTM
- [x] **A combination of all other answers**
- [ ] DNN

### 8. Why is MAE a good analytic for measuring accuracy of predictions for time series?
- [ ] It punishes larger errors
- [ ] It only counts positive errors
- [ ] It biases towards small errors
- [x] It doesn't heavily punish larger error like square errors do
