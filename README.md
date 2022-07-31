# Twitch-Auto-Max-Quality

<!--
[![ko](https://img.shields.io/badge/lang-ko--kr-green.svg)](https://github.com/nomomo/Twitch-Auto-Max-Quality/blob/master/README.ko.md)
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/nomomo/Twitch-Auto-Max-Quality/blob/master/README.md)
-->

- Always start playing live video with source quality on twitch.tv.
- Prevent automatic change of video quality when tab is disabled.

## Install

### STEP 1. ScriptManager

- Firefox - [Tampermonkey](https://addons.mozilla.org/ko/firefox/addon/tampermonkey/)
- Chrome - [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- Opera - [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)
- Safari - [Tampermonkey](https://safari.tampermonkey.net/tampermonkey.safariextz)
- Edge - [Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

This script may not work properly on script managers other than Tampermonkey.

### STEP 2. UserScript

- [Install](https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js) from [https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js](https://raw.githubusercontent.com/nomomo/Twitch-Auto-Max-Quality/master/Twitch-Auto-Max-Quality.user.js)

## Bug report

nomotg@gmail.com

## Change log

### 0.3.2 (2022-07-31)

- Add regacy option to "Only source quality method"
  - Type regacy : Removes all other selectable video quality except source quality & show (source) text.
- Fixed an issue where the "Only source quality method" did not work on the VOD page.

### 0.3.1 (2022-07-30)

- Now, when using the "Only source quality method", the text "(source)" is no longer displayed in the quality name. Of course the video quality set by the script is the source quality, even if "(source)" is not displayed.
- Add options to "Only source quality method"
  - Type 0 : Removes all other selectable video quality except best quality
  - Type 1 : Overwrite all selectable video quality with best quality

### 0.2.2 (2022-03-23)

- "Disable power saving for inactive tabs" feature no longer works with embed Twitch clips to avoid conflicts with ad blocking extensions.

### 0.2.1 (2022-03-09)

- New TAMQ Labs feature: "Disable power saving for inactive tabs (Disable JavaScript Timer Throttling)"
  - If you often have problems playing videos in inactive tabs, try using this feature.
  - By enabling this option, you can disable some of the power saving features (Javascript Timer Throttling) for inactive tabs supported by Chrome-based browsers.
  - This feature may conflict with certain ad filters in the ad blocking extension.

### 0.2.0 (2022-03-04)

- Now "Only source quality method" works on the VOD page as well.
- New feature added: "Apply \'Only source quality method\' to the clip page"
- Removed "Use the Twitch EMBED API in an Iframe" and "Use for live video where url starts with blob" options.
- Korean language is supported in the settings menu. You can select English and Korean(한국어) from the setting menu.

### 0.1.2 (2021-09-15)

- Fixed an issue related to the timeline of VOD (Thanks MonkeyDMax92)

### 0.1.1 (2021-09-14)

- Fixed the script not working properly in Violentmonkey.
- Added exception handling.

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

## Happy??

<a href="https://www.buymeacoffee.com/nomomo" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="60"></a>
