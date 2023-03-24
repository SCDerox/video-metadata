import {child_process} from 'mz';
import * as process from "process";

/**
 * This contains information about the encoding of the video file
 */
interface CodecType {
    name?: string,
    type?: 'video',
    longName?: string
}

/**
 * This represents the extracted data from a video-file
 */
interface VideoMetadata {
    codec: CodecType,
    width?: number,
    height?: number,
    aspectRatio?: string,
    frameRate?: number,
    bitRate?: number
    duration?: number
}

/**
 * Returns the Video-MetaData of a local file
 * @param {String} videoFile Path to local file
 * @throws {Error} Will get thrown if file does not exist, ffmpeg/ffprobe is missing or can not be read
 * @returns {VideoMetadata} Metadata of the local video-file
 */
export async function getVideoMetadata(videoFile: string) {
    const executable: string = process.env.FFPROBE_EXEC || 'ffprobe';
    const output = (await child_process.exec(`${executable} 
-v error 
    -select_streams v:0 
    -show_entries stream=width,height,duration,codec_type,codec_name,codec_long_name,bit_rate,size,r_frame_rate
    ${videoFile}`.replaceAll('\n', ''), {
        windowsHide: true
    }).catch((reason) => {
        throw new Error(reason)
    }))[0];
    const data = output.replaceAll('[STREAM]', '').replaceAll('[/STREAM]', '').split('\n').filter(l => l !== '').reduce((acc, curr) => (acc[curr.split('=')[0]] = curr.split('=')[1], acc), {});
    return {
        codec: {name: data['codec_name'], longName: data['codec_long_name'], type: data['codec_type']},
        aspectRatio: determineAspectRatio(parseInt(data['width']), parseInt(data['height'])),
        width: data['width'],
        height: data['height'],
        frameRate: data['r_frame_rate'].split('/')[0] / data['r_frame_rate'].split('/')[1],
        bitRate: data['bit_rate'],
        duration: data['duration']
    } as VideoMetadata;
}

function determineAspectRatio(width: number, height: number) {
    const divider = gcd(width, height);
    return `${width / divider}:${height / divider}`
}

function gcd(a: number, b: number) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {
        const temp = a;
        a = b;
        b = temp;
    }
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}