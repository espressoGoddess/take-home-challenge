export default async function apiCalls(route) {
  const response = await fetch(route);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
}