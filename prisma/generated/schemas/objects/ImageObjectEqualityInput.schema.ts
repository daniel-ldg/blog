import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ImageObjectEqualityInput> = z
  .object({
    url: z.string(),
    alt: z.string(),
    width: z.number(),
    height: z.number(),
  })
  .strict();

export const ImageObjectEqualityInputObjectSchema = Schema;
