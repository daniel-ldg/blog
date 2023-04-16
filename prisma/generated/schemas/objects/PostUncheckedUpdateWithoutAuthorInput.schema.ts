import { z } from 'zod';
import { StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { PostUpdateintroductionInputObjectSchema } from './PostUpdateintroductionInput.schema';
import { SectionListUpdateEnvelopeInputObjectSchema } from './SectionListUpdateEnvelopeInput.schema';
import { SectionCreateInputObjectSchema } from './SectionCreateInput.schema';
import { PostUpdateconclusionInputObjectSchema } from './PostUpdateconclusionInput.schema';
import { PostUpdatekeywordsInputObjectSchema } from './PostUpdatekeywordsInput.schema';
import { ImageListUpdateEnvelopeInputObjectSchema } from './ImageListUpdateEnvelopeInput.schema';
import { ImageCreateInputObjectSchema } from './ImageCreateInput.schema';
import { QuoteNullableUpdateEnvelopeInputObjectSchema } from './QuoteNullableUpdateEnvelopeInput.schema';
import { QuoteCreateInputObjectSchema } from './QuoteCreateInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.PostUncheckedUpdateWithoutAuthorInput> = z
  .object({
    url: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    title: z
      .union([
        z.string(),
        z.lazy(() => StringFieldUpdateOperationsInputObjectSchema),
      ])
      .optional(),
    introduction: z
      .union([
        z.lazy(() => PostUpdateintroductionInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    sections: z
      .union([
        z.lazy(() => SectionListUpdateEnvelopeInputObjectSchema),
        z.lazy(() => SectionCreateInputObjectSchema),
        z.lazy(() => SectionCreateInputObjectSchema).array(),
      ])
      .optional(),
    conclusion: z
      .union([
        z.lazy(() => PostUpdateconclusionInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    keywords: z
      .union([
        z.lazy(() => PostUpdatekeywordsInputObjectSchema),
        z.string().array(),
      ])
      .optional(),
    images: z
      .union([
        z.lazy(() => ImageListUpdateEnvelopeInputObjectSchema),
        z.lazy(() => ImageCreateInputObjectSchema),
        z.lazy(() => ImageCreateInputObjectSchema).array(),
      ])
      .optional(),
    quote: z
      .union([
        z.lazy(() => QuoteNullableUpdateEnvelopeInputObjectSchema),
        z.lazy(() => QuoteCreateInputObjectSchema),
      ])
      .optional()
      .nullable(),
  })
  .strict();

export const PostUncheckedUpdateWithoutAuthorInputObjectSchema = Schema;
