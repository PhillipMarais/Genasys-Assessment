export interface NationalizeApiResponse {
  count: number;
  name: string;
  country: NationalizeApiCountry[];
}

export interface NationalizeApiCountry {
  country_id: string;
  probability: number;
}

export interface CountryApiEntry {
  name: string;
  flag: string;
  flags: { png: string; svg: string };
  alpha2Code: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  flagUrl: string;
}

export interface CountryPrediction extends Country {
  probability: number;
}

export interface UniversityApiEntry {
  name: string;
  country: string;
  alpha_two_code: string;
  domains: string[];
  web_pages: string[];
  'state-province': string | null;
}

export interface UniversityResult {
  name: string;
  website: string;
}
