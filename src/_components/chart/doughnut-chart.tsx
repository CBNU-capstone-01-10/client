// COMPONENT: 도넛 그래프
import { useRef, useEffect } from "react";
import { Chart } from "chart.js/auto";
import { Color } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styled from "styled-components";

const DoughnutChartWrapper = styled.section`
  width: 100%;
`;
const ChartCanvas = styled.canvas`
  width: 100%;
`;

interface IChartRef extends HTMLCanvasElement {
  chart?: Chart;
}

interface IDoughnutChartProps {
  labels: string[];
  label: string;
  data: number[];
}

// 차트 내 셀 색상
const backgroundColors = [
  "rgba(255, 0, 0, 0.8)",
  "rgba(255, 125, 32, 0.8)",
  "rgba(255, 205, 86, 0.8)",
  "rgba(25, 159, 64, 0.8)",
  "rgba(0, 0, 255, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(201, 203, 207, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(255, 9, 132, 0.8)",
  "rgba(255, 105, 86, 0.8)",
  "rgba(75, 92, 192, 0.8)",
  "rgba(200, 62, 135, 0.8)",
  "rgba(153, 102, 155, 0.8)",
  "rgba(201, 203, 107, 0.8)",
];
// 차트 내 셀의 테두리 색상
const borderColors = backgroundColors.map((color) => color.replace("0.8", "1"));

export default function DoughnutChart({
  labels,
  label,
  data,
}: IDoughnutChartProps) {
  const chartRef = useRef<IChartRef | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // 기존 차트 인스턴스가 존재하면 파괴
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // canvas의 2D context 가져오기
      const context = chartRef.current.getContext("2d");

      // context가 null이 아닌지 확인
      if (context) {
        const newChart = new Chart(context, {
          type: "doughnut",
          data: {
            labels,
            datasets: [
              {
                label,
                data,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              datalabels: {
                font: {
                  size: 16,
                },
                color: "#fff",
                anchor: "center",
                align: "center",
                offset: 5,
                borderRadius: 8,
                backgroundColor: (context): Color | null =>
                  (context.dataset.backgroundColor as Color) || "#000",
                formatter: (_, context) => {
                  const label =
                    context.chart.data.labels?.[context.dataIndex] ?? "";
                  return `${label}`;
                },
              },
            },
          },
          plugins: [ChartDataLabels],
        });

        // chartRef.current에 차트 인스턴스 저장
        chartRef.current.chart = newChart;
      }
    }
  }, [label, labels, data]);

  return (
    <DoughnutChartWrapper>
      <ChartCanvas ref={chartRef} />
    </DoughnutChartWrapper>
  );
}
