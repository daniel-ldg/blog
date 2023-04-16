import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { StringNullableListFilterObjectSchema } from './StringNullableListFilter.schema';
import { SectionCompositeListFilterObjectSchema } from './SectionCompositeListFilter.schema';
import { SectionObjectEqualityInputObjectSchema } from './SectionObjectEqualityInput.schema';
import { ImageCompositeListFilterObjectSchema } from './ImageCompositeListFilter.schema';
import { ImageObjectEqualityInputObjectSchema } from './ImageObjectEqualityInput.schema';
import { QuoteNullableCompositeFilterObjectSchema } from './QuoteNullableCompositeFilter.schema';
import { QuoteObjectEqualityInputObjectSchema } from './QuoteObjectEqualityInput.schema';
import { AuthorRelationFilterObjectSchema } from './AuthorRelationFilter.schema';
import { AuthorWhereInputObjectSchema } from './AuthorWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PostWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PostWhereInputObjectSchema),
        z.lazy(() => PostWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PostWhereInputObjectSchema),
        z.lazy(() => PostWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    authorId: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    url: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterObjectSchema), z.date()])
      .optional(),
    title: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    introduction: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    sections: z
      .union([
        z.lazy(() => SectionCompositeListFilterObjectSchema),
        z.lazy(() => SectionObjectEqualityInputObjectSchema).array(),
        z.lazy(() => SectionObjectEqualityInputObjectSchema),
      ])
      .optional(),
    conclusion: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    keywords: z.lazy(() => StringNullableListFilterObjectSchema).optional(),
    images: z
      .union([
        z.lazy(() => ImageCompositeListFilterObjectSchema),
        z.lazy(() => ImageObjectEqualityInputObjectSchema).array(),
        z.lazy(() => ImageObjectEqualityInputObjectSchema),
      ])
      .optional(),
    quote: z
      .union([
        z.lazy(() => QuoteNullableCompositeFilterObjectSchema),
        z.lazy(() => QuoteObjectEqualityInputObjectSchema),
      ])
      .optional()
      .nullable(),
    author: z
      .union([
        z.lazy(() => AuthorRelationFilterObjectSchema),
        z.lazy(() => AuthorWhereInputObjectSchema),
      ])
      .optional(),
  })
  .strict();

export const PostWhereInputObjectSchema = Schema;
