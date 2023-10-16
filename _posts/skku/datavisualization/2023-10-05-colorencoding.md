title: "[Data Visualization] Colors (Encoding)"
categories:
  - Data Visualization
tags:
  - Colors
  - Encoding
toc: true
toc_sticky: true
toc_label: "Colors (Encoding)"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# Terminology

- There are three terms to describe the general concept of quantity of light:
- **Luminance**: the measured amount of (physical)
  - Can be measured by a photometer
  - SI unit: candela per square meter (cd/m^2) or nit
- **Brightness**: the perceived amount of light
- **Lightness**: perceived reflectance of a surface

<br>

## Brightness vs Lightness

- **Brightness** is used when we talk about things that are self-luminous.
  - “The sun is bright.”
  - “That lamp is dim.”
  - Sometimes, we say “bright colors” but it is not scientific from a vis point of view.
  - Don’t say “Your shirt is bright red.” (use vivid instead)
- Brightness is the perceived amount of luminance.
- So, it follows Stevens’s Power Law.
- 𝑃𝑒𝑟𝑐𝑒𝑖𝑣𝑒𝑑 𝐵𝑟𝑖𝑔ℎ𝑡𝑛𝑒𝑠𝑠 = 𝐿𝑢𝑚𝑖𝑛𝑎𝑛𝑐𝑒^𝑛

<br>

- Brightness is important when you realize your visualizations on monitors.
- Monitors are self-luminous.
  - e.g., you can adjust the brightness of your monitor.
- However, in this class, we will focus on color itself not its realization, so you will not see the term “brightness”.

<br>

- **Lightness** is important in vis. It is the perceived reflectance of a surface.
  - It involves a surface and reflectance on it.
- A white surface is light, but a black surface is dark
- Our eyes do not perceive the absolute amount of light.

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2b9ce95f-ef63-4497-85a9-e8fda81d4ffb)

<br>

## Lightness Constancy

- We have an ability to perceive the relative reflectance of objects despite changes in illumination.
  - This is called **color/lightness constancy**
- Very powerful. You can name the color of a thing in a very dim room.
- Color/Lightness perception is contextual.

<br>

- Sometimes, it is too strong…

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/29f734e5-b128-4321-9c55-47eee94d671a)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7f596268-35c6-4a89-92f2-209a8ff05734)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bdd37d07-ff11-4c3a-ae8b-2ec74fe680e9)

<br>

## Summary

- **Luminance**: physical property of a self luminous thing
- **Brightness**: perceived luminance (no surface, non linear, dim to bright)
- **Lightness**: perceived reflectance (surface, non linear, relative, dark to light)
- In the HSL color space, L means lightness not luminance.
- In the CIELAB color space, L* means lightness not luminance.

<br>

# Terminology

- In our textbook, VAD, the author used the terms **luminance , hue , and saturation** to describe color.
  - Here, luminance means the black and white visual channel not a physical property.
  - These terms are independent to any of the color spaces, such as RGB, HSL (L for lightness!), CIERGB, CIEXYZ, …
- But, when you realize color encoding, you must use at least one color space to represent your colors, such as RGB, so that your graphic devices can encode & decode colors.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/73c4da00-fc9d-4e66-8446-580cec7ceeec)

<br>

# Color Encoding

- The color channel can be used to visualize both categorical (nominal or ordinal) and quantitative data.
- Basic ideas:
- Hue for nominal data
- Luminance or saturation for ordinal or quantitative data

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/721fb970-aab1-41d2-8228-83f6f45428f4)

<br>

## Hue for Nominal

- The identity channel of hue is extremely effective for nominal data and showing groupings.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/33f65cc0-82ce-444a-afda-4e120016b2f8)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d1f3eb30-8fec-41c0-a854-9c709ba653c2)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/60caf08e-f7f6-429a-80b9-2f0c5c6664c4)

- Hue does not have an implicit perceptual ordering.
- Nominal data also do not have ordering.\
  - The characteristics of data and the visual channel agree! --> good encoding
- Sometimes, people do learn some conventions.
  - Red-orange-yellow-green-blue-indigo-violet for rainbow
  - Red-yellow-green for traffic lights
  - But these orderings are at a higher level than pure perception.

<br>

## Luminance/Saturation for Ordinal/Quantitative

- The magnitude channels of luminance and saturation for ordered data.
- **Luminance**
  - It is hard to perceive whether noncontiguous regions have the same luminance because of contrast effects.
  - Use less than five bins when the background is not uniform.
- **Saturation**
  - The number of discriminable steps for saturation is low (~ 3 bins)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f654ad0b-807d-4fe4-b826-ce7cfb02b409)

<br>

# Transparency

- **Transparency** is the fourth channel for describing colors, e.g., rgb**a**
- Encoding data to opacity is not a good idea because it strongly interacts with luminance and saturation.
- This channel is used most often with superimposed layers with redundant encoding.

<br>

# Colormaps

- A colormap maps data values to colors.
  - a.k.a. color ramp
- Two types:
  - Categorical (= nominal)
    - Binary: when there are only two categorical values
  - Ordered
    - Sequential: from minimum to maximum
    - Diverging: two hues at the endpoints and a neutral color as a mid point

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/02e19f5e-5dd0-4c84-9aa8-6e7bb30741f0)

<br>

