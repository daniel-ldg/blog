import { z } from 'zod';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SectionOrderByCompositeAggregateInputObjectSchema } from './SectionOrderByCompositeAggregateInput.schema';
import { ImageOrderByCompositeAggregateInputObjectSchema } from './ImageOrderByCompositeAggregateInput.schema';
import { QuoteOrderByInputObjectSchema } from './QuoteOrderByInput.schema';
import { AuthorOrderByWithRelationInputObjectSchema } from './AuthorOrderByWithRelationInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z
  .object({
    id: z.lazy(() => SortOrderSchema).optional(),
    authorId: z.lazy(() => SortOrderSchema).optional(),
    url: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    introduction: z.lazy(() => SortOrderSchema).optional(),
    sections: z
      .lazy(() => SectionOrderByCompositeAggregateInputObjectSchema)
      .optional(),
    conclusion: z.lazy(() => SortOrderSchema).optional(),
    keywords: z.lazy(() => SortOrderSchema).optional(),
    images: z
      .lazy(() => ImageOrderByCompositeAggregateInputObjectSchema)
      .optional(),
    quote: z.lazy(() => QuoteOrderByInputObjectSchema).optional(),
    author: z.lazy(() => AuthorOrderByWithRelationInputObjectSchema).optional(),
  })
  .strict();

export const PostOrderByWithRelationInputObjectSchema = Schema;
