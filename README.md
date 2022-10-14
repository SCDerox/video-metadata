# get-video-metadata

<p align="center"><a href="https://nodei.co/npm/get-video-metadata/"><img alt="npm package stats" src="https://nodei.co/npm/get-video-metadata.png"></a></p>
<p align="center"><a href="https://github.com/scderox/video-metadata?sponsor=1">&hearts; Sponsor</a> or <a href="https://github.com/SCDerox/video-metadata">★ Star</a></p>

This library uses [ffprobe](https://ffmpeg.org/ffprobe.html)-CLI-Tool to extract data (fps, aspect-ratio, size, duration,
…) from any video on your hard drive.

## Installation

1. Install [ffmpeg](https://ffmpeg.org/download.html) (we only need ffprobe, ffprobe is included in ffmpeg). The library
   will use the CMD-Library by default, unless the `FFPROBE_EXEC` environment variable is specified.
2. Install get-video-metadata from NPM: `npm i --save get-video-metadata`
3. Enjoy 🎉

## Usage

```javascript
import getVideoMetadata from "get-video-metadata";

getVideoMetadata('./test.mp4').then(console.log)
/* Output: 
{
  codec: {
    name: 'h264',
    longName: 'H.264 / AVC / MPEG-4 AVC / MPEG-4 part 10',
    type: 'video'
  },
  aspectRatio: '16:9',
  width: '1280',
  height: '720',
  frameRate: 30,
  bitRate: '2477866',
  duration: '10.933333'
}
*/
```

Note: This also work with image files, but this library was designed for videos. Please also note that `code.type` will
always be "video", as this is the way we are telling ffprobe to parse the video.

## Issues & Contributing

Feel free to create issues / raise PRs in the [repository](https://github.com/SCDerox/video-metadata).

## License

This program is free software. It comes without any warranty, to the extent permitted by applicable law. You can
redistribute it and/or modify it under the terms of the Do What The Fuck You Want To Public License, Version 2, as
published by Sam Hocevar. See http://www.wtfpl.net/ for more details.