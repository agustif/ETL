export enum  Format{
    Json = "JSON",
    Csv = "CSV",
    PlainText = "PLAIN_TEXT"
}

export interface RestExtractorOptions  {
    endpoint: String
    format: Format
}
export default function restExtractor(options: RestExtractorOptions) {
    const { endpoint, format } = options
    console.log(endpoint, options, format)

}