- These colormaps are all discrete (or segmented) colormaps.
  - cf. continuous colormaps
 
<br>

- There are only two categories in binary colormaps
- No need for using hue. Leave it for other data attributes.
 
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d1a4330f-d149-4f19-9109-bbdb3276e257)

- Categorical colormaps: if there are more than two categories, we need to use the hue channel!
- Use distinguishable hues!

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0819f48c-d0cc-4a4f-a653-7bb4daaa7074)

<br>

- If there is a neutral value in data, use diverging colormap
- Usually, encode the neutral value to less distinct colors (e.g., gray) and use a different hue for each side.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2411e65c-edc8-42e4-b946-df6cacc6c62f)

<br>

- For sequential data, use sequential colormaps.
- The luminance channel is effective for ordered data.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0df11195-a2cf-491f-a3b0-952e36362f83)

<br>

- Bivariate colormaps encode two different attributes at the same time.
- But, it can be difficult to interpret when both attributes have multiple levels.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/86fcd8e1-66ab-4e25-af7f-e0ba2720752c)

<br>

**Bivariate Colormap Example**

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4e05ec92-c7f2-4581-b588-6c87eae1e56e)

<br>

# Categorical Colormaps

- Categories to colors (usually with hue)
- The number of discriminable colors for coding small separated regions is limited to between **six and twelve bins**
- For memorability, use easily nameable colors.
  - 4 categories: red, blue, green and yellow
  - +6 categories: orange, brown, pink, magenta, purple, and cyan
 
<br>

- There are important issues when designing categorical colormaps.
- Consider luminance
  - It is not a good idea to use yellow against a white background (less luminance contrast, hard to read)
- Consider mark type
  - Colors for small regions should be highly saturated, but larger regions such as areas should have low saturation.
- Consider color deficiency
- Consider printing (black and white)

<br>

- Saturation vs Size Data

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/1ccae7dc-3bbf-4e05-868f-219c3d22f1ed)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2f075342-fd50-409c-b47f-eef4bafdbfc2)

<br>

- 21 categorical colors are too many!
- On the right, we can only see colors as groups (e.g., green areas).
- Alternatives? data transformations or using other channels together

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e9e5ea3b-c55b-4d1c-946b-7e9abb13feb4)

## Useful Resources

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f76026e4-d454-4c29-9a8f-8a266bfe1da1)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5c2f1c5e-886a-480a-917b-dbe555babbf8)

<br>

# Ordered Colormaps

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4058f66c-bd2c-4deb-bdb2-4be99a54f635)

- Ordered colormaps
  - Sequential
  - Diverging
- Sequential colormaps range from a minimum value to a maximum value.
- Diverging colormaps map a midpoint to an off white color and two ends to two fully saturated colors with different hues.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/34eddde4-5277-4690-8192-cdb8a9064ab2)

<br>

## Rainbow Colormaps are Bad!

- Many visualizations in the real world adopt rainbow colormaps for sequential data, but it is considered a (very) bad practice.
- Advantages:
  - Vis seems colorful (?).
  - Areas are easily nameable, e.g., “see blue areas.” Data
 
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/15e368b8-34eb-41a0-b8b4-42189aa323cd)

<br>

- Disadvantages:
  - Hue is used to indicate order, but there is no implicit ordering between hues!
  - The scale is not perceptually linear.
    - Some colors, such as yellow and sky-blue, seem lighter than others.
  - The detail cannot be perceived with the hue channel.
    - Remember, most details should be conveyed by the luminance channel.
    - Luminance contrast is required for edge detection in the human eye.
   
<br>

- If you want to reveal large scale structure, use only two hues and change the saturation (i.e., diverging colormaps).

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/7f80a730-60b9-417d-a46a-ceccdb047604)

<br>

- If you want to reveal fine structure, use a multiple hue continuous colormap with monotonically increasing luminance.
  - + categorization becomes easier!
   
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/5d353632-fb4c-4bc7-a17c-87f850f08059)

<br>

- If you really want to use rainbow colormaps, use perceptually linear alternatives.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/163c44bc-5d84-4707-b99c-19621b628510)

<br>

### Rainbow Alternatives

- Colorful, perceptually uniform, colorblind safe, monotonically increasing luminance

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c59696e9-c94a-44ca-9753-111369cac80d)

<br>

## Cultural Bias

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/dddce930-727c-4de6-b99f-ec584f106dad)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/301ebab1-89b3-46aa-bc4e-3c7bac7502f7)

<br>

# Summary: Colors (Encoding)

- **Luminance**: physical intensity of light per area
- **Brightness**: perceptual luminance
- **Lightness**: perceptual reflectance (needs a surface)
- Use the hue channel for identity or categorical data.
- Use the luminance and saturation channels for magnitude or quantitative data.
- Rainbow is bad!
  - Perceptually non linear, hue is not for quantitative data, no ordering

<br>

- For categorical colormaps, use:

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f332af92-11b4-445b-937c-7b39b6b01719)

<br>

- For sequential colormaps, use:

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f0826d9c-f5a1-4c13-8d33-b2cf563d01a5)

<br>

- For divierging colormaps, use:

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/0a29a6f1-1f61-4a61-91e6-265400d1e2d6)

<br>

- Colorful, perceptually uniform, colorblind safe, monotonically increasing luminance

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c85ff7ec-b931-49ef-894a-7abb14e35884)
















