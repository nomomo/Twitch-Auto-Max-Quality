# Twitch-Auto-Max-Quality

- Always start playing live video with source quality on twitch.tv.
- Prevent automatic change of video quality when tab is disabled.

## Install

### STEP 1. ScriptManager

- Firefox - [Tampermonkey](https://addons.mozilla.org/ko/firefox/addon/tampermonkey/)
- Chrome - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Opera - [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)
- Safari - [Tampermonkey](https://safari.tampermonkey.net/tampermonkey.safariextz)
- Edge - [Tampermonkey](https://www.microsoft.com/store/p/tampermonkey/9nblggh5162s)

This script may not work properly on script managers other than Tampermonkey.

### STEP 2. UserScript

- [Install](https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js) from [https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js](https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js)

## Bug report

nomotg@gmail.com

## Change log

### 0.1.0 (2021-08-04)

- New feature added: "Only source quality method"
  - Removes all other selectable video quality except source quality. So even if the Twitch player sets the video quality to "Auto", the only selectable "Source quality" is set.
  - When this option is enabled, Localstorage modify method and Simulate settings button method are automatically disabled.
  - Caution: Enabling this option may conflict with other scripts (eg TwitchAdSolution.), causing problems with video playback or the scripts not working properly. Of course, it might work just fine. If you run into problems, setting the \"Position\" to 1 or the last one in \"Settings\" tab of the script settings menu may solve the problem. If that doesn't work, turn this option off.

### 0.0.9 (2021-06-07)

- Fixes an issue where the script unintentionally works on some clip pages.

### 0.0.8 (2021-06-05)

- Now again "Simulate settings button method" works fine.
- You can now set your preferred video quality. (set it in the settings menu)
- Removed "Regacy mode" of "Simulate settings button method"

### 0.0.7 (2021-03-10)

- Removed 'Automatic restart on error' that did not work properly.
- Fixed jquery https related problem. (Thanks sowind)
- Added 'Set the volume when stream starts'. (enable it in the settings menu)

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
