export interface Location {
    locationName: string,
    latitude:number,
    longitude:number,
    comment?: string,
    _id?: string,
    createdAt?: string,
    user?: string // User Id
}