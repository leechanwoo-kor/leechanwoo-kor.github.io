---
title: "[Artificial Intelligence] Object Recognition"
categories:
  - Artificial Intelligence
tags:
  - Object Recognition
toc: true
toc_sticky: true
toc_label: "Object Recognition"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

- Two approach to pattern recognition : decision-theoretic, structural
  - Decision-theoretic : using quantitative descriptors
  - Structural : using qualitative descriptors
- Central to the theme of recognition is the concept of “learning”

<br>

# 1. Patterns and Pattern Classes

- Pattern : an arrangement of descriptors
- Feature is used to denote a descriptor
- Pattern class : a family of patterns that share some common properties
- Pattern recognition : assigning patterns to their respective classes
- Three common pattern arrangements used in practice are vectors, strings and trees

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/96abf346-243b-4cff-b227-a08429f09742">

<br>

- To recognize three types of iris flowers(iris setosa, virginica, versicolor)
- Each flower is described by two measurements(petal length, width)

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/64e5fbf4-eefe-4a4e-9b55-82f1a4bc1e94">

<br>

- The pattern vectors describing these flowers will vary not only between different classes but also within a class.
- Figure 12.1 shows length and width measurement
- Measurements of petal width and height adequately separated the class of Iris setosa from the other two but did not separate as successfully the virginica and versicolor types from each color.
- This result illustrates the classic feature selection problem

<br>

- Figure 12.2 shows another example.
- We are interested in different types of noisy shapes
- Describe each signature by its amplitude values θ
- Thus the form vectors, x1=r(θ1),…., xn=r(θn)
- Instead of using signature amplitudes, the first n statistical moments of a given signature and use these descriptors as components of each pattern vector.

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/10a789c6-cdcc-4e17-a13d-9487066619b3">

<br>

- String descriptions adequately generate patterns of objects
- other entities whose structure is based on relatively simple connectivity of primitives, usually associated with boundary shape.

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6a2772a3-c976-4134-8c2c-ef9db358af20">

<br>

- The more powerful approach for many applications is the use of tree descriptions.
- Most hierarchical ordering schemes lead to tree structures
- Fig.12.4 is a satellite image

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2072c17e-e682-497b-8041-2d055db330e4">

<br>

- The tree representation shown in Fig.12.5 was obtained by using the structural relationship “composed of”.
- The root of the tree represents the entire image
- The next level indicates that the image is composed of a downtown and residential area.

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7cb02810-1aef-4457-bfe2-c46bec6b73e4">

<br>



# 2. Recognition Based on Decision-Theoretic Methods

- Decision-theoretic approaches to recognition are based on the use of decision functions.
- Let $x = (x_1,x_2, \dots, x_n)^T$ represent an n-dimensional pattern vector. For $W$ pattern classes $w_1, w_2, \dots, w_w$, we want to find $W$ decision functions $d_1(x), d_2(x), \dots, d_W(x)$ with the property that if a pattern $x$ belongs to class, then
  - $d_i(x) > d_j(x), j=1,2,\dots,W; j \neq i$
- The decision boundary separating class $\omega_i$ and $omega_j$ is given by
  - $d_i(x) - d_j(x) = 0$

<br>

## 2.1 Matching

- Recognition techniques based on matching represent each class by a prototype pattern vector.
- An unknown pattern is assigned to the class to which it is closest in terms of a predefined metric.
- The simplest approach is minimum distance classifier.

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/184010de-edbe-480d-b2ec-c74b7b2443e1">

<br>

- Minimum Distance Classifier

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dc211a46-80a4-4c5f-93e8-21920e5dacf3">

<br>

Minimum distance classifier works well when the distance between means is large compared to the spread of each class with respect to its mean

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8e5e03c2-b6e1-45bc-8364-a4686135fd4f">

<br>

- Image correlation : basis of finding matches between template $w(x,y)$ and image $f(x,y)$
- Detection : matching between $f(x,y)$ and $w(x,y)$ is

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/57ec1859-6bb8-416c-bc26-b64efdcbe150">

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/28b16c9e-acff-4353-a31b-2f4a3e417f8a">

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/717cf5a5-55c5-4a11-83ec-f323165e915e">

<br>

### Expected Value(mean,평균)

- Expected value (Mean )
  - It is defined by (average age,20,21,22 with p=4/8, 3/8, 1/8)
    <img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/60455609-6720-4bae-ae86-51dae2eda456">
  - Let’s intuitively understand it
  - Consider that we toss a fair coin (p[head]=p[tail]=0.5) 103 times. How many times the head comes out approximately by intuition?

<br>

- Mean of Bernoulli R.V.
  - Find the expected value of Bernoulli r.v. $I_A$
    -  $S_X = {0,1}, p_I(0) = 1-p, p_I(1) = p$
    -  $E[I_A] = 0p_I(0) + 1p_I(1) = p$
- Three Coin Tosses
  - Let X be the number of heads in three tosses of a fair coin. Find E[X].
    - $S_X = {0,1,2,3}$
    - pmf : $p_X(0) = 1/8, p_X(1) = 3/8, p_X(2) = 3/8, p_X(3) = 1/8$
    - $E[X] = \sum^3_{k=0} kp_X(k) = 0(1/8)+1(3/8)+2(3/8)+3(1/8) = 1.5$
- Note
  - the mean of a Bernoulli r.v. is p, but its outcomes are either 0 or 1, not p

<br>

### Variance (분산)

