import fs from 'fs';
import path from 'path';

export async function getDynamicContent() {
    const imagesDir = path.join(process.cwd(), 'public/images');
    const videosDir = path.join(process.cwd(), 'public/videos');

    const images = fs.readdirSync(imagesDir)
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .map(file => ({
            src: `/images/${file}`,
            caption: 'Un recuerdo especial'
        }));

    const videos = fs.readdirSync(videosDir)
        .filter(file => /\.(mp4|webm|mov)$/i.test(file))
        .map(file => ({
            url: `/videos/${file}`,
            author: file.replace(/_/g, ' ').replace(/\.[^/.]+$/, ''),
            message: 'Una dedicatoria de corazón',
            duration: 15000 // default duration or we could optimize
        }));

    return { images, videos };
}
