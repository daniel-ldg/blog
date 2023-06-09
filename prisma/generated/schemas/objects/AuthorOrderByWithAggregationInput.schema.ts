import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { AuthorCountOrderByAggregateInputObjectSchema } from './AuthorCountOrderByAggregateInput.schema';
import { AuthorMaxOrderByAggregateInputObjectSchema } from './AuthorMaxOrderByAggregateInput.schema';
import { AuthorMinOrderByAggregateInputObjectSchema } from './AuthorMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    prompt: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    degree: z.lazy(() => SortOrderSchema).optional(),
    location: z.lazy(() => SortOrderSchema).optional(),
    bio: z.lazy(() => SortOrderSchema).optional(),
    picture: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => AuthorCountOrderByAggregateInputObjectSchema)
      .optional(),
    _max: z.lazy(() => AuthorMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => AuthorMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const AuthorOrderByWithAggregationInputObjectSchema = Schema;
