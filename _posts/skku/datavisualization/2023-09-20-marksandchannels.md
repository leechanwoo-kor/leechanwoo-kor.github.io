---
title: "[Data Visualization] Marks and Channels"
categories:
  - Data Visualization
tags:
  - Marks and Channels
toc: true
toc_sticky: true
toc_label: "Marks and Channels"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# Marks and Channels

- Complex visual encodings can be broken down into two components: **marks** and **channels**
- **Marks** are basic geometric elements that depict items or links.
  - points, lines, areas, …
- **Channels** control the appearance of marks to convey data.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c36bfacd-d68f-4721-82fa-0048020e8630)

<br>

## Marks

- A mark is a basic graphical element in an image.
- Marks can be classified according to the number of spatial dimensions they require.
  - 0D: point
  - 1D: line
  - 2D: area
  - 3D: volume (not frequently used)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9251a99e-dbe7-4686-ae4d-c74817a1d1d9)

<br>

## Channels

- A visual channel is a way to control the appearance of marks.
- Independent to the dimensionality of geometric primitives!

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/21aedfe6-5e25-40fd-970d-5502594ed706)

<br>

# Marks and Channels

- You can use multiple visual channels to encode more data.
  - x, y, size, color, shape, motion, …
- However, the more you encode, the harder to interpret (less effective)
- You can use two or more channels to encode the same thing!
  - Redundant encoding
  - The attributes redundantly encoded will be easily perceived.
 
<br>

# Redundant Encoding

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7e71978f-7661-410e-93ac-98577ea29df9)

<br>

# Interaction between Marks and Channels

- A point mark only conveys position (x and y), so you can encode data to its size (width and height).
- A line mark only conveys position and length, so you can encode data only to its width (thickness) not its height (= length, already taken!).
- An area mark is fully constrained, so you cannot encode data to width or height.
  - Exception: Cartograms
  - They carefully alter the boundaries so that the borders remain contiguous and each area’s shape is preserved as much as possible.

<br>

## Cartograms

- Cartograms intentionally distort geographical areas to encode data.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4c70d278-007b-4703-8e92-d6f4027ab2e1)

<br>

# Channel Types

- **Magnitude channels** tell us how much of something there is.
  - Good for encoding ordered data (Q, O)
- **Identity channels** tell us information about what something is or where it is.
  - Good for encoding categorical data (N, sometimes O)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e2708d3f-bab0-44e0-a2e5-b397d8a0e3d6)

# Mark Types

- So far, we have focused on table datasets where a mark always represents an item (a row in a table dataset or a node in a graph dataset).
- However, marks can be used to represent a link between two nodes in a graph dataset.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f22d3d15-22f7-4d39-81cf-7720ad5596a8)

<br>

# Expressiveness and Effectiveness

- There are so many visual channels! How can I choose one for my vis?
- You need to consider **expressiveness** and **effectiveness** Data

<br>

- **Expressiveness principle**: the visual encoding should express all of, and only, the information in the dataset attributes.
  - No less and no more
  - e.g., ordered data should be shown in a way that our perceptual system intrinsically senses as ordered.
  - Beginners tend to encode more data.
- **Effective principle**: the importance of the attribute should match the **salience** of the channel, i.e., noticeability.
  - Allocate more effective channels for more important attributes

**Example**

- Any issues in terms of expressiveness and effectiveness?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7aa6c2ca-8ba8-4c20-af14-1615727ee93a)

<br>

# Measuring Channel Effectiveness

- How can we measure the effectiveness of visual channels?
- There can be many criteria…
  - Accuracy (how accurately can humans read the true value from a representation?)
  - Discriminability (how many different values can be encoded in a discriminable way?)
  - Separability (with what other channels can a channel be used together?)
  - The ability to provide visual popout
  - The ability to provide perceptual groupings

<br>

## Accuracy

- The obvious way to quantify effectiveness is accuracy
- How close is human perceptual judgement to some objective measurement of the stimulus?
- Humans perceive different visual channels with different levels of accuracy.
- It is known that our responses to the sensory experience of magnitude are characterizable by power laws.

<br>

#### Stevens’s Power Law

$S = I^n$

- S: the perceived sensation
- I: the physical intensity
- If n = 1, the perceived sensation is exactly proportional to the physical intensity (most accurate).
- If n > 1, the sensation is magnified, and if n < 1, the sensation is compressed.

<br>

- A channel with n close to 1 can be considered effective.
- Length has an exponent of 1.0 (the most accurate).
- The other visual channels are not perceived as accurately.
- Area and brightness are compressed.
- Red gray saturation is magnified.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c353e169-db1f-460f-a5b6-ccb948d2092a)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ed2d12ac-d607-4c96-943e-1d0f815e8c4d)

<br>

- Which channel is more effective?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/30db6dc4-1a1e-4a50-8976-4483262ac282)

<br>

### Effectiveness Ranks

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/eea86d51-0342-4116-a1d4-e8ba83b18b83)

<br>

### Results from Controlled Experiments

