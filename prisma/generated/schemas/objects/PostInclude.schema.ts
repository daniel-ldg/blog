import { z } from 'zod';
import { AuthorArgsObjectSchema } from './AuthorArgs.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PostInclude> = z
  .object({
    author: z
      .union([z.boolean(), z.lazy(() => AuthorArgsObjectSchema)])
      .optional(),
  })
  .strict();

export const PostIncludeObjectSchema = Schema;
