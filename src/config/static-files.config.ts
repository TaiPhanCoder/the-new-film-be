import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

export function configureStaticFiles(app: NestExpressApplication): void {
  // Create uploads directory if it doesn't exist
  const uploadsDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }

  // Create subdirectories
  const subdirs = ['videos', 'posters', 'banners', 'misc'];
  subdirs.forEach((subdir) => {
    const subdirPath = join(uploadsDir, subdir);
    if (!existsSync(subdirPath)) {
      mkdirSync(subdirPath, { recursive: true });
    }
  });

  // Serve static files from uploads directory
  app.useStaticAssets(uploadsDir, {
    prefix: '/uploads/',
    setHeaders: (res, path) => {
      // Set appropriate headers for different file types
      if (path.includes('/videos/')) {
        res.setHeader('Content-Type', 'video/mp4');
        res.setHeader('Accept-Ranges', 'bytes');
      } else if (path.includes('/posters/') || path.includes('/banners/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year cache for images
      }
    },
  });
}
