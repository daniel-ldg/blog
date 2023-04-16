import { z } from 'zod';
import { AuthorArgsObjectSchema } from './AuthorArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PostSelect> = z
  .object({
    id: z.boolean().optional(),
    author: z
      .union([z.boolean(), z.lazy(() => AuthorArgsObjectSchema)])
      .optional(),
    authorId: z.boolean().optional(),
    url: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    title: z.boolean().optional(),
    introduction: z.boolean().optional(),
    sections: z.boolean().optional(),
    conclusion: z.boolean().optional(),
    keywords: z.boolean().optional(),
    images: z.boolean().optional(),
    quote: z.boolean().optional(),
  })
  .strict();

export const PostSelectObjectSchema = Schema;
