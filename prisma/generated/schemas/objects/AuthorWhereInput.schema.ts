import { z } from 'zod';
import { StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { PostListRelationFilterObjectSchema } from './PostListRelationFilter.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => AuthorWhereInputObjectSchema),
        z.lazy(() => AuthorWhereInputObjectSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AuthorWhereInputObjectSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AuthorWhereInputObjectSchema),
        z.lazy(() => AuthorWhereInputObjectSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    prompt: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    url: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    degree: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    location: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    bio: z
      .union([z.lazy(() => StringNullableFilterObjectSchema), z.string()])
      .optional()
      .nullable(),
    picture: z
      .union([z.lazy(() => StringFilterObjectSchema), z.string()])
      .optional(),
    posts: z.lazy(() => PostListRelationFilterObjectSchema).optional(),
  })
  .strict();

export const AuthorWhereInputObjectSchema = Schema;
