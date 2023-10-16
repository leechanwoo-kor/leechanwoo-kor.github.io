---
title: "[Data Visualization] Colors (Perception)"
categories:
  - Data Visualization
tags:
  - Colors
  - Perception
toc: true
toc_sticky: true
toc_label: "Colors (Perception)"
toc_icon: "sticky-note"
---

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/159c74c5-0bd2-45f3-939a-f150d8fe4cd8)

<br>

# Why Color?

- Why is color in vis important?
  - Supports preattentive processing
  - High accuracy for visualizing ordinal or nominal data
- Limitations
  - Relative perception (color constancy, background is important!)
  - Color deficiency: color blindness (색맹) and color weakness (색약)
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6c79c4c0-73fe-4a95-9118-ad4e515f0b8e)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e9e83d82-bbad-4f63-be00-9608aaf3fb26)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4968481c-b868-4cd8-a9e3-49151a9157f1)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cf5cf58d-1574-4b24-a9de-5a8a9de44c95)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3b457f29-8061-4f4b-a21f-b397d0b9dd97)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/3503eef6-d251-4cb2-8e68-07591fe8a2b0)

<br>

# Color

- You can name each color easily, but there are complex things behind **color perception**
- Let’s start from physicists’ view.

<br>

## Light as Electromagnetic Wave

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9ad627a7-3033-4f72-b8ef-2292712ad55f)

<br>

- Light of a single frequency is perceived as monochromatic light (단색광).

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ce9f8a58-b386-4e49-a3f0-976e1482dbf2)

<br>

- Light in the real world is a mixture of lights with different frequencies!
  - Power spectrum of light
 
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/9cb84d08-9d8b-478d-ac06-f5dac931bc65)

<br>

### Color is not Wavelength

- There are colors that are not monochromatic.
  - Unsaturated colors such as magenta, gray, or white.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e478985a-e5c9-4fb5-89f0-41f7b16adc95)

<br>

## Human Eyes

- **Retina (망막)** receives light and converts the light into neural signals.
  - The signals are transmitted to the brain for visual recognition through the optic nerve.
- How to convert light to signals?
- Rod cells and cone cells!

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c549711d-79e7-4921-a8ce-5e0cddb576a7)

<br>

### Color Vision

- Two different kinds of receptors on the retina
- Rods (간상세포)
  - Active at low light settings
  - Low-resolution black and white information
  - 100 million rod receptors
  - 杆= 몽둥이, 막대 = rod
- **Co**nes ( 원추세포) for **Co**lor
  - Active at normal lighting conditions
  - Three types of cones (sensitive at a different wavelength)
  - 6 million cone receptors
  - Dense in the center of vision (fovea, 중심와)

<br>
 
- Cones are most dense at the center of vision or the fovea.
- So, color perception is most accurate at the fovea.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e9638b32-b2c1-4097-9067-f257c28fdf76)

<br>

### Three Types of Cone Cells

- There are three types of cone cells:
- **L**ong: most active at 580 nm (red, 63%)
- **M**iddle: most active at 540 nm (green, 31%)
- **Short: most active at 450 nm (blue, 6%)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/d5939abf-5584-437b-9c79-5aa0e5d65df5)

<br>

- S is much less sensitive!
  - We are not good at perceiving blue!
  - Do not show detailed information (e.g., text) in pure blue on a black background.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e0637564-75db-4dd3-a80d-433240f9622a)

<br>

## Trichromacy

- Trichromacy (삼색형색각): the spectrum of light is reduced as three values (**tristimulus** values , responses from S, M, and L)
  - i.e., retina encoding

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/e34ed60c-47b4-46c6-b57c-da2e5744108b)

<br>

### Effects of Retina Encoding

- Because the brain only processes the three dimensional tristimulus values of light, any spectra that create the same tristimulus response are indistinguishable.
  - i.e., **metamerism, 조건등색**
 
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/444966cf-24b4-4024-a4f8-81dc62e3504c)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/028d13d7-3376-4886-8495-ebe727da7cca)

<br>

# Color matching Experiments

- Are tristimulus values consistent over humans?
- In 1920s and 1930s, researchers conducted color matching experiments where an observer adjusts three primary lights to match each sample color.
- Who is an observer?
- There is no “representative” observer for humans.
- We will test a group of people, check if there is a consensus, and if there is, we will use the average of results.
  - i.e., standard observer

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/88a12191-495e-4295-bee8-d0a766fe9091)

<br>

- How to generate color to match and three primaries?
- We use single-wavelength colors.
- A prism and a slit to select a narrow band of wavelengths as desired.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4ca71d8d-2ecd-494e-b46f-331619f7e192)

<br>

- Three primaries:
- red, green, and blue (700 nm, 546 nm, and 435 nm)
- Target color: random color other than the three primaries.

<br>

- The result of a single trial is the three tristimulus values (or weights) that an observer used to match the colors.
- We call such three values ҧ 𝑟 𝜆 , ҧ 𝑔 𝜆 )), and ത 𝑏 𝜆

<br>

## Experimental Results

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/46bd67d9-c7ed-4d84-b6a3-9c00a475afb5)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f9ecc2e4-3155-4e71-aa53-1aa8b82a534b)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/cd9e8d30-a1df-4c17-bf44-022f0faf861d)

<br>

## Why Negative Values?

- Some colors cannot be matched by adjusting the three primaries.
- This doesn’t happen in the color space (or gamut ) of your
  - Your monitor will show a color by mixing three “monitor” primaries.
  - Therefore, all colors that your monitor shows can be factorized into the sum of three primaries with positive weights.
- In the experiment, we test all single wavelength lights, so it can happen!
  - We cannot subtract a primary with a negative weight below 0.
  - All we can do is just completely turning off a primary.