– The expected value provides us with limited information
– For instance, r.v. X and r.v. Y are different, but the same mean value comes out.
– We are interested not only in the mean of a r.v., but also in the extent of the r.v.’s variation about its mean.
– The variance of r.v. X is defined by

<br>

<img width="609" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e545a711-2d0e-4bd5-ba31-5f47863c9ca9">

<br>

- Also, the standard deviation of X is

<br>

<img width="609" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4eea5630-f4c5-475a-aaef-e39c87d8455a">

<br>

<img width="342" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/54f23107-5462-4bbc-82a1-e9bf4e4ab101">

<br>

- Variance of a Bernoulli r.v.
– Find the variance of the Bernoulli r.v. $I_A$

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7b955aa6-2a83-4ef9-98ca-1b2d1de6f754">

<br>

## 2.1 Matching (Continue)

- Correlation : disadvantage of being sensitive to change in the amplitude of $f$ and $w$
- Correlation coefficient

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/53671e9c-2129-40bb-8023-d296a78b22ea">

<br>

- Correlation is seldom used in case when arbitary or unconstrained rotation is present.

<br>

- Fig.12.9 illustates the concepts just discussed. Fig.12.9(a) is $f(x,y)$ and Fig.12.9(b) is $w(x,y)$.
- The correlation coefficient is shown as an image in Fig.12.9(c)

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1c87d763-63a2-4924-9bb6-50926c8171ed">

<br>

## 2.2 Neural Networks

-The approaches discussed in proceeding sections are based on the use of sample patterns to estimate statistical parameters of each pattern class
- The minimum classifier is specified by mean vector
- The Bayes classifier for Gaussian population is specified by the mean vector and covariance matrix of each class
- The patterns used to estimate these parameters are called training patterns
- The set of patterns is called a training set
- The process by which a training set is used to obtain decision functions is called learning or training
- Performance of 2 approaches depend on how well the actual pattern populations satisfy the underlying statistical assumptions
- Statistical properties of pattern classes are unknown or cannot be estimated
- Decision theoretic problems are best handled by methods that yield decision functions directly via training

<br>

- We focus on decision functions of multiclass pattern recognition problems, independent of whether or not the classes are separable

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/24c1bdcb-2cde-4630-b8fc-d861b3b718b6">

<br>

- Basic architecture
  - Consists of layers of structurally identical nodes so that the output of every neuron in one layer feeds into the input of every neuron in the next layer
  - The number of nodes in the first layer, called layer A, in NA.
  - The number of nodes in the output layer, called layer Q, is NQ.
  - The network recognizes a pattern vector x as belonging to class wi if the ith output of the network is “high” while all other outputs are “low”.

<br>

- Hard-limiting activation function has been replaced by a soft-limiting “sigmoid” function.
- Differentiability along all paths of the neural network is required in the development of the training rule.
- The following sigmoid function has the necessary differentiability.

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/aafa7b4d-fe75-4be1-98ba-11eb0449f5f2">

<br>

- A neural network of the form shown in Fig.12.16 was trained to recognize the four shapes shown in Fig.12.18(a) as well as noisy version shown in Fig.12.18(b)
- Pattern vectors were generated by computing the normalized signature of the shapes.

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/575d09d4-b760-41b3-9510-db0e6af45a70">

<br>

- The resulting **48-dimensional vectors** were the inputs to the three-layer feedforward neural network shown in Fig.12.19.
- The number of nodes in the **first layer was chosen to be 48**
- The four nodes in the third layer correspond to the number of pattern classes
- The number of nodes in the **middle layer was heuristically specified as 26**
- All action functions were selected to satisfy Eq.(12.2-50) with θ0=1.
- The training process was divided into two parts.
  - **Noise-free samples** like the shapes shown in 12.18(a)
  - **Noise sample** shown in 12.18(b)

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ab9b13ba-c2e6-4b8d-a2bd-b6a8ab831ec6">

<br>

- Several noisy sets were generated for **training the system with noisy data and $R_t=0$ implies noise-free training.**
- Fig.12.20 shows the performance of the neural network as a function of noisy level

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c151d3f2-9564-43d6-abc8-c9c129f0cb86">

<br>

---

<br>

- Test set
  - Contour pixel in a noise free shape was assigned a probability V of retaining its original coordinate in the image plane.
  - R=1-V: probability of being randomly **assigned to coordinates of one of its eight neighboring pixels.**
  - R=0.1,0.2,0.3,0.4,0.5,0.6
  - For each R, **100 noisy patterns of each class** are generated -> total of 400 patterns

<br>

- Training set
  - **10 samples for each class(N)** using Rt=0.
  - After learning, tested with 6 test sets. (FIG.12.20)
  - **Probability of misclassification**: The number of misclassified patterns divided by the total number of patterns tested.
  - Starting with the weight vectors learned by using the data generated with Rt=0, **system was retrained with a noisy data set of $R_t=0.1$**
  - The probability of misclassifying patterns from the test set **decreased as the value of $R_t$ increased.**

<br>

- Exception in Fig.12.20 is the result for Rt=0.4
- Small number of samples used to train the system.
- Fig.12.21 shows a lower probability of misclassification as the number of training samples was increased.

<br>

- Fig.12.21 shows the improvement in performance for $R_t=0.4$ by **increasing the number of training samples.**
- Fig.12.21 also shows as a reference the curve for $R_t=0.3$ from Fig.12.20.

<br>

<img width="955" alt="image" src="https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4c3f83a0-c194-439f-b9bb-cb7e989f8c9b">

<br>

