---
title: "[Artificial Intelligence] Introduction to Aritificial Intelligence"
categories:
  - Artificial Intelligence
tags:
  - Artificial Intelligence
  - Turing Test
  - Neural Network
toc: true
toc_sticky: true
toc_label: "Introduction to Aritificial Intelligence"
toc_icon: "sticky-note"
---

![image](https://user-images.githubusercontent.com/55765292/222048422-de682065-987e-4da1-8f63-8dc25552fa27.png)

<br>

# Introduction to Aritificial Intelligence

> "Artificial Intelligence is concerned with intelligent behavior in artifacts. Intelligent behavior involves perception, reasoning, learning, communication, and acting in complex environments." *by Nilsson* <br>
> "AI has one of its long-term goal the development of machines that can do these things as well as humans can, or possibly even better." *by Nilsson* <br>

<br>

## The Turing Test

![image](https://user-images.githubusercontent.com/55765292/222048778-d66d2d48-4528-4e5b-beab-e80d2fca4e7c.png)

> "Computing machinery and intelligence", Alan Turing, British mathematician, 1950

- Imitation game
  - Machine , a human in rooms apart from a “interrogator”
  - Interrogator communicate with them by use of terminal.
  - Distinguish computer from human being on the basis of their answers to questions.
  - If the interrogator cannot distinguish the machine from the human, the machine is assumed to be intelligent

---

- The 65-year-old [Turing Test](http://www.bbc.co.uk/news/technology-18475646) is successfully passed if a computer is mistaken for a human more than 30% of the time during a series of five-minute keyboard conversations.
- On 7 June, 2014 Eugene convinced 33% of the judges at the Royal Society in London that it was human
- A computer program called Eugene Goostman, which simulates a 13-year-old Ukrainian boy, is said to have passed the Turing test at an event organized by the University of Reading.
- Ex) How mutch wood ewe pay 4 a pear of shews?

<br>

### Eugene Goostman

![image](https://user-images.githubusercontent.com/55765292/222049322-e4202b2d-225c-4813-9fd4-65ccab5ebade.png)

**Ray Kurzweil conversation with Eugene Goostman**

```
Question > How old are you?
Eugene: I’m a little boy. 13 years old.
Question > How much is two plus two?
Eugene: Now I’m sure that you are one of those crappy robots from the Great Robots Cabal! And I know your password: 2 + 2=4.0! Now divide by zero and die!!!!
Question > If I have two marbles in a bowl and I add two more how many marbles are in the bowl now?
Eugene: Not too many. But I can’t tell you the exact number, I forgot it. If I’m not mistaken –you still didn’t tell me where you live. OR it’s a secret?:-)
Question > I live in the capital of the United States. Do you know where that is?
Eugene: Every nerd knows that the capital of The United States is Washington.
Question > I live in the capital of the country that put a man on the moon.
Eugene: Well, if you want it, the capital of The United States is Washington.
Question > I live in the capital of the country that built the great wall.
Eugene > Tell me more about Capital. I like to learn about different places!
```

<br>

## Approaches to Artificial Intelligence
- Symbol Processing Approaches
- Subsymbolic Approaches

<br>

### Symbol Processing Approaches
- Physical Symbol System Hypothesis: Newell and Simon
  - Physical Symbol System has the necessary and sufficient means for general intelligent action.
- Physical Symbol System: machine capable of manipulating symbolic data-adding numbers, rearranging lists of symbols, replacing some symbols of others.
- Declarative knowledge base(first order logic)
- Logical operations(logical reasoning to deduce consequences of knowledge)
- Real Problem -requires substantial knowledge of the domain -called a Knowledge based approach.
- LISt oriented Programming language(LISP)

<br>

### Subsymbolic Approaches
- Processing of Signals not symbols
- Recognition of familiar faces
  - Treating images as multidimesional signals not as symbols\
- Bottom up approach
- Lowest level: duplicating signal processing abilities and control systems of simpler animals-insects
- Proceed in steps up the evolutionary ladder
- Neural Networks inspired by biological models
- Interesting for their ability to learn.
- Interconnected Networks of Simple Units => **(connectionism)**

<br>

## Neural Network

- Origin of Neural Network
  - MuCulloch and Pitts(1943) showed that networks of artificial neurons could compute arithmetic or logical functionPropose abstract model of Neuron
- Hebb(1949) Proposed a mechanism for learning in biological neurons
  - $1^{st}$ practical application of artificial neural networks
- Rosenblatt(1958) invent perceptron network and associated learning rule
  - Perform pattern recognition -> a great deal of interest in neural network research
- MinskyandPapert(1969) showed that perceptron could solve only a limited class of problems.
  - for a decade neural network research was suspended.
  - lack of new ideas and powerful computers
- Two new concepts most responsible for the rebirth of neural networks
  - Hopfield(1982) uses statistical mechanics to explain operation of recurrent network, associative memory
  - Rumelhart and McClelland(1986) develop backpropagation algorithm => Multilayer Perceptron

<br>

## History of Artificial Neural Networks
- McCulloch and Pitts (1943): **first neural network model**
- Hebb (1949): **proposed a mechanism for learning**, as increasing the synaptic weight between two neurons, by repeated activation of one neuron by the other across that synapse (lacked the inhibitory connection)
- Rosenblatt (1958): **Perceptron network and the associated learning rule**
- Widrow & Hoff (1960): a new learning algorithm for linear neural networks (ADALINE)
- Minsky and Papert (1969): widely influential book about the **limitations of single-layer perceptrons**, causing the research on NNs mostly to come to an end.
- Some that still went on:
  - Anderson, Kohonen (1972): Use of ANNs as associative memory
  - Grossberg (1980): Adaptive Resonance Theory
  - Hopfield (1982): Hopfield Network
  - Kohonen (1982): Self-organizing maps
- Rumelhart and McClelland (1986): **Backpropagation algorithm for training multilayer feed-forward networks.** Started a resurgence on NN research again.
- SVM(Support Vector machine)
- DeepLearning
