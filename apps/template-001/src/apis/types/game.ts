export interface Venues {
  imageType: number
  sortNumber: number
  venueList: Venue[]
  venueTypeCode: string
  venueTypeIconUrl: string
}

export interface Venue {
  currencyTypes: string
  isOb: number
  languageTypes: string
  status: number
  venueCode: string
  venueCodeNumber: number
  venueEnName: string
  venueIconUrlApp: string
  venueIconUrlPc: string
  venueName: string
  venueThName: string
  venueTransferIconUrlApp: string
  venueTransferIconUrlPc: string
  venueType: string
  venueTypeEnName: string
  venueTypeName: string
  venueTypeThName: string
  venueTypeVnName: string
  venueVnName: string
  walletNames: string
}
