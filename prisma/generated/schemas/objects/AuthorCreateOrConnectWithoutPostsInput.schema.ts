import { z } from 'zod';
import { AuthorWhereUniqueInputObjectSchema } from './AuthorWhereUniqueInput.schema';
import { AuthorCreateWithoutPostsInputObjectSchema } from './AuthorCreateWithoutPostsInput.schema';
import { AuthorUncheckedCreateWithoutPostsInputObjectSchema } from './AuthorUncheckedCreateWithoutPostsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.AuthorCreateOrConnectWithoutPostsInput> = z
  .object({
    where: z.lazy(() => AuthorWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => AuthorCreateWithoutPostsInputObjectSchema),
      z.lazy(() => AuthorUncheckedCreateWithoutPostsInputObjectSchema),
    ]),
  })
  .strict();

export const AuthorCreateOrConnectWithoutPostsInputObjectSchema = Schema;
