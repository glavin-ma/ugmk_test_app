import "./default.component.css";
import { useEffect, useState } from "react";
import { ApiService } from "../../services/api.service";
import { ColumnChartFilter } from "../../enums/column-chart-filter";
import { Column, ColumnConfig } from "@ant-design/charts";
import { ColumnChartItem } from "../../types/column-chart-item";
import { LocalStorageService } from "../../services/local-storage.service";
import { StorageTokens } from "../../enums/storage-tokens";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../enums/route-paths";
import { FactoryHelper } from "../../helpers/factory-helper";

export const DefaultComponent: React.FC = () => {
  const navigate = useNavigate();
  const service = new ApiService();
  const localStorageService = new LocalStorageService();

  const [data, setData] = useState<Array<ColumnChartItem> | undefined>(
    undefined
  );
  const [filter, setFilter] = useState<ColumnChartFilter>(
    ColumnChartFilter.all
  );
  useEffect(() => {
    const fil = localStorageService.get<ColumnChartFilter>(
      StorageTokens.chartFilter
    );
    if (fil) setFilter(fil);
  }, []);
  useEffect(() => {
    service
      .GetFilteredChartData(filter)
      .then((result) => {
        setData(result);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, [filter]);

  let config: ColumnConfig = {
    data: data ?? [],
    isGroup: true,
    xField: "month",
    yField: "sum",
    seriesField: "groupBy",
    dodgePadding: 2,
    onReady: (plot: any) => {
      plot.on("element:click", (arg: any) => {
        navigate(
          `${RoutePaths.details}/${FactoryHelper.GetFactoryId(
            arg.data.data.groupBy
          )}/${arg.data.data.month}`
        );
      });
    },
    tooltip: false,
  };

  const setFilters = (value: ColumnChartFilter) => {
    setFilter(value);
    localStorageService.set(StorageTokens.chartFilter, value);
  };

  return (
    <div className="wrapper">
      <div className="filter main-panel">
        <span>Фильтр по типу продукции</span>
        <select
          value={filter}
          onChange={(e: any) => setFilters(e.target.value)}
        >
          <option value={ColumnChartFilter.all}>{ColumnChartFilter.all}</option>
          <option value={ColumnChartFilter.product12}>
            {ColumnChartFilter.product12}
          </option>
          <option value={ColumnChartFilter.product1}>
            {ColumnChartFilter.product1}
          </option>
          <option value={ColumnChartFilter.product2}>
            {ColumnChartFilter.product2}
          </option>
          <option value={ColumnChartFilter.product3}>
            {ColumnChartFilter.product3}
          </option>s
        </select>
      </div>
      <div className="main-panel">
        <Column {...config} />
      </div>
    </div>
  );
};
