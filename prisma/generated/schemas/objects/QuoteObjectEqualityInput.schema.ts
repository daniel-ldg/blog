import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuoteObjectEqualityInput> = z
  .object({
    text: z.string(),
    author: z.string(),
  })
  .strict();

export const QuoteObjectEqualityInputObjectSchema = Schema;
