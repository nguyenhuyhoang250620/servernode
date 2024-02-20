const ffmpeg = require('ffmpeg-static'); 
const { exec } = require('child_process'); 
 
async function convertAviToMp4(inputPath, outputPath) { 
  return new Promise((resolve, reject) => { 
    // Thêm tùy chọn để giảm dung lượng: -b:v 500k (500 kilobits mỗi giây) 
    const command =`${ffmpeg} -i ${inputPath} -b:v 500k -c:v libx264 ${outputPath}`; 
 
    exec(command, (error, stdout, stderr) => { 
      if (error) { 
        console.error('Error during conversion:', error); 
        reject(error); 
        return; 
      } 
 
      console.log('Conversion finished'); 
      resolve(outputPath); 
    }); 
  }); 
} 
 
// Sử dụng hàm để convert và nhận URL của video MP4 
const inputAviFile = './video_AH1.avi'; 
const outputMp4File = './video.mp4'; 
 
convertAviToMp4(inputAviFile, outputMp4File) 
  .then((mp4Url) => { 
    console.log('MP4 Video URL:', mp4Url); 
  }) 
  .catch((error) => { 
    console.error('Error:', error); 
  });