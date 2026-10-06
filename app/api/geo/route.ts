import { NextResponse } from 'next/server';

export function GET(request: Request) {
  const devCountry =
    process.env.NODE_ENV !== 'production'
      ? new URL(request.url).searchParams.get('country')
      : null;
  const country = (devCountry ?? request.headers.get('cf-ipcountry') ?? '')
    .toUpperCase();

  return NextResponse.json(
    { country, mainlandChina: country === 'CN' },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
