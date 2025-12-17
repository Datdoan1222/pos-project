export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly image?: string
  ) {}

  static fromJSON(json: any): Product {
    return new Product(json.id, json.name, json.price, json.image);
  }
}