- Task: proportionality estimation
- Estimate what percentage the smaller value was of the larger
- T1-T3: position on common scale
- T4-T5: length

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8c989b62-98ac-42ae-9afd-bf579f80c70f)

<br>

### Effectiveness Ranks by Data Type

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/301acd59-d627-4d82-a335-8595d959ed69)

<br>

## Discriminability

- If you encode data using a particular visual channel, are the differences between items perceptible to the human as intended?
- Quantify the number of **bins** that are available for a visual channel, where each bin is a distinguishable step or level from the other.

<br>

- How many different linewidths can you see?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4833c1ac-278c-46d2-a3e6-1fda7b0e999f)

<br>

- How many different levels of lightness can you see?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/33a0ebf0-f16e-4cbe-a757-ac5b283973b4)

<br>

- How many different levels of lightness can you see?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/407d6add-52e1-4102-88e3-07e15ca3fb13)

<br>

- How many different hues can you see?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9a55a987-d75d-4055-a58d-79c7f4db311a)

<br>

## Separability

- Some channels have interactions with other channels!
- Be careful when you use more than two channels at once.
- How accurately can people access information encoded by each channel?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b36b8c66-06b2-40e7-8f78-a35534665202)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bbf86f95-0323-47eb-81c9-25c4c423e7ba)

<br>

- The important idea is to match the characteristics of the channels to the information that is encoded.
- If the goal is to show the user two different data attributes, you need to use separable channels (e.g., position + hue)

<br>

## Visual Popout

- Another important aspect for measuring effectiveness of a channel is whether it provides visual popout
- Sometimes, called preattentive processing or tunable detection
- For some visual channels, our low level visual system can process the information in a massively parallel manner.
  - Even without the need for the viewer to consciously directly attention to items one by one (preattentive).
  - Less than 200-250 ms
  - Involves only information available in a single glance

<br>

- How many ‘3’s?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/08f564b9-f8bf-4eca-994c-2086651d392e)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ec196083-de7f-4226-b3b6-df5826833e19)

<br>

- Find a red dot!

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/51e51181-6b68-4dd9-b601-9db649b4b719)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/387709ae-6093-4e04-9e6e-a7e369f18972)

<br>

- It is hard when there are many distractors!
  - We do perform serial search

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/829d9a1b-f311-4b4d-9e01-a79564ff829e)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/96a044aa-7f2f-4a5d-8834-de7b40f5f26a)

<br>

- Popout happens for a single visual channel!
- Most pairs of channels do not support popout , but a few pairs
  - Space + Color
  - Motion + Shape
- Popout is not possible for three or more channels.

<br>

### Preattentive Channels

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f59ad012-3b3e-42f9-a52d-b0097569951c)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/852724f3-dfae-4526-88b3-7a25fd6987f6)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/37f90db1-9680-4b1a-940b-1b2cb7a14a3b)

<br>

## Grouping

- The last criterion is whether a channel supports perceptual grouping.
- The easiest way to show visual elements as groups is just to connect the elements!
- However, it is possible without using extra lines…

<br>

- Gestalt laws tell how humans naturally perceive objects as organized patterns and objects.

<br>

- Proximity: Things that are close together are perceptually grouped together.
- Similarity: Similar objects are perceptually grouped
- Connectedness: Connected objects are perceptually grouped
- Continuity
- Symmetry: Symmetric objects are perceptually grouped together.

<br>

### Proximity

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9bcfa0ee-6617-462a-a558-d601f23e0c83)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/57f5cd47-dddd-44a0-a79b-f9d152f0eb01)

<br>

### Similarity

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c8dc9255-38e8-4abb-a32a-7c3ce50c82ee)

<br>

#### Connectedness

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bd39da9c-d9e0-4188-9a6e-18b189141e89)

<br>

#### Continuity

- Humans are more likely to construct visual entities out of visual elements that are smooth and continuous, rather than nes that contain abrupt changes in direction.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0a0a9135-c4d9-4142-8b33-51f4db7a509a)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0d34eb8a-0747-4aa3-8ecd-b29350777775)

<br>

#### Symmetry

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f7016fbc-6e27-45cb-81f4-9f198d24fb36)

<br>

# Relative versus Absolute Judgements

- The human perceptual system is fundamentally based on relative judgements.
  - the amount of length difference we can detect is a percentage of the object’s length.
- Weber’s Law
 
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7b35ce18-1525-4bab-9bf9-cb8d1ff17f11)

- I is a stimulus intensity.
- 𝐾 is a fixed percentage.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/b55c2e0c-d2ca-437a-86fe-4ec15001d725)

<br>

# Summary : Marks and Channels

- **Marks** are basic geometric elements that depict items or links.
  - Points, lines, areas, …
- **Channels** control the appearance of marks to convey data.
  - Position, color (hue, luminance, saturation), size, shape, tilt, motion, …
- Expressiveness and effectiveness
- Channels can be ranked according to their effectiveness.
  - Accuracy, discriminability, separability, popout , and grouping
  - Visual popout or preattentive processing
- Humans are good at relative judgements.
