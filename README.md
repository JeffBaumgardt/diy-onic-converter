# diy-onic-converter
Coding challenge to make your own (DIY) “bionic reading converter.”

Start by reading the challenge instructions in [INTERVIEW.md](./INTERVIEW.md). When you are finished, you can edit this file to include any documentation for your work.

_or…_

**Sta**rt **b**y **read**ing **th**e **challen**ge **instructio**ns **i**n **[INTERVIEW.](./INTERVIEW.md)**[md](./INTERVIEW.md). **Whe**n **yo**u **ar**e **finish**ed, **yo**u **ca**n **edi**t **thi**s **fil**e **t**o **inclu**de **an**y **documentat**ion **fo**r **you**r **wor**k.


# Implementation
The code found in `/public/diy-onic-converter.js` can be copied, in whole, to the clipboard. 

Then on any site open the dev tools, normally F12 on the keybroad, or Ctrl + Shift + i, and locate the 'console' tab. Paste the copied code.

The output should be exactly what you just entered. Because we added the method `diyOnicConverter` to the window object, you may now type in, `diyOnicConverter('body')` and hit enter. This should execute the code.

Note `body` here is the CSS selector of which you are quering from. Body is going to be the most primitive as this is the entire website, that's visible. However, you can use a more complex selector to only execute the bionic converter on a more restricted paragraph. For example `diyOnicConverter('div#main')`.

