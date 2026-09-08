export type AttributionData = {
  metrikaClientId: string;
  yclid: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  landingPage: string;
  referrerOrigin: string;
};

const STORAGE_KEY = 'psy_attribution_v1';

function emptyAttribution(): AttributionData {
  return {
    metrikaClientId: '',
    yclid: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmContent: '',
    utmTerm: '',
    landingPage: '',
    referrerOrigin: '',
  };
}

function cleanValue(
  value: unknown,
  maxLength = 200,
): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .replace(/[\r\n]+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function normalizeAttribution(
  value: unknown,
): AttributionData | null {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value)
  ) {
    return null;
  }

  const data =
    value as Record<string, unknown>;

  return {
    metrikaClientId: cleanValue(
      data.metrikaClientId,
      80,
    ),
    yclid: cleanValue(data.yclid),
    utmSource: cleanValue(data.utmSource),
    utmMedium: cleanValue(data.utmMedium),
    utmCampaign: cleanValue(
      data.utmCampaign,
    ),
    utmContent: cleanValue(data.utmContent),
    utmTerm: cleanValue(data.utmTerm),
    landingPage: cleanValue(
      data.landingPage,
      300,
    ),
    referrerOrigin: cleanValue(
      data.referrerOrigin,
    ),
  };
}

function readStoredAttribution():
  | AttributionData
  | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw =
      window.sessionStorage.getItem(
        STORAGE_KEY,
      );

    if (!raw) {
      return null;
    }

    return normalizeAttribution(
      JSON.parse(raw),
    );
  } catch {
    return null;
  }
}

function writeStoredAttribution(
  data: AttributionData,
) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data),
    );
  } catch {
    // Атрибуция не должна ломать сайт,
    // если sessionStorage недоступен.
  }
}

export function captureAttribution():
  AttributionData {
  if (typeof window === 'undefined') {
    return emptyAttribution();
  }

  const existing =
    readStoredAttribution();

  if (existing) {
    return existing;
  }

  try {
    const url = new URL(
      window.location.href,
    );

    let referrerOrigin = '';

    if (document.referrer) {
      try {
        referrerOrigin = new URL(
          document.referrer,
        ).origin;
      } catch {
        referrerOrigin = '';
      }
    }

    const data: AttributionData = {
      metrikaClientId: '',
      yclid: cleanValue(
        url.searchParams.get('yclid'),
      ),
      utmSource: cleanValue(
        url.searchParams.get('utm_source'),
      ),
      utmMedium: cleanValue(
        url.searchParams.get('utm_medium'),
      ),
      utmCampaign: cleanValue(
        url.searchParams.get(
          'utm_campaign',
        ),
      ),
      utmContent: cleanValue(
        url.searchParams.get('utm_content'),
      ),
      utmTerm: cleanValue(
        url.searchParams.get('utm_term'),
      ),
      landingPage: cleanValue(
        `${url.origin}${url.pathname}`,
        300,
      ),
      referrerOrigin: cleanValue(
        referrerOrigin,
      ),
    };

    writeStoredAttribution(data);

    return data;
  } catch {
    return emptyAttribution();
  }
}

export function getAttribution():
  AttributionData {
  return (
    readStoredAttribution() ??
    captureAttribution()
  );
}

export function setMetrikaClientId(
  clientId: string,
) {
  const cleaned = cleanValue(
    clientId,
    80,
  );

  if (!cleaned) {
    return;
  }

  const current = getAttribution();

  if (
    current.metrikaClientId === cleaned
  ) {
    return;
  }

  writeStoredAttribution({
    ...current,
    metrikaClientId: cleaned,
  });
}