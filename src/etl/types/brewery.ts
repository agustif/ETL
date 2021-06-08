export interface Brewery {
  group: any
  id: number
  obdbId: string
  name: string
  breweryType: string // enum candidate
  street: string
  city: string
  state: string
  countyProvince: string
  postalCode: number
  longitude: number
  latitude: number
  phone: string
  websiteUrl: string
  updatedAt: Date
  createdAt: Date
  USRegion: string
}
