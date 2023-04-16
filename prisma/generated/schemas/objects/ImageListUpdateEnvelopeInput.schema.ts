import { z } from 'zod';
import { ImageCreateInputObjectSchema } from './ImageCreateInput.schema';
import { ImageUpdateManyInputObjectSchema } from './ImageUpdateManyInput.schema';
import { ImageDeleteManyInputObjectSchema } from './ImageDeleteManyInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ImageListUpdateEnvelopeInput> = z
  .object({
    set: z
      .union([
        z.lazy(() => ImageCreateInputObjectSchema),
        z.lazy(() => ImageCreateInputObjectSchema).array(),
      ])
      .optional(),
    push: z
      .union([
        z.lazy(() => ImageCreateInputObjectSchema),
        z.lazy(() => ImageCreateInputObjectSchema).array(),
      ])
      .optional(),
    updateMany: z.lazy(() => ImageUpdateManyInputObjectSchema).optional(),
    deleteMany: z.lazy(() => ImageDeleteManyInputObjectSchema).optional(),
  })
  .strict();

export const ImageListUpdateEnvelopeInputObjectSchema = Schema;
