import { z } from 'zod';
import { ImageCreateInputObjectSchema } from './ImageCreateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ImageListCreateEnvelopeInput> = z
  .object({
    set: z
      .union([
        z.lazy(() => ImageCreateInputObjectSchema),
        z.lazy(() => ImageCreateInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const ImageListCreateEnvelopeInputObjectSchema = Schema;
