import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.QuoteOrderByInput> = z
  .object({
    text: z.lazy(() => SortOrderSchema).optional(),
    author: z.lazy(() => SortOrderSchema).optional(),
  })
  .strict();

export const QuoteOrderByInputObjectSchema = Schema;
