import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PostCountOrderByAggregateInputObjectSchema } from './PostCountOrderByAggregateInput.schema';
import { PostMaxOrderByAggregateInputObjectSchema } from './PostMaxOrderByAggregateInput.schema';
import { PostMinOrderByAggregateInputObjectSchema } from './PostMinOrderByAggregateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    introduction: z.lazy(() => SortOrderSchema).optional(),
    conclusion: z.lazy(() => SortOrderSchema).optional(),
    keywords: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => PostCountOrderByAggregateInputObjectSchema).optional(),
    _max: z.lazy(() => PostMaxOrderByAggregateInputObjectSchema).optional(),
    _min: z.lazy(() => PostMinOrderByAggregateInputObjectSchema).optional(),
  })
  .strict();

export const PostOrderByWithAggregationInputObjectSchema = Schema;
