import { z } from 'zod';
import { PostCreateintroductionInputObjectSchema } from './PostCreateintroductionInput.schema';
import { SectionListCreateEnvelopeInputObjectSchema } from './SectionListCreateEnvelopeInput.schema';
import { SectionCreateInputObjectSchema } from './SectionCreateInput.schema';
import { PostCreateconclusionInputObjectSchema } from './PostCreateconclusionInput.schema';
import { PostCreatekeywordsInputObjectSchema } from './PostCreatekeywordsInput.schema';
import { ImageListCreateEnvelopeInputObjectSchema } from './ImageListCreateEnvelopeInput.schema';
import { ImageCreateInputObjectSchema } from './ImageCreateInput.schema';
import { QuoteNullableCreateEnvelopeInputObjectSchema } from './QuoteNullableCreateEnvelopeInput.schema';
import { QuoteCreateInputObjectSchema } from './QuoteCreateInput.schema';
import { AuthorCreateNestedOneWithoutPostsInputObjectSchema } from './AuthorCreateNestedOneWithoutPostsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PostCreateInput> = z
  .object({
    id: z.string().optional(),
    url: z.string(),
    createdAt: z.date().optional(),
    title: z.string(),
    introduction: z
      .union([
        z.lazy(() => PostCreateintroductionInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    sections: z
      .union([
        z.lazy(() => SectionListCreateEnvelopeInputObjectSchema),
        z.lazy(() => SectionCreateInputObjectSchema),
        z.lazy(() => SectionCreateInputObjectSchema).array(),
      ])
      .optional(),
    conclusion: z
      .union([
        z.lazy(() => PostCreateconclusionInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    keywords: z
      .union([
        z.lazy(() => PostCreatekeywordsInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    images: z
      .union([
        z.lazy(() => ImageListCreateEnvelopeInputObjectSchema),
        z.lazy(() => ImageCreateInputObjectSchema),
        z.lazy(() => ImageCreateInputObjectSchema).array(),
      ])
      .optional(),
    quote: z
      .union([
        z.lazy(() => QuoteNullableCreateEnvelopeInputObjectSchema),
        z.lazy(() => QuoteCreateInputObjectSchema),
      ])
      .optional()
      .nullable(),
    author: z.lazy(() => AuthorCreateNestedOneWithoutPostsInputObjectSchema),
  })
  .strict();

export const PostCreateInputObjectSchema = Schema;
