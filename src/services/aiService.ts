import AWS from 'aws-sdk';

// Configurar AWS
AWS.config.update({ region: 'us-east-1' });

const comprehend = new AWS.Comprehend();
const sagemakerRuntime = new AWS.SageMakerRuntime();

export async function analizarSentimiento(texto: string): Promise<string> {
  const params = {
    Text: texto,
    LanguageCode: 'es'
  };

  try {
    const data = await comprehend.detectSentiment(params).promise();
    return data.Sentiment || 'NEUTRAL';
  } catch (error) {
    console.error('Error al analizar sentimiento:', error);
    return 'ERROR';
  }
}

export async function obtenerRecomendaciones(usuarioId: string): Promise<string[]> {
  const params = {
    EndpointName: 'nombre-del-endpoint-de-sagemaker', // Reemplazar con el nombre real del endpoint
    ContentType: 'application/json',
    Body: JSON.stringify({ usuario_id: usuarioId })
  };

  try {
    const data = await sagemakerRuntime.invokeEndpoint(params).promise();
    const recomendaciones = JSON.parse(data.Body as string);
    return recomendaciones;
  } catch (error) {
    console.error('Error al obtener recomendaciones:', error);
    return [];
  }
}