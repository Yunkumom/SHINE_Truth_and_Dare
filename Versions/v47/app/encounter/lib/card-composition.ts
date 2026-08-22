interface ReferencedAsset {
  id: string
}

export interface CardPresentationReferences {
  artworkId: string
  questionId: string
  questionSetIds: readonly string[]
  cardDesignId: string
}

export interface CardPresentationLibraries<
  Artwork extends ReferencedAsset,
  Question extends ReferencedAsset,
  QuestionSet extends ReferencedAsset,
  CardDesign extends ReferencedAsset,
> {
  artworks: readonly Artwork[]
  questions: readonly Question[]
  questionSets: readonly QuestionSet[]
  cardDesigns: readonly CardDesign[]
}

function requiredById<T extends ReferencedAsset>(items: readonly T[], id: string, layer: string): T {
  const item = items.find(candidate => candidate.id === id)
  if (!item) throw new Error(`Missing ${layer}: ${id}`)
  return item
}

export function resolveCardPresentationLayers<
  Artwork extends ReferencedAsset,
  Question extends ReferencedAsset,
  QuestionSet extends ReferencedAsset,
  CardDesign extends ReferencedAsset,
>(
  refs: CardPresentationReferences,
  libraries: CardPresentationLibraries<Artwork, Question, QuestionSet, CardDesign>,
) {
  return {
    artwork: requiredById(libraries.artworks, refs.artworkId, 'artwork'),
    question: requiredById(libraries.questions, refs.questionId, 'question'),
    questionSets: refs.questionSetIds.map(id => requiredById(libraries.questionSets, id, 'question set')),
    cardDesign: requiredById(libraries.cardDesigns, refs.cardDesignId, 'card design'),
  }
}
