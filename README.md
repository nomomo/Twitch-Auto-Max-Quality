# Twitch-Auto-Max-Quality

- Always start playing live video with source quality on twitch.tv.
- Prevent automatic change of video quality when tab is disabled.

## Install

#### STEP 1. ScriptManager

- Firefox - [Tampermonkey](https://addons.mozilla.org/ko/firefox/addon/tampermonkey/)
- Chrome - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=ko)
- Opera - [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)
- Safari - [Tampermonkey](https://safari.tampermonkey.net/tampermonkey.safariextz)
- Edge - [Tampermonkey](https://www.microsoft.com/store/p/tampermonkey/9nblggh5162s)
  
#### STEP 2. UserScript

- [Install](https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js) from https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js

## Bug report

nomotg@gmail.com

## Change log

### 0.0.6 (2020-10-29)

- It works better for cases where there is only one video quality.
- User can set initial delay for automatic quality change. If the problem occurs because the script changes the video quality too quickly, increase the delay.

### 0.0.5 (2020-05-31)

- In May 2020, the structure of the Twitch player inserted as an iframe seems to have changed. So I modified the code so that the script works properly again in the Twitch player inserted as an iframe. However, there may be users who still use the old Twitch Player(idk). If 'Simulate settings button method' does not work properly, try turning on "regacy mode" in the settings menu.

### 0.0.4 (2019-11-15)

- Occasionally, video quality is fixed at 720p when watching live with the embed player. In this case, the script will automatically pause the video and try to play again quickly.

### 0.0.3 (2019-10-23)

- This script will be disabled when users watch squad streaming. (This script does not currently support squad streaming page)
- Initial delay (500 ms) is applied when the video quality setting menu is clicked virtually. This will prevent the problem caused by trying to change the video quality too quickly.

### 0.0.2 (2019-10-17)

- Modified to apply to the new layout of the Twitch.

### 0.0.1 (2019-10-07)

- Initial commit
