import { z } from 'zod';
import { QuoteCreateInputObjectSchema } from './QuoteCreateInput.schema';
import { QuoteUpdateInputObjectSchema } from './QuoteUpdateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuoteUpsertInput> = z
  .object({
    set: z.lazy(() => QuoteCreateInputObjectSchema).nullable(),
    update: z.lazy(() => QuoteUpdateInputObjectSchema),
  })
  .strict();

export const QuoteUpsertInputObjectSchema = Schema;
