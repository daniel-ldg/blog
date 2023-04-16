import { z } from 'zod';
import { ImageObjectEqualityInputObjectSchema } from './ImageObjectEqualityInput.schema';
import { ImageWhereInputObjectSchema } from './ImageWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ImageCompositeListFilter> = z
  .object({
    equals: z
      .union([
        z.lazy(() => ImageObjectEqualityInputObjectSchema),
        z.lazy(() => ImageObjectEqualityInputObjectSchema).array(),
      ])
      .optional(),
    every: z.lazy(() => ImageWhereInputObjectSchema).optional(),
    some: z.lazy(() => ImageWhereInputObjectSchema).optional(),
    none: z.lazy(() => ImageWhereInputObjectSchema).optional(),
    isEmpty: z.boolean().optional(),
    isSet: z.boolean().optional(),
  })
  .strict();

export const ImageCompositeListFilterObjectSchema = Schema;
