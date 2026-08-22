import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveCardPresentationLayers } from '../app/encounter/lib/card-composition.ts'

const libraries = {
  artworks: [{ id: 'art-a' }],
  questions: [{ id: 'question-a' }],
  questionSets: [{ id: 'set-a' }, { id: 'set-b' }],
  cardDesigns: [{ id: 'design-a' }, { id: 'design-b' }],
}

test('the same artwork composes with two independent question sets', () => {
  const first = resolveCardPresentationLayers({ artworkId: 'art-a', questionId: 'question-a', questionSetIds: ['set-a'], cardDesignId: 'design-a' }, libraries)
  const second = resolveCardPresentationLayers({ artworkId: 'art-a', questionId: 'question-a', questionSetIds: ['set-b'], cardDesignId: 'design-a' }, libraries)
  assert.equal(first.artwork, second.artwork)
  assert.notEqual(first.questionSets[0], second.questionSets[0])
})

test('the same question renders through two independent card designs', () => {
  const first = resolveCardPresentationLayers({ artworkId: 'art-a', questionId: 'question-a', questionSetIds: ['set-a'], cardDesignId: 'design-a' }, libraries)
  const second = resolveCardPresentationLayers({ artworkId: 'art-a', questionId: 'question-a', questionSetIds: ['set-a'], cardDesignId: 'design-b' }, libraries)
  assert.equal(first.question, second.question)
  assert.notEqual(first.cardDesign, second.cardDesign)
})