<br>

- “Negative primaries” can be simulated by adding a primary to the test light!

### rg Chromaticity Diagram

- Plot ҧ 𝑟 𝜆 and ҧ 𝑔 𝜆

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ce3dfe9c-3f76-46be-8d3f-d1799dd69b48)

<br>

### CIEXYZ Color Space

- The international standard for color specification (1931, by CIE or International Commission on Illumination)
  - Motivation: we want positive values for all human visible colors.
  - This wasn’t possible with RGB primaries. So, we define new virtual primaries, X , Y , and Z
- We will linearly transform ҧ 𝑟 𝜆 , ҧ 𝑔 𝜆 )), and ത 𝑏 𝜆

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/ff55e5ca-f693-4bcb-9b71-5dd2f0fd19fe)

<br>

- Finally, we get the xy chromaticity diagram.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6d6de57d-1535-4254-89e1-a34a1eaf2aff)

<br>

### CIE Chromaticity Diagram

- CIE chromaticity diagram encompasses all the perceivable colors in 2D space (x, y).
  - Where is pink light?
  - Where is black light?
 
<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/bbdc71cd-d97c-4fc6-b205-aa5e78d919d5)

<br>

# Gamut

- The gamut or color gamut is a set of colors that can be reproduced by mixing the given primaries.
  - sRGB is the RGB space that you use (sadly, it is quite small).
 
![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4dcb523d-1a0e-42dd-8171-fb4938aa89ed)

<br>

## RGB Color Space

- There are many RGB (red-green-blue) color spaces depending on how you choose the three primaries.\
- However, it is hard to imagine the actual color from the color code!
- sRGB(100, 150, 200)?

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/6faa50a1-ad50-452f-96ba-34679e5ca41d)

<br>

## HSL Color Space

- **HSL**(hue saturation lightness) color space
  - More intuitive
  - Used by artists and designers
- **Hue**: what color (red, blue, green,...)
- **Saturation**: the amount of white mixed with the pure color
  - Pink = Red + Some amount of White
  - How colorful
- **Lightness**: the amount of black mixed with a color
  - How bright

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/2f4509e7-0e5a-42a8-8ae1-7667ebb437e7)

<br>

- The HSL color space is more “interpretable” but it is pseudoperceptual
- It does not truly reflect how we perceive color.
- Especially, the lightness L is widely different from how we perceive luminance.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/26d1f56c-10d8-49d1-a8c9-7c525dd2deb6)

<br>

## The L*a*b* Color Space

- The L\*a\*b\* color space calibrates the limitation of HSL.
  - CIELab
  - Another CIE standard
- L*: perceptual lightness
  - L* = 0 for black L* = 100 for white
- a*: green red
- b*: blue yellow

<br>

- The L\*a\*b\* color space approximates the perceptual lightness.
  - Blue: RGB(0, 0, 255) --> Lab(32 , 79, 107)
  - Yellow: RGB(255, 255, 0) --> Lab(97 , 21, 94)
  - Blue looks darker than yellow since its L* is smaller (0 = black).

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/88ab472f-8268-40d8-b40c-ab1f4edfa973)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/c33c8713-69dd-4146-b619-b2513cf3d96f)

<br>

- a* and b* in L*a*b* represent the green red and blue yellow components.
- Why these two axes were chosen?
  - Why not green yellow and red blue?
- It is based on the opponent color model of human vision

<br>

### Opponent Process Theory

- Presented by German psychologist Ewald Hering late in 19th century.
- Supported by a variety of experimental evidence
- Colors are arranged perceptually as opponent pairs along three axes.
  - black-white (L*)
  - Green-red (a*)
  - yellow-blue (b*)

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/f3aeff82-059d-45c9-8dcd-00153f1479c0)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/488bce5e-23f2-4f69-a843-5f164d0abf8f)

<br>

**Spatial Sensitivity**

- The red-green and yellow-blue chromatic channels are capable of carrying only about one third the amount of detail arried by the black white channel.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/94c80237-4d1f-48c0-a821-47ec7c5edca9)

<br>

- The theory explains why there are “yellowish green” or “greenish blue” but no “reddish green” nor “yellowish blue”.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/da67db6a-c4a7-46cd-884d-257679001d8b)

<br>

- The theory also explains why there are primary color terms consistent across different cultures and languages (Berlin and Kay, 1969).
- The first six terms define the primary axes of the opponent color model!

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/a191e8df-06fc-4528-abe2-a535c0ff102b)

<br>

## Color Deficiency

- About 10% of male and about 1% of female have some form of color deficiency.
- Red-green color deficiency (적록색맹)
  - Protanopia(lack of L, 제1적록색맹) and Deuteranopia (lack of M, 제2적록색맹)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/56e5fa80-8357-4c16-aa8e-7d8b27507223)

<br>

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/4ff0373e-8ebc-4ae6-a74f-f69abde11c47)

<br>

- There are a lot of tools where you can check how your vis looks to people with color deficiency.

![image](https://github.com/leechanwoo-kor/leechanwoo-kor.github.io/assets/55765292/8e1293e6-3e21-4d81-b04c-7829c65059a4)

<br>

# Summary : Colors (Perception)

- Rods for black and white, Cones for color
- Three types of cones: S (blue), M (green), L (red)
- Metamerism
- Color-matching experiment with “a standard observer” and three primaries
  - Negative weights (for light whose wavelength is ~500 nm)
- CIEXYZ calibrates these negative weights and assigns positive weights XYZ to all human visible colors.
- CIELab models a perceptually uniform color space.
  - L: black-white, a: green-red, b: blue-yellow
- Opponent Process Theory and color deficiency
