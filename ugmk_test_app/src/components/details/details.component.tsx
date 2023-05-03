import "./details.component.css";
import React, { useEffect, useState } from "react";
import { ApiService } from "../../services/api.service";
import { useParams } from "react-router-dom";
import { FactoryHelper } from "../../helpers/factory-helper";
import { PieChartItem } from "../../types/pie-chart-item";
import { Pie } from "@ant-design/charts";

export const DetailsComponent: React.FC = () => {
  const service = new ApiService();
  const params = useParams();
  console.log(params);
  const factoryId = params.factoryId ? Number.parseInt(params.factoryId) : 0;
  const factory = FactoryHelper.GetFactory(factoryId);
  const date = `${params.month}/${params.year}`;
  // const service = new ApiService();

  const [data, setData] = useState<Array<PieChartItem>>([]);

  useEffect(() => {
    service
      .GetFactoryPieChart(factoryId, date)
      .then((result) => {
        setData(result);
      })
      .catch((ex) => {
        console.log(ex);
      });
  }, []);

  const config = {
    appendPadding: 10,
    data,
    angleField: "sum",
    colorField: "category",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  return (
    <div className="wrapper">
      <div className="main-panel">
        <div className="caption">
          <span>
            Статистика по продукции {factory} за {date}
          </span>
        </div>

        <Pie {...config} />
      </div>
    </div>
  );
};
