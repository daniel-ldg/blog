import { z } from 'zod';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuoteCreateInput> = z
  .object({
    text: z.string(),
    author: z.string(),
  })
  .strict();

export const QuoteCreateInputObjectSchema = Schema;
