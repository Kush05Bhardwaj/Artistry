import { z } from 'zod';

// File upload validation schema
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: 'File size must be less than 10MB',
    })
    .refine(
      (file) => {
        const allowedTypes = [
          'image/jpeg',
          'image/jpg',
          'image/png',
          'image/webp',
        ];
        return allowedTypes.includes(file.type);
      },
      {
        message: 'Only JPEG, PNG, and WebP files are allowed',
      }
    ),
});

// Room details validation schema
export const roomDetailsSchema = z.object({
  roomType: z.enum(['living_room', 'bedroom', 'kitchen', 'bathroom', 'office']),
  roomSize: z.enum(['small', 'medium', 'large']),
  budget: z.number().min(1000).max(1000000).optional(),
  style: z.enum(['modern', 'traditional', 'minimalist', 'bohemian', 'industrial']).optional(),
});

// User profile validation schema
export const userProfileSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  preferences: z.object({
    favoriteStyles: z.array(z.string()).optional(),
    budgetRange: z.enum(['low', 'medium', 'high']).optional(),
  }).optional(),
});

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
  subject: z.string().min(2).max(100).optional(),
});

// Utility functions for validation
export const validateFile = (file: File) => {
  const maxSize = parseInt(process.env.MAX_FILE_SIZE || '10485760');
  const allowedTypes = (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/webp').split(',');

  if (file.size > maxSize) {
    return { valid: false, error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB` };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.' };
  }

  return { valid: true, error: null };
};

export const compressImage = async (file: File, maxWidth = 1920, quality = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      let newWidth = width;
      let newHeight = height;

      if (width > maxWidth) {
        newWidth = maxWidth;
        newHeight = (height * maxWidth) / width;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        file.type,
        quality
      );
    };

    img.src = URL.createObjectURL(file);
  });
}; 