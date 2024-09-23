export default function useDecodeJWT() {
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token));
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      throw new Error('Token inválido');
    }
  }
  return { decodeToken }
}