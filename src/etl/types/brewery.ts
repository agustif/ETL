export interface Brewery  {
    id: number,
    obdb_id: string,
    name: string,
    brewery_type: string, // enum candidate
    street: string,
    address_2: string,
    address_3: string,
    city: string,
    state: string,
    county_province: string,
    postal_code: number,
    longitude: string,
    latitude: string,
    phone: string,
    website_url: string,
    updated_at: Date,
    created_at: Date,
}