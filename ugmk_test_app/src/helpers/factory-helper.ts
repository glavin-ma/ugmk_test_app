import { ColumnChartFilter } from "../enums/column-chart-filter";
import { Product } from "../types/product";

export class FactoryHelper {
  private static factories: Array<{ name: string; id: number }> = [
    { id: 1, name: "Factory A" },
    { id: 2, name: "Factory B" },
  ];

  public static GetFactory(factoryId: number): string {
    return this.factories.filter((p) => p.id === factoryId)[0].name;
  }

  public static GetFactoryByString(factoryId?: string): string {
    if (!factoryId) return "";
    return this.GetFactory(Number.parseInt(factoryId));
  }

  public static GetFactoryId(factory: string): number {
    return this.factories.filter((p) => p.name === factory)[0].id;
  }

  public static GetSum(item: Product, filter: ColumnChartFilter) {
    switch (filter) {
      case ColumnChartFilter.all:
        return item.product1 + item.product2 + item.product3;
      case ColumnChartFilter.product12:
        return item.product1 + item.product2;
      case ColumnChartFilter.product1:
        return item.product1;
      case ColumnChartFilter.product2:
        return item.product2;
      case ColumnChartFilter.product3:
        return item.product3;
    }
  }
}
