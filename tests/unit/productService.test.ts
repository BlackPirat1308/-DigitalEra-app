import { obtenerRecomendaciones, analizarSentimiento } from '../../src/services/aiService';

jest.mock('aws-sdk', () => ({
  Comprehend: jest.fn(() => ({
    detectSentiment: jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Sentiment: 'POSITIVE' })
    })
  })),
  SageMakerRuntime: jest.fn(() => ({
    invokeEndpoint: jest.fn().mockReturnValue({
      promise: jest.fn().mockResolvedValue({ Body: JSON.stringify(['1', '2', '3']) })
    })
  }))
}));

describe('AI Service', () => {
  test('obtenerRecomendaciones debería devolver un array de IDs de productos', async () => {
    const recomendaciones = await obtenerRecomendaciones('user123');
    expect(recomendaciones).toEqual(['1', '2', '3']);
  });

  test('analizarSentimiento debería devolver un sentimiento', async () => {
    const sentimiento = await analizarSentimiento('Me encanta este producto');
    expect(sentimiento).toBe('POSITIVE');
  });
});