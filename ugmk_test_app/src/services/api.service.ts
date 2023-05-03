import moment from "moment";
import { ApiCalls } from "../enums/api-calls";
import { ColumnChartFilter } from "../enums/column-chart-filter";
import { ColumnChartItem } from "../types/column-chart-item";
import { Product } from "../types/product";
import { HttpService } from "./http.service";
import { FactoryHelper } from "../helpers/factory-helper";
import { PieChartItem } from "../types/pie-chart-item";

export class ApiService {
  private baseUrl = process.env.REACT_APP_API_URL;

  GetProducts(): Promise<Array<Product>> {
    return HttpService.Get<Array<Product>>(this.GetUrl(ApiCalls.products));
  }

  GetMapped(): Promise<Array<Product>> {
    return this.GetProducts().then((data) => {
      return data.map((p) => {
        p.mappedDate = moment(p.date, "DD/M/YYYY").format("MM/YYYY");
        return p;
      });
    });
  }

  GetFactoryPieChart(
    factoryId: number,
    month: string
  ): Promise<Array<PieChartItem>> {
    return this.GetMapped().then((data) => {
      const filtered = data.filter(
        (p) => p.factory_id === factoryId && p.mappedDate === month
      );
      console.log("pie", filtered);
      let result = new Array<PieChartItem>();
      let sumProduct1 = 0;
      let sumProduct2 = 0;
      let sumProduct3 = 0;
      filtered.forEach((p) => {
        sumProduct1 += p.product1;
        sumProduct2 += p.product2;
        sumProduct3 += p.product3;
      });
      result.push({ category: "Продукт 1", sum: sumProduct1 / 1000 });
      result.push({ category: "Продукт 2", sum: sumProduct2 / 1000 });
      result.push({ category: "Продукт 3", sum: sumProduct3 / 1000 });
      return result;
    });
  }

  GetFilteredChartData(
    filter: ColumnChartFilter
  ): Promise<Array<ColumnChartItem>> {
    return this.GetMapped().then((data) => {
      let result = new Array<ColumnChartItem>();
      data.forEach((item) => {
        let filtered = result.filter(
          (p) =>
            p.month === item.mappedDate &&
            p.groupBy === FactoryHelper.GetFactory(item.factory_id)
        );
        if (filtered.length > 0) {
          filtered[0].sum += FactoryHelper.GetSum(item, filter) / 1000;
        } else {
          if (item.mappedDate !== "Invalid date")
            result.push({
              month: item.mappedDate,
              groupBy: FactoryHelper.GetFactory(item.factory_id),
              sum: FactoryHelper.GetSum(item, filter) / 1000,
            });
          else console.log("broken item", item);
        }
      });
      return result.sort((a, b) => {
        return 0 - ((a.month as string) < (b.month as string) ? 1 : -1);
      });
    });
  }

  private GetUrl(api: ApiCalls): string {
    return `${this.baseUrl}/${api}`;
  }
}
